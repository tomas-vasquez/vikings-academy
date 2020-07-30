import React, { Component, useState } from "react";
import classnames from "classnames";

import { GithubPicker as ChromePicker } from "lib/react-color/lib";
import tinyColor from "tinycolor2";

import { RichUtils } from "draft-js";
import { Manager,Popper,Reference, usePopper } from 'react-popper';

import Icon from "@icons/material/ColorHelperIcon"
import Icon2 from "@icons/material/FormatColorTextIcon";

const Poppere = () => {
      const [referenceElement, setReferenceElement] = useState(null);
      const [popperElement, setPopperElement] = useState(null);
      const [arrowElement, setArrowElement] = useState(null);
      
      const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement }},{
          name: 'offset',
              options: {
                offset: [0, 4],
              },
        }],
      }); 

      return (
        <>
          <button type="button" ref={setReferenceElement} className="toolbar__button" id="butom1234" onClick={() => {
            this.props.handleClick2();
          }}>
            <div className="p-1" style={{ position: "relative" }}>
              <Icon style={{ color: this.props.color }} />
              <Icon2 style={{ position: "absolute", left: 8 }} />
            </div>
          </button>

          <div className={classnames({"d-none": !this.props.displayColorPicker2})} id="tooltip" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
           <ChromePicker
                triangle={"hide"}
                color={this.props.color}
                colors={['#191918', '#3B3738', '#161616', '#000000', '#2B2B2B', '#404040', '#585858', '#191919', '#C63D0F', '#DE1B1B', '#FF4136', '#B22222', '#7D1935', '#B71427', '#FF0000', '#E44424', '#9370DB', '#B10DC9', '#FF69B4', '#FFC0CB', '#FFD700', '#DAA520', '#D9853B', '#FF851B', '#FFA500', '#FF9009', '#FF8C00', '#FF7F50', '#FFF056', '#FFDC00', '#FFE658', '#F3FAB6', '#005A31', '#A8CD1B', '#CBE32D', '#ADFF2F', '#3D9970', '#2ECC40', '#00FF00', '#118C4E', '#228B22', '#E9E581', '#C1E1A6', '#A2AB58', '#00008B', '#4A96AD', '#6DBDD6', '#67BCDB', '#191970', '#0074D9', '#7FDBFF', '#39CCCC', '#AAAAAA', '#DDDDDD', '#DFE2DB', '#ECECEA', '#FDF3E7', '#FEFBEC', '#F6F6F6', '#FFFFFF']}
                onChangeComplete={this.handleChangeColor2}
              /> 
            <div id="arrow" ref={setArrowElement} style={styles.arrow}></div>
            
            
          </div>
        </>
      );
    };

    export default Poppere;