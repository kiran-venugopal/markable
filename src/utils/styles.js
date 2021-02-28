import styled from "styled-components";

export const StyledAppContainer = styled.div`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  cursor: pointer;

  html,
  body {
    margin: 0;
  }
`;

export const StyledHeader = styled.div`
  font-size: 25px;
  font-weight: 500;
  height: 80px;
  display: flex;
  padding: 10px;
  background: #f3f3f3;
  align-items: center;
  padding: 0 3vw;
`;

export const Button = styled.button`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-around;
  border: none;
  padding: 5px;
  margin: 10px;
  color: ${(props) => (props.mode === "danger" ? "white" : "#484848")};
  outline: none;
  background: #ff3e7f;
  font-weight: 600;
  border-radius: 15px;
  padding: 5px 10px;
  color: white;
  box-shadow: 2px 3px 6px 1px #00000036;

  :active {
    box-shadow: none;
  }

  .icon {
    display: block;
    padding: 2px;
  }
  .text {
    display: block;
    padding: 2px;
  }
`;

export const NoteEditorContainer = styled.div`
  padding: 20px;
  margin: 20px 0;

  .button {
    text-align: right;
    margin-left: auto;
    margin-top: 20px;
  }
`;

export const NoteContainer = styled.div`
  border: 1px solid lightgray;
  border-radius: 3px;
  background: white;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  padding: 30px 3vw;
`;

export const IconButton = styled.button`
  border: none;
  padding: 5px;
  background: #ececec;
  margin: 3px;
  border-radius: 4px;
  display: flex;
  cursor: pointer;
`;

export const AlignToRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ModalQuillWrapper = styled.div`
  padding: 3vw;
  width: 57vw;
  height: 30vh;
  overflow: hidden;
`;

export const ModalDangerTitle = styled.div`
  font-size: 18px;
  font-family: sans-serif;
  text-align: center;
  color: darkred;
  font-weight: 500;
`;

export const ModalActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #e6e6e6;
`;
