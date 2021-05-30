import styled from "styled-components";

const StatBar = styled.div`
  ${({ theme }) => `
    width: 90%;
    height: 40px;
    border: 3px solid ${theme.colors.w4};
    border-radius: 2px;
    background: ${theme.colors.b4};
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-template-rows: 100%;
    align-items: start;
    color: ${theme.colors.w5};
    position: relative;
  `}
`;

export default StatBar;
