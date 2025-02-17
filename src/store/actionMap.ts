/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionType, SingleState } from "../models/menuInterfaces";
import {
  handleSetTree,
  handleRemoveNode,
  handleOpenFile,
  handleSetText,
  handleSaveFile,
  handleAddFolder,
  handleAddFile,
  handleUpdateNode,
} from "./actionHandlers";

export const actionMap: Record<
  ActionType,
  (
    state: SingleState,
    nodeId?: string,
    payload?: any,
    extra?: any
  ) => void
> = {
  SET_TREE: handleSetTree,
  REMOVE_NODE: handleRemoveNode,
  OPEN_FILE: handleOpenFile,
  SET_TEXT: handleSetText,
  SAVE_FILE: (state, _nodeId, _payload, extra) => {
    handleSaveFile(state, extra.findNode);
  },
  ADD_FOLDER: (state, nodeId, payload, extra) => {
    handleAddFolder(
      state,
      nodeId,
      payload,
      extra?.findNode,
      extra?.checkDuplicateName
    );
  },
  ADD_FILE: (state, nodeId, payload, extra) => {
    handleAddFile(
      state,
      nodeId,
      payload,
      extra?.findNode,
      extra?.checkDuplicateName
    );
  },
  UPDATE_NODE: (state, _nodeId, payload, extra) => {
    handleUpdateNode(
      state,
      payload,
      extra?.findParentOfNode,
      extra?.checkDuplicateName,
      extra?.updateNodeInTreeFn
    );
  },
};
