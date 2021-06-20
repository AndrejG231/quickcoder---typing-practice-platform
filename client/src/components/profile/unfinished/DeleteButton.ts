import { Trash } from "@styled-icons/boxicons-regular";
import styled from "styled-components";

const DeleteButton = styled(Trash)`
  ${({ theme }) => `
    background: ${theme.colors.b3};
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
    color: ${theme.colors.w4};
    margin: auto;
    cursor: pointer;
  `}
`;

export default DeleteButton;
