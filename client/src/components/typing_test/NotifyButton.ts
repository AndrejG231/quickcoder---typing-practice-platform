import styled from "styled-components";

interface props {
  third?: boolean;
}

const NotifyButton = styled.button<props>`
  background: ${({ theme }) => theme.colors.b4};
  color: ${({ theme }) => theme.colors.w5};
  font-size: 30px;
  padding: 10px;
  width: ${({ third }) => (third ? 28 : 40)}%;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.b5};
    background: ${({ theme }) => theme.colors.w4};
  }
`;

export default NotifyButton;
