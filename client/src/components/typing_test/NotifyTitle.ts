import styled from "styled-components";

interface props {}

const NotifyTitle = styled.h1<props>`
  color: ${({ theme }) => theme.colors.w5};
  text-align: center;
  font-weight: 800;
  font-size: 80px;
  margin: 0;
  margin-top: 20px;
`;

NotifyTitle.defaultProps = {
  children: "WARNING",
};

export default NotifyTitle;
