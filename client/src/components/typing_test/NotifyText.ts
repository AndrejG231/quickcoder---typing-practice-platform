import styled from "styled-components";

interface props {}

const NotifyText = styled.p<props>`
  width: 50%;
  text-align: center;
  font-size: 30px;
  margin: auto;
  color: ${({ theme }) => theme.colors.w5};
`;

export default NotifyText;
