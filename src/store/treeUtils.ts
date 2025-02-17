import { DirectoryManager, FileManager } from "../models/menuInterfaces";


export function removeNodeFromTree(
  current: DirectoryManager | FileManager,
  nodeId: string
): DirectoryManager | FileManager | null {
  if (current.id === nodeId) {
    return null;
  }
  if ("children" in current) {
    const cloned = structuredClone(current) as DirectoryManager;
    cloned.children = cloned.children
      .map((child) => removeNodeFromTree(child, nodeId))
      .filter(Boolean) as (DirectoryManager | FileManager)[];
    return cloned;
  }
  return current;
}

export function addChildToTree(
  current: DirectoryManager | FileManager,
  parentId: string,
  newChild: DirectoryManager | FileManager
): DirectoryManager | FileManager {
  if (current.id === parentId && "children" in current) {
    const cloned = structuredClone(current) as DirectoryManager;
    cloned.isExtended = true;
    cloned.children.push(newChild);
    return cloned;
  }
  if ("children" in current) {
    const cloned = structuredClone(current) as DirectoryManager;
    cloned.children = cloned.children.map((c) =>
      addChildToTree(c, parentId, newChild)
    );
    return cloned;
  }
  return current;
}

export function updateNodeInTree(
  current: DirectoryManager | FileManager,
  updatedNode: DirectoryManager | FileManager
): DirectoryManager | FileManager {
  if (current.id === updatedNode.id) {
    return updatedNode;
  }
  if ("children" in current) {
    const cloned = structuredClone(current) as DirectoryManager;
    cloned.children = cloned.children.map((child) =>
      updateNodeInTree(child, updatedNode)
    );
    return cloned;
  }
  return current;
}

export function createFinder() {
  function findNode(
    current: DirectoryManager | FileManager,
    nodeId: string
  ): DirectoryManager | FileManager | null {
    if (current.id === nodeId) return current;
    if ("children" in current) {
      for (const child of current.children) {
        const found = findNode(child, nodeId);
        if (found) return found;
      }
    }
    return null;
  }
  return findNode;
}

export function findParentOfNode(
  current: DirectoryManager | FileManager,
  childId: string
): DirectoryManager | null {
  if ("children" in current) {
    for (const c of current.children) {
      if (c.id === childId) {
        return current as DirectoryManager;
      }
      const result = findParentOfNode(c, childId);
      if (result) return result;
    }
  }
  return null;
}

export function checkDuplicateName(
  parent: DirectoryManager,
  name: string,
  isFile: boolean,
  ignoreId?: string
): boolean {
  return parent.children.some((child) => {
    if (child.id === ignoreId) return false;
    if ("name" in child && !isFile) {
      return child.name === name;
    } else if ("file" in child && isFile) {
      return child.file?.name === name;
    }
    return false;
  });
}
