import theme from "../../utils/theme";
import imageCompression from "browser-image-compression";
import { useEffect, useState } from "react";
import Editor from "@nijat13/rich-markdown-editor-with-resizer";
import { useRecoilState, useSetRecoilState } from "recoil";
import { folderState, notesState } from "../../recoil/atoms";
import { uuidv4 } from "../../utils/functions";

function EditorComponent() {
  const [noteData, setNoteData] = useRecoilState(notesState);
  const setFolderData = useSetRecoilState(folderState);
  const { notes, activeNote } = noteData;
  const note = notes.find((n: any) => n._id === activeNote);
  console.log({ note });

  useEffect(() => {
    if (!activeNote) {
      if (notes.length === 0) {
        const _id = uuidv4();
        let newNoteData, newFolderData;
        // TODO: handle with a custom hook
        setNoteData((prev: any) => {
          newNoteData = [
            {
              _id,
              content: "",
              name: "untitled",
            },
          ];
          return {
            ...prev,
            notes: newNoteData,
            activeNote: _id,
          };
        });
        setFolderData((prev) => {
          newFolderData = {
            ...prev,
            noteIds: [...prev.noteIds, _id],
          };
          return newFolderData;
        });
        window.localStorage.setItem("notes", JSON.stringify(newNoteData));
        window.localStorage.setItem("folders", JSON.stringify(newFolderData));
      } else setNoteData((prev) => ({ ...prev, activeNote: notes[0]._id }));
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    const compressed_file = await imageCompression(file, {
      maxSizeMB: 1,
    });
    const url = await imageCompression.getDataUrlFromFile(compressed_file);
    return url as string;
  };

  const handleEditorChange = (getContent: () => string) => {
    setTimeout(() => {
      const content = getContent();
      setNoteData((prev) => ({
        ...prev,
        notes: prev.notes.map((n) => {
          if (n._id === note?._id) {
            return {
              ...n,
              content,
            };
          }
          return n;
        }),
      }));
    }, 1000);
  };

  return (
    <div className="editor-section">
      {note?._id && (
        <Editor
          key={note._id}
          defaultValue={note.content}
          onChange={handleEditorChange}
          uploadImage={handleFileUpload}
          theme={theme}
          className="editor"
        />
      )}
    </div>
  );
}

export default EditorComponent;
