/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

export const defaultAction = () => {};

export const ActionsContext = React.createContext({ onAction: defaultAction });

const ActionsProvider = ({ onAction = defaultAction, children }) => (
  <ActionsContext.Provider value={{ onAction }}>
    {children}
  </ActionsContext.Provider>
);


export default ActionsProvider;
