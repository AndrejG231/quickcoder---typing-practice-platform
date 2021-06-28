import styled from "styled-components";

const DeleteAccountButton = styled.button`
  height: 50px;
  width: 200px;
  margin: auto;
  ${({ theme }) => `
    background: ${theme.colors.b4};
    color: ${theme.colors.w5};
  `}
`;

DeleteAccountButton.defaultProps = { children: "Delete" };

export default DeleteAccountButton;
