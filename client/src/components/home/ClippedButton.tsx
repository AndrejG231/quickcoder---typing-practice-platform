import styled from "styled-components";

const ClippedButton = styled.button`
  height: 18%;
  max-height: 80px;
  width: 400px;
  background: ${({ theme }) => theme.colors.b4};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 40px;
  font-family: monospace;
  color: ${({ theme }) => theme.colors.w5};
  border: 0px;
  padding-left: 20px;
  clip-path: polygon(0px 0px, 400px 0px, 320px 80px, 0px 80px);
  &:hover {
    color: ${({ theme }) => theme.colors.b5};
    background: ${({ theme }) => theme.colors.w3};
  }
  @media screen and (max-width: 700px) {
    clip-path: none;
    width: 100%;
  }
`;

export default ClippedButton;
