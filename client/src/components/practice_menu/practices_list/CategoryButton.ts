import styled from "styled-components";

interface props {
  isSelected?: boolean;
}

const CategoryButton = styled.button<props>`
  ${({ isSelected, theme }) => `
  background: ${theme.colors.b2};
  border: 0px;
  border-radius: 8px;
  transform: translateY(2px);
  font-size: 16px;
  padding: 0px 15px;
  border: 2px solid black;
  ${
    isSelected
      ? `border-bottom: 2px solid ${theme.colors.b2};
         padding-top: 10px;`
      : "padding-top: 3px;"
  }
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  cursor: pointer;
  z-index: 20;
  color: ${theme.colors.w5};
  text-transform: capitalize;
  @media screen and (max-width: 700px){
    font-size: 12px;
  }
`}
`;

export default CategoryButton;
