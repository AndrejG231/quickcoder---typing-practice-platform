import styled from "styled-components";

const MessageText = styled.p`
  ${({ theme }) => `
    color: ${theme.colors.w5};
    font-size: 30px;
    margin: 5px 30px;
    margin-left: 50px;
    @media-screen and (max-width: 700px){
        margin-left: 20px;
    }
    `}
`;

export default MessageText;
