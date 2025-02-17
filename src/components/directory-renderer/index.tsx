import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDirectoryStore } from "../../store/useDirectoryStore";
import { DirectoryManager, FileManager } from "../../models/menuInterfaces";
import AddDirectoryIcon from "../icons/add-directory-icon";
import RemoveIcon from "../icons/remove-icon";
import ArrowIcon from "../icons/arrow-icon";
import AddFileIcon from "../icons/add-file-icon";
import FolderIcon from "../icons/folder-icon";
import FileIcon from "../icons/file-icon";
import RenameIcon from "../icons/rename-icon";
import {
  DirNameWrapper,
  DirWrapper,
  StatusButtons,
  InputElement,
} from "../../styles/pages/home";
import { nameSchema } from "../../utils/inputValidationSchema";

interface DirectoryAndFileRendererProps {
  directoryOrFile: DirectoryManager | FileManager;
  fileContent?: string;
  onFileContentChange?: (newContent: string) => void;
  onFileOpen?: (fileId: string) => void;
}

const DirectoryAndFileRenderer: React.FC<DirectoryAndFileRendererProps> = ({
  directoryOrFile,
  fileContent,
  onFileContentChange,
  onFileOpen,
}) => {
  const { doAction } = useDirectoryStore();

  const isFolder = "children" in directoryOrFile;
  const [isEditing, setIsEditing] = useState<boolean>(() => {
    if (isFolder) {
      return directoryOrFile.name === "";
    } else {
      return (directoryOrFile as FileManager).file === null;
    }
  });

  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    if (isEditing) {
      if (isFolder) {
        setEditValue(directoryOrFile.name || "");
      } else {
        const f = (directoryOrFile as FileManager).file;
        setEditValue(f?.name || "");
      }
    }
  }, [isEditing, isFolder, directoryOrFile]);

  const [isAddingChild, setIsAddingChild] = useState(false);
  const [newChildType, setNewChildType] = useState<"folder" | "file" | null>(null);
  const [newChildName, setNewChildName] = useState("");


  const iconRotationHandler = useCallback(() => {
    if (isFolder) {
      doAction({
        action: "UPDATE_NODE",
        payload: {
          ...directoryOrFile,
          isExtended: !(directoryOrFile as DirectoryManager).isExtended,
        },
      });
    }
  }, [directoryOrFile, doAction, isFolder]);

  const removeSelf = useCallback(() => {
    doAction({ action: "REMOVE_NODE", nodeId: directoryOrFile.id });
  }, [directoryOrFile, doAction]);


  const handleRenameClick = useCallback(() => {
    setIsEditing(true);
    setIsAddingChild(false);
  }, []);

  const handleRenameEnter = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const typed = editValue.trim();
        if (!typed) {
          alert("Please enter a valid name");
          return;
        }else{
          try {
            await nameSchema.validate(typed);
          } catch (err: unknown) {
            if (err instanceof Error) {
              alert(err.message);
            } else {
              alert("An unknown error occurred.");
            }
            return;
          }
        };
        if (isFolder) {
          doAction({
            action: "UPDATE_NODE",
            payload: {
              ...directoryOrFile,
              name: typed,
              isExtended: true,
            },
          });
        } else {
          let finalName = typed;
          if (!finalName.endsWith(".txt")) {
            finalName += ".txt";
          }
          doAction({
            action: "UPDATE_NODE",
            payload: {
              ...directoryOrFile,
              file: new File([], finalName),
            },
          });
        }

        setIsEditing(false);
      }
    },
    [editValue, directoryOrFile, isFolder, doAction]
  );

  const startAddChild = useCallback(
    (type: "folder" | "file") => {
      if (!isFolder) return;
      setIsAddingChild(true);
      setNewChildType(type);
      setNewChildName("");
      setIsEditing(false);
    },
    [isFolder]
  );

  const handleAddChildEnter = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const typedValue = newChildName.trim();
        if (!typedValue) {
          alert("Please enter a valid name");
          return;
        }else{
          try {
            await nameSchema.validate(typedValue);
          } catch (err: unknown) {
            if (err instanceof Error) {
              alert(err.message);
            } else {
              alert("An unknown error occurred.");
            }
            return;
          }
        }

        if (!newChildType) return;

        if (newChildType === "folder") {
          doAction({
            action: "ADD_FOLDER",
            nodeId: directoryOrFile.id,
            payload: {
              name: typedValue,
              layerIndex: (directoryOrFile as DirectoryManager).layerIndex + 1,
            },
          });
        } else {
          let finalName = typedValue;
          if (!finalName.endsWith(".txt")) {
            finalName += ".txt";
          }
          doAction({
            action: "ADD_FILE",
            nodeId: directoryOrFile.id,
            payload: {
              name: finalName,
              layerIndex: (directoryOrFile as DirectoryManager).layerIndex + 1,
            },
          });
        }
        setIsAddingChild(false);
        setNewChildType(null);
        setNewChildName("");
      }
    },
    [newChildName, newChildType, directoryOrFile, doAction]
  );

  // باز کردن فایل
  const fileOpenHandler = useCallback(() => {
    if (!isFolder && (directoryOrFile as FileManager).file) {
      const fileManager = directoryOrFile as FileManager;
      if (fileManager.content !== undefined) {
        onFileContentChange?.(fileManager.content);
        doAction({ action: "OPEN_FILE", nodeId: directoryOrFile.id });
        onFileOpen?.(directoryOrFile.id);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onFileContentChange?.(content);
        doAction({ action: "OPEN_FILE", nodeId: directoryOrFile.id });
        onFileOpen?.(directoryOrFile.id);
      };
      reader.readAsText(fileManager.file!);
    }
  }, [directoryOrFile, isFolder, onFileContentChange, onFileOpen, doAction]);

  const fieldName = useMemo(() => {
    if (isFolder) return directoryOrFile.name;
    return (directoryOrFile as FileManager).file?.name;
  }, [directoryOrFile, isFolder]);

  const marginLeftValue =
    (directoryOrFile as DirectoryManager).layerIndex > 0
      ? `${(directoryOrFile as DirectoryManager).layerIndex + 15}px`
      : "0px";

  return (
    <div
      style={{
        marginLeft: marginLeftValue,
        borderLeft:
          (directoryOrFile as DirectoryManager).layerIndex === 0 ||
          isEditing ||
          isAddingChild
            ? "none"
            : "1px solid black",
      }}
    >
      {isEditing ? (
        <InputElement
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleRenameEnter}
          autoFocus
        />
      ) : (
        <DirWrapper>
          <DirNameWrapper>
            <div className="icon" onClick={iconRotationHandler} style={{ cursor: "pointer" }}>
              {isFolder && (directoryOrFile as DirectoryManager).children.length > 0 ? (
                <ArrowIcon rotated={(directoryOrFile as DirectoryManager).isExtended} />
              ) : (
                <div
                  style={{
                    width:
                      (directoryOrFile as DirectoryManager).layerIndex === 0
                        ? 0
                        : "1.5rem",
                  }}
                />
              )}
              {isFolder ? (
                <FolderIcon width={1.3} />
              ) : (
                <div style={{ cursor: "pointer" }} onClick={fileOpenHandler}>
                  <FileIcon />
                </div>
              )}
            </div>

            <div className="title">
              <span style={{ color: "white" }}>{fieldName}</span>
            </div>

            {isFolder ? (
              <>
                <StatusButtons onClick={() => startAddChild("folder")}>
                  <AddDirectoryIcon />
                </StatusButtons>
                <StatusButtons onClick={() => startAddChild("file")}>
                  <AddFileIcon />
                </StatusButtons>
                <StatusButtons onClick={handleRenameClick}>
                  <RenameIcon />
                </StatusButtons>
                <StatusButtons onClick={removeSelf}>
                  <RemoveIcon />
                </StatusButtons>
              </>
            ) : (
              <>
                <StatusButtons onClick={handleRenameClick}>
                  <RenameIcon />
                </StatusButtons>
                <StatusButtons onClick={removeSelf}>
                  <RemoveIcon />
                </StatusButtons>
              </>
            )}
          </DirNameWrapper>
        </DirWrapper>
      )}
      {isAddingChild && (
        <div style={{ marginLeft: "1.5rem", marginTop: "0.3rem" }}>
          <InputElement
            value={newChildName}
            onChange={(e) => setNewChildName(e.target.value)}
            onKeyDown={handleAddChildEnter}
            autoFocus
            placeholder={
              newChildType === "folder"
                ? "New folder name..."
                : "New file name..."
            }
          />
        </div>
      )}

      {isFolder && (directoryOrFile as DirectoryManager).isExtended && (
        <div>
          {(directoryOrFile as DirectoryManager).children.map((child) => (
            <DirectoryAndFileRenderer
              key={child.id}
              directoryOrFile={child}
              fileContent={fileContent}
              onFileContentChange={onFileContentChange}
              onFileOpen={onFileOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DirectoryAndFileRenderer;
