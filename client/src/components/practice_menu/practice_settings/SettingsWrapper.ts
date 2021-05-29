import styled from "styled-components";

const SettingsWrapper = styled.div`
  grid-area: settings;
  background: ${({ theme }) => theme.colors.b2};
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export default SettingsWrapper;
