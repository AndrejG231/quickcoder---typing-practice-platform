import styled from "styled-components";

const UserArrow = styled.div`
  flex-shrink: 1;
  min-width: ${({ minWidth }: { minWidth: number }) => {
    console.log(minWidth);
    return minWidth;
  }}px;
  height: 50%;
  position: relative;
`;

export default UserArrow;
