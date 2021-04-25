import styled from "styled-components";

const FormContainer = styled.form`
  height: 100%;
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 700px) {
    width: 95%;
  }
`;

export default FormContainer;
