import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FrameContextProvider } from './Context';
import Content from './Content';

export default class Frame extends Component {

  static defaultProps = {
    style: {},
    head: null,
    children: undefined,
    mountTarget: undefined,
    contentDidMount: () => { },
    contentDidUpdate: () => { },
    initialContent:
      '<!DOCTYPE html><html style="overflow-y: hidden;"><head>' + document.getElementsByTagName("head")[0].innerHTML + '</head><body><div class="frame-root"></div></body></html>'
  };

  reRendering = true;


  constructor(props, context) {
    super(props, context);
    this._isMounted = false;
    this.refIframe = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;

    const doc = this.getDoc();
    if (doc && doc.readyState === 'complete') {
      this.forceUpdate();this.node.addEventListener('resize',() => {
        this.forceUpdate();
      });
    } else {
      this.node.addEventListener('load', this.handleLoad);
      
    }
    this.node.style.height = 1000 + "px";
    setInterval(() => {
      this.forceUpdate();
    }, 500);
  }

  componentDidUpdate() {

    setTimeout(() => {
      if (this.node) {
        var scale = 1;
        if(this.node.style.transform.startsWith("scale")){
          scale = this.node.style.transform.substr(6, 8).replace(")","");
        }
        this.node.parentElement.style.height = this.node.contentWindow.document.body.scrollHeight * scale + "px";
        this.node.style.height = this.node.contentWindow.document.body.scrollHeight + "px";
      }
    }, 500);
    
  }

  componentWillUnmount() {
    this._isMounted = false;

    this.node.removeEventListener('load', this.handleLoad);
  }

  getDoc() {
    return this.node ? this.node.contentDocument : null;
  }

  getMountTarget() {
    const doc = this.getDoc();
    if (this.props.mountTarget) {
      return doc.querySelector(this.props.mountTarget);
    }
    return doc.body.children[0];
  }

  // handleLoad = () => {
  //   this.forceUpdate();
  // };

  renderFrameContents() {
    if (!this._isMounted) {
      return null;
    }

    const doc = this.getDoc();

    if (!doc) {
      return null;
    }

    const contentDidMount = this.props.contentDidMount;
    const contentDidUpdate = this.props.contentDidUpdate;

    const win = doc.defaultView || doc.parentView;
    const contents = (
      <Content
        contentDidMount={contentDidMount}
        contentDidUpdate={contentDidUpdate}
      >
        <FrameContextProvider value={{ document: doc, window: win }}>
          <div className="frame-content">{this.props.children}</div>
        </FrameContextProvider>
      </Content>
    );

    if (doc.body.children.length < 1) {
      doc.open('text/html', 'replace');
      doc.write(this.props.initialContent);
      doc.close();
    }

    const mountTarget = this.getMountTarget();

    return [
      ReactDOM.createPortal(this.props.head, this.getDoc().head),
      ReactDOM.createPortal(contents, mountTarget)
    ];
  }

  render() {
    const props = {
      ...this.props,
      children: undefined // The iframe isn't ready so we drop children from props here. #12, #17
    };
    delete props.head;
    delete props.initialContent;
    delete props.mountTarget;
    delete props.contentDidMount;
    delete props.contentDidUpdate;
    return (
      <iframe
        style={{height:1000}}
        {...props}
        title="internal-frame"
        ref={node => {
          this.node = node;
        }}
      >

        {this.renderFrameContents()}
      </iframe>
    );
  }
}
