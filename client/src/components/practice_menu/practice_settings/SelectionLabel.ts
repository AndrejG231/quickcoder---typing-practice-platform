import styled from "styled-components";

const SelectionLabel = styled.label`
  ${({ theme }) => `
    color: ${theme.colors.w4};
  `}
  font-size: 26px;
  text-align: center;
  text-decoration: underline;
`;

export default SelectionLabel;
