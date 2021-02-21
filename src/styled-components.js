import styled from "styled-components";

export const NavbarWrapper = styled.div`
  background: #03a9f4;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
  padding: 10px;
  height: 40px;

  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

export const AppHeader = styled.div`
  display: flex;
  color: white;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
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
