import styled from "styled-components";

const InputLabel = styled.label`
  postion: absolute;
  top: -120px;
  font-size: 23px;
  text-transform: capitalize;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.w5};
`;

export default InputLabel;
