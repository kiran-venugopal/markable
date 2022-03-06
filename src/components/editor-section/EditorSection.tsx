import theme from "../../utils/theme";
import imageCompression from "browser-image-compression";
import { useEffect, useRef, useState } from "react";
import Editor from "rich-markdown-editor";
import { useRecoilState, useSetRecoilState } from "recoil";
import { folderState, notesState, userState } from "../../recoil/atoms";
import { uuidv4 } from "../../utils/functions";
import useNoteUpdate from "../../hooks/useNoteUpdate";
import { updateNoteData } from "../../APIs/note";

function EditorComponent() {
  const [noteData, setNoteData] = useRecoilState(notesState);
  const setFolderData = useSetRecoilState(folderState);
  const { notes, activeNote } = noteData;
  const note = notes.find((n: any) => n.id === activeNote);
  const updateNote = useNoteUpdate();
  const timerRef = useRef<NodeJS.Timeout>();
  const [userData] = useRecoilState(userState);

  useEffect(() => {
    if (!activeNote) {
      if (notes.length === 0) {
        const id = uuidv4();
        let newNoteData, newFolderData;
        // TODO: handle with a custom hook
        setNoteData((prev: any) => {
          newNoteData = [
            {
              id,
              content: "",
              name: "untitled",
            },
          ];
          return {
            ...prev,
            notes: newNoteData,
            activeNote: id,
          };
        });
        setFolderData((prev) => {
          newFolderData = {
            ...prev,
            noteIds: [...prev.noteIds, id],
          };
          return newFolderData;
        });
        window.localStorage.setItem("notes", JSON.stringify(newNoteData));
        window.localStorage.setItem("folders", JSON.stringify(newFolderData));
      } else setNoteData((prev) => ({ ...prev, activeNote: notes[0].id }));
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
      updateNote({ content, id: note?.id });
    }, 1000);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      await updateNoteData(
        note?.id,
        {
          content: getContent(),
          name: note?.name,
        },
        userData.token
      );
    }, 4000);
  };

  return (
    <div className="editor-section">
      {note?.id && (
        <Editor
          key={note.id}
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
