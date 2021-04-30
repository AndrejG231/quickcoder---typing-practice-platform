import styled from "styled-components";

interface props {
  onScreen: boolean;
}

const PopUp = styled.div`
  postion: fixed;
  bottom: 20px;
  width: 600px;
  height: 80px;
  margin: auto;
  padding: 20px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 700px) {
    width: 100%;
    height: 120px;
    padding: 10px;
  }
  ${({ onScreen }: props) =>
    `transform: translateY(${onScreen ? 0 : "300px"})`};
`;

export default PopUp;
