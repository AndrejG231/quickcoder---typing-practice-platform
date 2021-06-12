import styled from "styled-components";
//
import React, { FC } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";

import { reduxStore } from "../../types";

const rdxProps = (state: reduxStore) => ({});

const rdxDispatch = (dispatch: Dispatch) => ({});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

// Styled
// Wrapper
const HistoryGrid = styled.div`
  padding: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  display: grid;
  grid-template:
    "items" auto
    "pages" 60px
    /100%;
`;

const Items = styled.div`
  background: red;
  grid-area: items;
  width: 100%;
  height: 100%;
`;

const Pages = styled.div`
  background: blue;
  grid-area: pages;
  width: 100%;
  height: 100%;
`;
//

const History: FC<props> = () => {
  return (
    <HistoryGrid>
      <Items></Items>
      <Pages></Pages>
    </HistoryGrid>
  );
};

export default withRedux(History);
