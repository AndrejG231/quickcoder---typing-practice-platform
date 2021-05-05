import styled from "styled-components";

interface props {
  theme: any;
  isSelected: boolean;
}

const PracticeItem = styled.div`
  ${({ theme, isSelected }: props) => `
    background: ${theme.colors.b2};
    border: 2px solid ${theme.colors[isSelected ? "w5" : "b4"]};
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
