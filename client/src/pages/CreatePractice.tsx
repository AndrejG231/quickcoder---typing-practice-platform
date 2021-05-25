import React, { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { useParams, useHistory } from "react-router";

import { setPractice } from "../redux/actions";
import { practiceObject } from "../types";
import { createPractice } from "../api";

const rdxProps = () => ({});

const rdxDispatch = (dispatch: Dispatch) => ({
  setPractice: (practice: practiceObject) => dispatch(setPractice(practice)),
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const CreatePractice: FC<props> = ({ setPractice }) => {
  const nav = useHistory();

  const {
    category,
    index,
    length,
  }: {
    category: string;
    index: string;
    length: string;
  } = useParams();

  const handlePracticeCreation = (practice: practiceObject) => {
    setPractice(practice);
    nav.push(`/practice/in_progress/id=${practice.id}/`);
  };

  console.log(nav);

  useEffect(() => {
    createPractice({
      category,
      index: ~~index,
      length: ~~length,
      onSuccess: handlePracticeCreation,
      onError: () => null,
    });
  }, []);

  return <div>Loading...</div>;
};

export default withRedux(CreatePractice);
