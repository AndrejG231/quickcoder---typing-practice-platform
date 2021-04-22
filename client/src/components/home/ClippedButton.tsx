import styled from "styled-components";

const ClippedButton = styled.button`
  height: 18%;
  max-height: 80px;
  width: 400px;
  background: ${({ theme }) => theme.colors.b4};
  cursor: pointer;
  clip-path: polygon(0px 0px, 400px 0px, 320px 80px, 0px 80px);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 40px;
  font-family: monospace;
  color: ${({ theme }) => theme.colors.w4};
  border: 0px;
  padding-left: 20px;
  &:hover {
    color: ${({ theme }) => theme.colors.b4};
    background: ${({ theme }) => theme.colors.w4};
  }
`;

export default ClippedButton;
