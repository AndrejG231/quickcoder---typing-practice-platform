import styled from "styled-components";

const TitleText = styled.h1`
  position: absolute;
  width: 100%;
  text-align: center;
  font-family: monospace;
  color: ${({ theme }) => theme.colors.w4};
  font-size: ${(props: {
    big?: boolean;
    medium?: boolean;
    small?: boolean;
  }) => {
    console.log(props.big);
    return props.big ? 60 : props.medium ? 30 : props.small ? 20 : 15;
  }}px;
`;

export default TitleText;
