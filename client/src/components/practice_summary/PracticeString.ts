import styled from "styled-components";

interface props {
  error?: boolean;
}

const PracticeString = styled.span<props>`
  ${({ theme, error }) => `
    color: ${theme.colors.b5};
    font-family: 'Times New Roman', serif;
    font-size: 46px;
    @media screen and (max-width: 800px){
      font-size: 30px;
    }
    ${
      error
        ? `
      color: ${theme.colors.err1};
      background: ${theme.colors.err2};
    `
        : ""
    }
  `}
`;

export default PracticeString;
