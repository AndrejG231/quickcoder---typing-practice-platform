import styled from "styled-components";

const PracticeItem = styled.div`
  ${({ theme }) => `
    background: ${theme.colors.b2};
    border: 2px solid ${theme.colors.b4};
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
