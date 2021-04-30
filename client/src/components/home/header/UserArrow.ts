import styled from "styled-components";

const UserArrow = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
  width: 300px;
  height: 50%;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.w5};
  background: ${({ theme }) => theme.colors.b4};
  clip-path: polygon(0px 40px, 40px 0px, 300px 0px, 300px 80px, 40px 80px);
  @media screen and (max-width: 700px) {
    clip-path: none;
    position: relative;
    height: 60px;
    width: 100%;
    overflow: hidden;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.b4};
    background: ${({ theme }) => theme.colors.w3};
  }
`;

export default UserArrow;
