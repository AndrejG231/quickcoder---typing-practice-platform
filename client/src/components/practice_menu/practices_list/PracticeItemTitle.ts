import styled from "styled-components";

const PracticeItemTitle = styled.h3`
  margin-left: 20px;
  text-transform: capitalize;
  font-size: 24px;
  transform: translateY(10px);
  color: ${({ theme }) => theme.colors.w5};
  @media screen and (max-width: 700px) {
    font-size: 14px;
  }
`;

export default PracticeItemTitle;
