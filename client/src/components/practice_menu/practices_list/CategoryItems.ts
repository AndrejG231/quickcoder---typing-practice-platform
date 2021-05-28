import styled from "styled-components";

const CategoryItems = styled.div`
  ${({ theme }) => `
  background: ${theme.colors.b3};
  padding-top: 30px;
  padding-bottom: 30px;
  height: calc(100% - 60px);
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`}
`;

export default CategoryItems;
