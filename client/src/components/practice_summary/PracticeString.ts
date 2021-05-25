import styled from "styled-components";

interface props {
  error?: boolean;
  theme: any;
}

const PracticeString = styled.span`
  ${({ theme, error }: props) => `
    color: ${theme.colors.b5};
    font-family: 'Times New Roman', serif;
    font-size: 46px;
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
