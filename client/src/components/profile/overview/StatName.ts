import styled from "styled-components";

const StatName = styled.div`
  width: 20%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  text-align: left;
  padding: 5px;
  font-size: 16px;
  padding-left: 30px;
  ${({ theme }) => `
    background: ${theme.colors.b4};
    color: ${theme.colors.w5};
  `};
`;

export default StatName;
