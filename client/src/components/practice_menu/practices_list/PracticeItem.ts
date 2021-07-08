import styled from "styled-components";

interface props {
  isSelected: boolean;
}

const PracticeItem = styled.div.attrs<props>(({ isSelected, theme }) => ({
  style: {
    border: `2px solid ${theme.colors[isSelected ? "w5" : "b4"]}`,
  },
}))<props>`
  ${({ theme }) => `
    background: ${theme.colors.b2};
    width: 80%;
    height: 100px;
    margin: 10px;
    border-radius: 20px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
  `}
`;

export default PracticeItem;
