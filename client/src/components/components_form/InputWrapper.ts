import styled from "styled-components";

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 70px;
  padding: 30px;
  border-radius: 40px;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.b4};
  @media screen and (max-width: 700px) {
    width: 95%;
    border-radius: 0;
  }
`;

export default InputWrapper;
