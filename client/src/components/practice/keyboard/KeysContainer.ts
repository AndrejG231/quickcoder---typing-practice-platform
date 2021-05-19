import styled from 'styled-components';

const KeysContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.b4};
  border-radius: 5px;
  padding: 3px;
  justify-content: space-between;
`;
export default KeysContainer;