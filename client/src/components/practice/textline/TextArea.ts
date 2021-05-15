import styled from "styled-components";

interface props {
  theme: any;
}

const TextArea = styled.div`
  ${({ theme }: props) => `
    width: 100%;
    background: ${theme.colors.b5};
    text-align: left;
    height: 80px;
    overflow: hidden;
    padding-left: 50%;
    padding-bottom: 20px;
    padding-top: 10px;
    position: relative;
  `}
`;

export default TextArea;
