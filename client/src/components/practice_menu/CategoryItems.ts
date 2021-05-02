import styled from "styled-components";

const CategoryItems = styled.div`
  ${({ theme }) => `
  background: ${theme.colors.b3};
  margin: 20px 10px;
  padding: 50px 10px; 
  padding-right: 30px;
  height: 70%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`}
`;

export default CategoryItems;
