import styled from "styled-components";

const TitleUnderline = styled.div`
  width: 300px;
  height: 5px;
  background: ${(props) => props.theme.colors.w4};
  position: relative;
  top: 105px;
  left: 20px;
  margin-bottom: 5px;
  ${(props: { margin?: boolean }) => (props.margin ? "left: 65px;" : "")}
`;

export default TitleUnderline;
