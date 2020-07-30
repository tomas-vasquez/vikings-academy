/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";

export default class MediaWrapper extends Component {
  
  _handleFocus= () => {
    // temporarily set the editor to readonly
    this.props.setReadOnly(true);
  }

  _handleBlur = () => {
    // restore readonly to its original state
    this.props.setInitialReadOnly();
  }

  render() {
    return (
      <div onBlur={this._handleBlur} onFocus={this._handleFocus}>
        {this.props.children}
      </div>
    );
  }
}
