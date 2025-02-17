// src/store/useDirectoryStore.ts
import { create } from "zustand";
import {
  SingleState,
  ActionParams,
} from "../models/menuInterfaces";

import { actionMap } from "./actionMap";
import {
  createFinder,
  findParentOfNode,
  checkDuplicateName,
  updateNodeInTree,
} from "./treeUtils";

interface DirectoryStore {
  data: SingleState;
  doAction: (params: ActionParams) => void;
}

export const useDirectoryStore = create<DirectoryStore>((set, get) => ({
  data: {
    tree: null,
    openFileId: null,
    textValue: "",
  },

  doAction: ({ action, nodeId, payload }: ActionParams) => {
    const clonedData = structuredClone(get().data) as SingleState;

    const findNode = createFinder();
    const extra = {
      findNode,
      findParentOfNode,
      checkDuplicateName,
      updateNodeInTreeFn: updateNodeInTree,
    };

    const handler = actionMap[action];
    if (handler) {
      handler(clonedData, nodeId, payload, extra);
    }
    set({ data: clonedData });
  },
}));
