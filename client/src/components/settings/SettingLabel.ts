import styled from "styled-components";

interface props {}

const SettingLabel = styled.p<props>`
  color: ${({ theme }) => theme.colors.w5};
  font-size: 18px;
  font-weight: 600;
`;

export default SettingLabel;
