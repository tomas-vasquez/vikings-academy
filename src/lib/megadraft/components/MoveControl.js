/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import classNames from "classnames";
import MegadraftBlock from "./MegadraftBlock";

import { BLOCK_SWAP_UP, BLOCK_SWAP_DOWN } from "../constants";
import ArrowDownIcon from "@icons/material/ArrowDownIcon";
import SettingsIcon from "@icons/material/SettingsIcon";
import { MegadraftIcons } from "../Megadraft";
const Options = ({
  hideButtons,
  onClickUp,
  onClickDown,
  id,
  disableUp,
  disableDown,
  onAction,
  isAtomic,
}) => {
  const onPointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className={classNames("options", { "d-none": hideButtons|| !isAtomic })}>
      <div
        id={`swap-up-${id}`}
        data-testid={`swap-up-${id}`}
        className={
          disableUp
            ? "my-1 options__button options__button--up options__button--disabled"
            : "my-1 options__button options__button--up"
        }
        onClick={() => {
          onAction({ type: BLOCK_SWAP_UP, blockId: id });
          onClickUp();
        }}
        onPointerDown={onPointerDown}
      >
        <ArrowDownIcon />
      </div>
      <div
        id={`swap-down-${id}`}
        data-testid={`swap-down-${id}`}
        className={
          disableDown
            ? "mb-1 options__button options__button--disabled"
            : "mb-1 options__button"
        }
        onClick={() => {
          onAction({ type: BLOCK_SWAP_DOWN, blockId: id });
          onClickDown();
        }}
        onPointerDown={onPointerDown}
      >
        <ArrowDownIcon />
      </div>
      {isAtomic ? (
        <div
          id={`open-settings-${id}`}
          className={"mb-1 options__button"}
          onPointerDown={onPointerDown}
        >
          <SettingsIcon />
        </div>
      ) : null}
      {isAtomic ? (
        <div
          id={`delete-${id}`}
          className={"mb-1 options__button"}
          onPointerDown={onPointerDown}
        >
          <MegadraftIcons.DeleteIcon />
        </div>
      ) : null}
    </div>
  );
};

const Control = ({
  hideButtons,
  children,
  id,
  onClickUp,
  onClickDown,
  isFirst,
  isLast,
  onAction,
  isAtomic,
}) => (
  <div
    className={classNames("move-control", isAtomic && "move-control--atomic")}
    id={`move-control-${id}`}
  >
    <div className="move-control__target" data-testid={`block-${id}`}>
      {children}
    </div>
    <Options
      hideButtons={hideButtons}
      {...{ id, onClickUp, onClickDown, onAction, isAtomic }}
      disableUp={isFirst}
      disableDown={isLast}
    />
  </div>
);

const Controlled = ({
  hideButtons,
  keySwapUp,
  keySwapDown,
  isFirstBlock,
  isLastBlock,
  isAtomic,
  swapUp,
  swapDown,
  onAction,
  children,
}) => {
  const onClickUp = () => swapUp(keySwapUp);
  const onClickDown = () => swapDown(keySwapDown);
  const isFirst = isFirstBlock(keySwapUp);
  const isLast = isLastBlock(keySwapDown);

  return (
    <MegadraftBlock>
      <Control
        hideButtons={hideButtons}
        id={
          keySwapUp !== keySwapDown ? `${keySwapUp}-${keySwapDown}` : keySwapUp
        }
        {...{ onClickUp, onClickDown, isFirst, isLast, onAction, isAtomic }}
      >
        {children}
      </Control>
    </MegadraftBlock>
  );
};

export default ({
  hideButtons,
  wrapper,
  swapUp,
  swapDown,
  children,
  isFirstBlock,
  isLastBlock,
  onAction,
  isAtomic,
}) => {
  const arrayChildren = React.Children.toArray(children);
  const firstChildKey = arrayChildren[0].props.children.key;
  const lastChildKey =
    arrayChildren[arrayChildren.length - 1].props.children.key;

  const controlledChildren = React.Children.map(children, (child) => {
    const currentKey = child.props.children.key;
    return (
      <Controlled
        hideButtons={hideButtons}
        keySwapUp={currentKey}
        keySwapDown={currentKey}
        {...{ swapUp, swapDown, isFirstBlock, isLastBlock, onAction, isAtomic }}
      >
        {child}
      </Controlled>
    );
  });

  return wrapper ? (
    <Controlled
      hideButtons
      keySwapUp={firstChildKey}
      keySwapDown={lastChildKey}
      {...{ swapUp, swapDown, isFirstBlock, isLastBlock, onAction }}
    >
      {React.cloneElement(wrapper, [], children)}
    </Controlled>
  ) : (
    controlledChildren
  );
};
