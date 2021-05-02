import styled from "styled-components";
import { Play } from "@styled-icons/boxicons-regular/";

const PracticeSelectIcon = styled(Play)`
  position: absolute;
  right: 30px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.w5};
`;

export default PracticeSelectIcon;
