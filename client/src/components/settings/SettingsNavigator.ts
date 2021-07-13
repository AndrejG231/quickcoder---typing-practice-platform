import styled from "styled-components";

const SettingsNavigator = styled.div`
  width: 100%;
  height: calc(100%-30px);
  gird-area: subnav;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 15px 0;
  border-right: 2px solid ${({ theme }) => theme.colors.b4};
`;

export default SettingsNavigator;
