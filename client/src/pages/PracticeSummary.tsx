import { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { useParams } from "react-router";

import { reduxStore, practiceObject } from "../types";
import { loadPractice } from "../api";
import { setPractice } from "../redux/actions";

const rdxProps = (state: reduxStore) => {
  return {
    practice: state.practice,
  };
};

const rdxDispatch = (dispatch: Dispatch) => {
  return {
    setPractice: (practice: practiceObject) => dispatch(setPractice(practice)),
  };
};

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const PracticeSummary: FC<props> = ({ practice }) => {
  const { id }: { id: string } = useParams();

  useEffect(() => {
    if (practice?.id !== ~~id) {
      loadPractice({
        id: ~~id,
        onSuccess: (pract: practiceObject) => setPractice(pract),
        onError: () => null,
      });
    }
  }, [practice, id]);

  return <div>{JSON.stringify(practice)}</div>;
};

export default withRedux(PracticeSummary);
