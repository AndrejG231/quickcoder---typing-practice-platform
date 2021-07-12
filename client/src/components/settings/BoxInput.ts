import styled from "styled-components";

interface props {}

const BoxInput = styled.input<props>`
  height: 25px;
  width: 25px;
  cursor: pointer;
`;

BoxInput.defaultProps = { type: "checkbox" };

export default BoxInput;
