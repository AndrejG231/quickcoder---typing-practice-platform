import styled from "styled-components";

const NeglectBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(
    0,
    0,
    0,
    ${({ darken }: { darken: boolean }) => (darken ? "0.4" : "0")}
  );
  transition: 0.5s all linear;
`;

export default NeglectBackground;
