
import { SingleState, DirectoryManager,
        FileManager, AddFolderPayload,
        AddFilePayload } from "../models/menuInterfaces";
import {
  removeNodeFromTree,
  addChildToTree,
  updateNodeInTree,
} from "./treeUtils";

export function handleSetTree(
  state: SingleState, 
  _nodeId: string | undefined, 
  payload: unknown
) {
  state.tree = payload as DirectoryManager | FileManager | null;
}

export function handleRemoveNode(state: SingleState, nodeId?: string) {
  if (!nodeId || !state.tree) return;
  state.tree = removeNodeFromTree(state.tree, nodeId);
}

export function handleOpenFile(
  state: SingleState,
  nodeId: string | undefined,
  extra?: { findNode: (root: DirectoryManager | FileManager, id: string) => DirectoryManager | FileManager | null }
) {
  if (!nodeId || !state.tree) return;
  state.openFileId = nodeId;
  const targetNode = extra?.findNode(state.tree, nodeId);
  if (targetNode && "file" in targetNode) {
    state.textValue = targetNode.content ?? "";
  }
}
export function handleSetText(
  state: SingleState,
  _nodeId: string | undefined,
  payload?: unknown,
) {
  state.textValue = (payload as string) ?? "";
}

export function handleSaveFile(
  state: SingleState,
  findNode: (root: DirectoryManager | FileManager, id: string) => DirectoryManager | FileManager | null
) {
  const { openFileId, tree } = state;
  const currentText = state.textValue ?? "";
  if (!tree || !openFileId) {
    alert("No file is currently open to save.");
    return;
  }
  const targetNode = findNode(tree, openFileId);
  if (targetNode && "file" in targetNode && targetNode.file) {
    const fileName = targetNode.file.name;
    const updatedFile = new File([currentText], fileName, {
      type: "text/plain",
    });
    const newNode = { ...targetNode, file: updatedFile, content: currentText };
    state.tree = updateNodeInTree(tree, newNode);
    alert(`File changes saved! (Open File ID: ${openFileId})`);
    state.textValue = currentText;
  } else {
    alert("No file found to save.");
  }
}

export function handleAddFolder(
  state: SingleState,
  nodeId: string | undefined,
  payload?: AddFolderPayload,
  findNode?: (root: DirectoryManager | FileManager, id: string) => DirectoryManager | FileManager | null,
  checkDuplicateName?: (parent: DirectoryManager, name: string, isFile: boolean, ignoreId?: string) => boolean
) {
  if (!nodeId || !state.tree || !findNode) return;
  const parent = findNode(state.tree, nodeId);
  if (!parent || !("children" in parent)) return;

  const folderName = payload?.name || "";
  if (folderName && checkDuplicateName && checkDuplicateName(parent as DirectoryManager, folderName, false)) {
    alert("Duplicate folder name!");
    return;
  }

  const newFolder: DirectoryManager = {
    id: crypto.randomUUID(),
    name: folderName,
    children: [],
    layerIndex: payload?.layerIndex ?? 0,
    isExtended: false,
  };
  state.tree = addChildToTree(state.tree, nodeId, newFolder);
}

export function handleAddFile(
  state: SingleState,
  nodeId: string | undefined,
  payload?: AddFilePayload,
  findNode?: (root: DirectoryManager | FileManager, id: string) => DirectoryManager | FileManager | null,
  checkDuplicateName?: (parent: DirectoryManager, name: string, isFile: boolean, ignoreId?: string) => boolean
) {
  if (!nodeId || !state.tree || !findNode) return;
  const parent = findNode(state.tree, nodeId);
  if (!parent || !("children" in parent)) return;
  const fileName = payload?.name || "";
  if (fileName && checkDuplicateName && checkDuplicateName(parent as DirectoryManager, fileName, true)) {
    alert("Duplicate file name!");
    return;
  }
  const newFile: FileManager = {
    id: crypto.randomUUID(),
    file: fileName ? new File([], fileName) : null,
    layerIndex: payload?.layerIndex ?? 0,
  };
  state.tree = addChildToTree(state.tree, nodeId, newFile);
}

export function handleUpdateNode(
  state: SingleState,
  payload?: DirectoryManager | FileManager,
  findParentOfNode?: (root: DirectoryManager | FileManager, childId: string) => DirectoryManager | null,
  checkDuplicateName?: (parent: DirectoryManager, name: string, isFile: boolean, ignoreId?: string) => boolean,
  updateNodeInTreeFn?: typeof updateNodeInTree
) {
  if (!payload || !state.tree || !findParentOfNode || !updateNodeInTreeFn) return;
  const parent = findParentOfNode(state.tree, payload.id);
  if (parent) {
    if ("file" in payload) {
      const newName = payload.file?.name;
      if (newName && checkDuplicateName && checkDuplicateName(parent, newName, true, payload.id)) {
        alert("Duplicate file name!");
        return;
      }
    } else {
      const newName = payload.name;
      if (newName && checkDuplicateName && checkDuplicateName(parent, newName, false, payload.id)) {
        alert("Duplicate folder name!");
        return;
      }
    }
  }
  state.tree = updateNodeInTreeFn(state.tree, payload);
}


