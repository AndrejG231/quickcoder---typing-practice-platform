import styled from "styled-components";

const CategoryItems = styled.div`
  ${({ theme }) => `
  background: ${theme.colors.b3};
  padding-top: 60px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  position: relative;
  &:last-child{
    margin-bottom: 30px;
    color: red;
  }
`}
`;

export default CategoryItems;
