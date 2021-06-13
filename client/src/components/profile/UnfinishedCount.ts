import styled from "styled-components";

const UnfinishedCount = styled.p`
  ${({ theme }) => `
    background: ${theme.colors.w4};
    color: ${theme.colors.b5};
    `};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 10px;
  text-align: center;
  position: absolute;
  top: 5px;
  right: 5px;
  margin: 0;
`;

export default UnfinishedCount;
