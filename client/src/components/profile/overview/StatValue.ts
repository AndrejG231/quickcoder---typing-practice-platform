import styled from "styled-components";

const StatValue = styled.p`
  font-size: 60px;
  font-style: italic;
  text-decoration: underline;
  ${({ theme }) => `
    color: ${theme.colors.w5};
  `}
  font-weight:700;
  margin: 0;
  margin-bottom: 5px;
  margin-left: 30px;
  width: 15%;
  text-align: right;
`;

export default StatValue;
