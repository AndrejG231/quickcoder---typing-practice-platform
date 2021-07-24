import styled from "styled-components";

interface props {
  big?: boolean;
}

const NotifyText = styled.p<props>`
  width: 50%;
  text-align: center;
  font-size: ${({big}) => big ? 42 : 30}px;
  margin: auto;
  color: ${({ theme }) => theme.colors.w5};
`;

export default NotifyText;
