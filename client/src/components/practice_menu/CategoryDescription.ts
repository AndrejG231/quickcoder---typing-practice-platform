import styled from "styled-components";

const CategoryDescription = styled.p`
  ${({ theme }) => `
  background: ${theme.colors.b2};
  color: ${theme.colors.w5};
  height: 25px;
  font-size: 18px;
  margin: 0px 10px;
  padding-top: 10px;
  padding-left: 15px;
  padding-bottom: 5px;
  border: 2px solid black;
  border-radius: 5px;
`};
`;

export default CategoryDescription;
