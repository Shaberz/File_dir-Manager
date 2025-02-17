import HomeWrapper, {
  MenuWrapper,
  TextAreaWrapper,
  EditorWrapper,
  Button,
  HeadersWrapper,
  BodyWrapper,
  StatusButtons,
} from "../../styles/pages/home";

import DirectoryAndFileRenderer from "../../components/directory-renderer";
import PlusIcon from "../../components/icons/add-directory-icon";
import { useDirectoryStore } from "../../store/useDirectoryStore";

export default function Home() {
  const {
    data: { tree, textValue },
    doAction,
  } = useDirectoryStore();

  const handleAddRoot = () => {
    doAction({
      action: "SET_TREE",
      payload: {
        id: crypto.randomUUID(),
        name: "",
        children: [],
        layerIndex: 0,
        isExtended: false,
      },
    });
  };
  
  const handleFileContentChange = (newContent: string) => {
    doAction({ action: "SET_TEXT", payload: newContent });
  };

  const handleSave = () => {
    doAction({ action: "SAVE_FILE" });
  };

  return (
    <HomeWrapper>
      <MenuWrapper>
        <HeadersWrapper style={{color:'white'}}>
          <span>Directory Manager</span>
          {!tree && (
            <StatusButtons onClick={handleAddRoot}>
              <PlusIcon />
            </StatusButtons>
          )}
        </HeadersWrapper>

        <BodyWrapper>
          {tree && (
            <DirectoryAndFileRenderer
              directoryOrFile={tree}
              fileContent={textValue}
              onFileContentChange={handleFileContentChange}
              onFileOpen={(fileId) =>
                doAction({ action: "OPEN_FILE", nodeId: fileId })
              }
            />
          )}
        </BodyWrapper>
      </MenuWrapper>

      <EditorWrapper>
      <TextAreaWrapper
          value={textValue}
          onChange={(e) =>
            doAction({ action: "SET_TEXT", payload: e.target.value })
          }
        />
        <Button
          style={{
            border: "2px solid rgba(22, 21, 21, 0.24)",
            width: "4rem",
            backgroundColor: "#009c82",
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            float: "right",
            padding: "0.75rem",
            margin: "0.3rem",
            cursor: "pointer",
          }}
          onClick={handleSave}
        >
          <span style={{ color: "rgb(30, 59, 155)", fontSize: "1rem" }}>
            Save
          </span>
        </Button>
      </EditorWrapper>
    </HomeWrapper>
  );
}
