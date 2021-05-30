import styled from "styled-components";

const UserNameContainer = styled.div`
  ${({ theme }) => `
  position: relative;
  height: 100%;
  grid-area: user;
  background: ${theme.colors.b4};
  width: 100%;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  color: ${theme.colors.w5};
  font-size: 100px;
  line-height: 160px;
  padding-left: 40px;
  text-align: center;
  `}
`;

export default UserNameContainer;
