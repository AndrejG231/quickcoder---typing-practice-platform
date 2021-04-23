import styled from "styled-components";
import { TitleUnderline } from ".";

const TitleArrow = styled.div`
  width: 550px;
  height: 160px;
  height: 100%;
  position: absolute;
  color: ${({ theme }) => theme.colors.w5};
  clip-path: polygon(0px 0px, 470px 0px, 430px 40px, 550px 160px, 0px 160px);
  background: ${({ theme }) => theme.colors.b4};
  left: 0;
  @media screen and (max-width: 700px) {
    clip-path: none;
    position: static;
    height: 100px;
    width: 100%;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.b4};
    background: ${({ theme }) => theme.colors.w3};
    ${TitleUnderline} {
      background: ${({ theme }) => theme.colors.b4};
    }
  }
`;

export default TitleArrow;
