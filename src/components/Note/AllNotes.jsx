import React, { useEffect, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { Button } from "../../utils/styles";
import NoteItem from "./NoteItem";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { NoteContainer } from "../../utils/styles";
import { LayoutGenerator } from "../../utils/functions";
import { useRecoilState } from "recoil";
import { notesState, userState } from "../../recoil/atoms";
import { fetchNotes, updateLayouts } from "../../APIs/note";

const ResponsiveGridLayout = WidthProvider(Responsive);

const AllNotes = () => {
  const [localNotes, setLocalNotes] = useLocalStorage("notes");
  const [layouts, setLayouts] = useState({ lg: [], md: [] });
  const [noteData, setNoteData] = useRecoilState(notesState);
  const [userData] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    async function getNotes() {
      const res = await fetchNotes(userData.token);

      if (res.success) {
        const { layout, itemsWithLayout } = LayoutGenerator(
          res.notes.reverse()
        );
        setNoteData((prev) => ({
          ...prev,
          notes: itemsWithLayout || [],
          reload: false,
        }));

        setLayouts({
          lg: layout,
          md: layout,
          sm: layout,
          xs: layout,
          xxs: layout,
        });
      }
      setIsLoading(false);
    }
    if (isLoading || noteData.reload) getNotes();
  }, [noteData.reload]);

  let noteNodes = noteData.notes.map((note) => (
    <NoteContainer key={note._id}>
      <NoteItem note={note} />
    </NoteContainer>
  ));

  if (isLoading) {
    return <div>Loading..</div>;
  }

  function onLayoutChange(layouts) {
    updateLayouts(layouts, userData.token);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => {
            history.push("/notes/add");
          }}
        >
          <FaPlusSquare className="icon" />
          <span className="text">Add Note</span>
        </Button>
      </div>
      {noteData.notes.length === 0 && (
        <div style={{ textAlign: "center", margin: "50px 0" }}>
          You don't have any notes.
        </div>
      )}
      <div>
        <ResponsiveGridLayout
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          width={1200}
          draggableHandle=".widget"
          margin={[20, 20]}
          onLayoutChange={onLayoutChange}
        >
          {noteNodes}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default AllNotes;
