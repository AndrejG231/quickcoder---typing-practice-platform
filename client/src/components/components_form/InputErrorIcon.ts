import styled from "styled-components";
import { Error } from "@styled-icons/boxicons-regular";

const InputErrorIcon = styled(Error)`
  color: ${({ theme }) => theme.colors.err1};
`;

export default InputErrorIcon;
