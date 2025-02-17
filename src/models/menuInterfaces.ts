export interface DirectoryManager {
  id: string;
  name: string;
  children: Array<DirectoryManager | FileManager>;
  layerIndex: number;
  isExtended: boolean;
}

export interface FileManager {
  id: string;
  file: File | null;
  layerIndex: number;
  content?: string;
}

export interface SingleState {
  tree: DirectoryManager | FileManager | null;
  openFileId: string | null;
  textValue: string;
}

export type ActionType =
  | "SET_TREE"
  | "REMOVE_NODE"
  | "OPEN_FILE"
  | "SET_TEXT"
  | "SAVE_FILE"
  | "ADD_FOLDER"
  | "ADD_FILE"
  | "UPDATE_NODE";

export interface ActionParams {
  action: ActionType;
  nodeId?: string;
  payload?: unknown;
}

export interface AddFolderPayload {
  name?: string;
  layerIndex?: number;
}
export interface AddFilePayload {
  name?: string;
  layerIndex?: number;
}