import styled from "styled-components";

interface props {
  centered?: boolean;
}

const FormContainer = styled.form`
  ${({ centered }: props) => `
    ${centered ? "margin: 0 auto;" : ""}
  `}
  height: 100%;
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 700px) {
    width: 100%;
    padding: 0;
    margin: 0;
  }
`;

export default FormContainer;
