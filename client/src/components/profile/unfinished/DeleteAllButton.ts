import styled from "styled-components";

interface props {
  isOnScreen?: boolean;
}

const DeleteAllButton = styled.button<props>`
  transition: 0.2s all linear;
  ${({ isOnScreen }) => (!isOnScreen ? "transform: translateX(-100vw)" : "")};
  margin: 10px;
  font-size: 20px;
  grid-area: delete;
  cursor: pointer;
  ${({ theme }) => `
    background: ${theme.colors.b4};
    color: ${theme.colors.w5};
    border: 2px solid ${theme.colors.w4};
    &:hover{
      background: ${theme.colors.w4};
      color: ${theme.colors.b5};
      border: 2px solid ${theme.colors.b4};
    }
  `}
`;

DeleteAllButton.defaultProps = {
  children: "Delete all",
};

export default DeleteAllButton;
