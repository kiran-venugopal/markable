import styled from "styled-components";

export const DropDownWrapper = styled.div`
  position: relative;

  .menu-wrapper {
    position: absolute;
    background: white;
    right: 0;
    box-shadow: -2px 2px 13px #00000047;
    cursor: auto;
    z-index: 10;
  }
  .menu-item {
    padding: 5px 15px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    color: #4c4c4c;
    .icon {
      margin-right: 7px;
      opacity: 0.6;
    }
    transition: transform 100ms;

    :active {
      transform: scale(0.95);
    }
  }

  .pointer {
    cursor: pointer;
  }

  .menu-item:hover {
    background: whitesmoke;
  }
`;
