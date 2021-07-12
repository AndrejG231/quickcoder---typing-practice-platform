import styled from "styled-components";
import { theme } from "../../static";

interface props {}

const SettingRow = styled.div<props>`
  display: grid;
  gap: 50px;
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.w5};
  align-items: center;
`;

export default SettingRow;
