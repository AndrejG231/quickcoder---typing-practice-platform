import styled from "styled-components";

const CategoryItems = styled.div`
  ${({ theme }) => `
  background: ${theme.colors.b3};
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`}
`;

export default CategoryItems;
