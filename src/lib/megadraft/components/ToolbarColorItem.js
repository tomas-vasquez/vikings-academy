import React, { Component } from "react";
import classnames from "classnames";

import { GithubPicker as ChromePicker } from "lib/react-color/lib";
import tinyColor from "tinycolor2";

import { RichUtils } from "draft-js";
import { Manager, Reference, Popper } from 'react-popper';

import Icon from "@icons/material/ColorHelperIcon"
import Icon2 from "@icons/material/FormatColorTextIcon"
import { Fade } from "reactstrap";

export default class ToolbarColorItem extends Component {

  constructor(props) {
    super();

    this.state = {
      displayColorPicker2: false,
      color: "black",
      popperRef: null,
      popperElem: null,
      arrowElement: null
    }

    this.arrowElement = React.createRef;

    let currentStyles = props.editorState.getCurrentInlineStyle()._map._list._tail;
    if (currentStyles !== undefined) {

      currentStyles.array.forEach((style, index) => {
        if (style) {
          if (style[0]) {
            if (style[0].startsWith("color-")) {
              var color2 = "#" + style[0].substring(6, 12)
              let col = new tinyColor(color2);
              this.state = { color: color2, lumia: this.getLumiaColor2(col) }
            }
          }
        }
      });
    }
  }

  getLumiaColor = color => {
    const luma = ((0.299 * color.rgb.r) + (0.587 * color.rgb.g) + (0.114 * color.rgb.b) / 255);
    return luma > 127 ? "black" : "white";
  }

  getLumiaColor2 = color => {
    const luma = ((0.299 * color._r) + (0.587 * color._g) + (0.114 * color._b) / 255);
    return luma > 127 ? "black" : "white";
  }

  colorAux

  handleChangeColor2 = color => {
    this.setState({ color: color.hex, lumia: this.getLumiaColor(color), displayColorPicker2: false })
  }

  handleClick2 = () => {
    this.setState({ displayColorPicker2: !this.state.displayColorPicker2 })
  };

  onOpenedPalet = () => {
    setTimeout(() => {
      const newEditorState = RichUtils.toggleInlineStyle(
        this.props.editorState,
        "color-"
      );
      this.props.onChange(newEditorState);
    }, 100);

  }

  onClosedPalet = () => {
    setTimeout(() => {
      var safeName = this.state.color.replace('#', '').toUpperCase();
      const newEditorState = RichUtils.toggleInlineStyle(
        this.props.editorState,
        "color-" + safeName
      );
      this.props.onChange(newEditorState);
    }, 300);
  }


  render() {

    const className = classnames("toolbar__item", {
      "toolbar__item--active": this.props.active
    });

    return (

      <li className={className}>
        <Manager >
          <Reference >
            {({ ref }) => (
              <button className="toolbar__button" id="butom1234" ref={ref} onClick={() => {
                this.handleClick2();
              }}>
                <div className="p-1" style={{ position: "relative" }}>
                  <Icon style={{ color: this.state.color }} />
                  <Icon2 style={{ position: "absolute", left: 8 }} />
                </div>
              </button>
            )}
          </Reference>
          <Popper modifiers={[]} placement="bottom">

            {({ placement, ref, style }) => (

              <div ref={ref} style={style} data-placement={placement}>

                <Fade onEntered={this.onOpenedPalet} onExited={this.onClosedPalet} className={classnames({"d-none": !this.state.displayColorPicker2})} in={this.state.displayColorPicker2}  >

                  <ChromePicker
                    triangle={"hide"}
                    color={this.state.color}
                    colors={['#191918', '#3B3738', '#161616', '#000000', '#2B2B2B', '#404040', '#585858', '#191919', '#C63D0F', '#DE1B1B', '#FF4136', '#B22222', '#7D1935', '#B71427', '#FF0000', '#E44424', '#9370DB', '#B10DC9', '#FF69B4', '#FFC0CB', '#FFD700', '#DAA520', '#D9853B', '#FF851B', '#FFA500', '#FF9009', '#FF8C00', '#FF7F50', '#FFF056', '#FFDC00', '#FFE658', '#F3FAB6', '#005A31', '#A8CD1B', '#CBE32D', '#ADFF2F', '#3D9970', '#2ECC40', '#00FF00', '#118C4E', '#228B22', '#E9E581', '#C1E1A6', '#A2AB58', '#00008B', '#4A96AD', '#6DBDD6', '#67BCDB', '#191970', '#0074D9', '#7FDBFF', '#39CCCC', '#AAAAAA', '#DDDDDD', '#DFE2DB', '#ECECEA', '#FDF3E7', '#FEFBEC', '#F6F6F6', '#FFFFFF']}
                    onChangeComplete={this.handleChangeColor2}
                  />

                </Fade>
                <div style={{ width: 310 }} />

              </div>
            )}
          </Popper>

        </Manager>


      </li>
    );
  }
}
