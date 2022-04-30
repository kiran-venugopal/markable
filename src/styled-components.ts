
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from "styled-components";

export const NavbarWrapper = styled.div`
  padding: 10px 10px 0 10px;
  border-bottom: 1px solid #e4e4e4;
  .app-header {
    display: flex;
    justify-content: space-between;
    .menu {
      cursor: pointer;
    }
  }

  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 35px;

    button {
      padding-bottom: 12px;
      background: transparent;
    }
    .active {
      border-bottom: 4px solid #ff89b1;
      padding-bottom: 8px;
    }
  }
`;

export const AppHeader = styled.div`
  display: flex;
  color: #2d2d2d;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  padding: 0 3px;
`;

export const PrimaryBtn = styled.button`
  background: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  box-shadow: 4px 5px 6px #00000066;
  outline: none;
  cursor: pointer;

  :active {
    box-shadow: 2px 3px 3px #00000066 inset;
  }
`;

export const NavLink = styled.button`
  margin: 0 5px;
  font-size: 15px;
  border: none;
  outline: none;
  cursor: pointer;
`;

//Drawer components

export const DrawerWrapper = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  background: #0000005e;
  z-index: 10;
  display: flex;
  overflow: hidden;

  .d-content {
    height: 100%;
    width: ${(props: any) => props.contentWidth || "300px"};
    background: white;
    transform: ${(props: any) => `translate(${props.contentWidth || "300px"})`};
    transition: 300ms transform;
    .close {
      text-align: right;
      padding: 10px;
      .icon {
        cursor: pointer;
      }
    }
  }

  .spaceholder {
    flex-grow: 1;
  }
`;

export const MenuWrapper = styled.div`
  height: 100%;
  .header {
    padding-bottom: 10px;

    img {
      width: 60px;
      border-radius: 50%;
      margin: auto;
      display: block;
    }
    .name {
      text-align: center;
      padding-top: 15px;
      font-weight: 600;
      font-size: 16px;
    }
    .email {
      text-align: center;
      font-size: 12px;
      color: #6b6b6b;
      padding-top: 4px;
    }
  }
  .options {
    height: 100%;
    margin-top: 30px;
    .option {
      margin: 0 5px;
      font-size: 14px;
      color: #444444;
      justify-content: center;
      align-items: center;
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon {
        margin-right: 5px;
      }
    }
  }
`;

export const SectionsWrapper = styled.div`
  display: flex;
  margin: 30px 10px;
  font-size: 14px;
  overflow-x: auto;

  .section {
    .header {
      padding: 5px;
      text-align: center;
      color: white;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .todo-item {
      background: white;
      padding: 7px;
      border-radius: 5px;
      margin: 10px 0;
      box-shadow: -2px 4px 4px #0000001f;
      border: 1px solid;
      cursor: grab;
      .todo-header {
        text-align: right;
        color: grey;
        margin-top: -5px;
        span {
          cursor: pointer;
        }
      }
    }
    padding: 10px;
    width: 25vw;
    min-width: 280px;
    min-height: 500px;
    overflow-y: auto;
    max-height: 75vh;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .open {
    background: #ff000036;
    .todo-item {
      border-color: #ff777c;
    }
    .header {
      background: #ff777c;
    }
  }
  .inprogress {
    background: #2479d436;
    .todo-item {
      border-color: #83b9f9;
    }
    .header {
      background: #83b9f9;
    }
  }
  .done {
    background: #0bef6833;
    .todo-item {
      border-color: #7dd69c;
    }
    .header {
      background: #7dd69c;
    }
  }
`;

export const AddTodoWrapper = styled.div`
  .header {
    font-weight: 600;
  }
  width: 100%;

  .field {
    margin: 20px 0px;
    font-size: 13px;
    input {
      padding: 10px;
      background: whitesmoke;
      border: none;
    }
    textarea {
      margin: 0px;
      width: 80vw;
      background: whitesmoke;
      border: none;
      padding: 10px;
      max-width: 700px;
      min-height: 100px;
    }
    .label {
      margin: 5px 0;
    }
  }
`;

export const Spinner = styled.div`
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid grey;
  width: 1em;
  height: 1em;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
