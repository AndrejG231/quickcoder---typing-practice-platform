import styled from "styled-components";

interface props {}

const NotifyContainer = styled.div<props>`
  width: calc(100% - 160px);
  height: calc(100%);
  margin-left: 80px;
  margin-right: 80px;
  border-left: 2px solid ${({ theme }) => theme.colors.w4};
  border-right: 2px solid ${({ theme }) => theme.colors.w4};
  background: ${({ theme }) => theme.colors.b3};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export default NotifyContainer;
