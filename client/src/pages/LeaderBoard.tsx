import React, { FC, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { useHistory, useParams } from "react-router";
import { leaderboardItem, practiceItem, reduxStore } from "../types";
import { selectCategory, selectPractice } from "../redux/actions";
import { getLeaderBoard } from "../api";

import { getCategoryIndex } from "../utilites";

import { Board, Row, Field, Column } from "../components/leaderboard";
import { NavBar, ArrowButton, Wrapper } from "../components";

const rdxProps = (state: reduxStore) => ({
  menu: state.practiceMenu,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  selectPractice: (category: number, practice: practiceItem) => {
    dispatch(selectCategory(category));
    dispatch(selectPractice(practice));
  },
});

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const LeaderBoard: FC<props> = ({ menu, selectPractice }) => {
  const { index, category }: { index: string; category: string } = useParams();
  const categoryIndex = getCategoryIndex(category, menu);
  const selectionPractice = menu
    ? menu[categoryIndex || 0].items[~~index]
    : null;
  const nav = useHistory();
  const [leaderboard, setLeaderboard] = useState<leaderboardItem[] | null>();

  const loadLeaderBoard = async () => {
    const leaderboard = await getLeaderBoard(~~index, category);
    setLeaderboard(leaderboard);
  };

  useEffect(() => {
    if (!leaderboard) {
      loadLeaderBoard();
    }
  }, [leaderboard, loadLeaderBoard]);

  if (!leaderboard) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <NavBar>
        {categoryIndex && selectionPractice ? (
          <ArrowButton
            onClick={() => {
              nav.push("/practice_menu/");
              selectPractice(categoryIndex, selectionPractice);
            }}
          >
            New practice
          </ArrowButton>
        ) : (
          <ArrowButton onClick={() => nav.push("/practice_menu/")}>
            Practice Menu
          </ArrowButton>
        )}
        <ArrowButton onClick={() => nav.push("/home/")}>Home</ArrowButton>
        <ArrowButton onClick={() => nav.push("/profile/")}>Profile</ArrowButton>
      </NavBar>
      <Board>
        <thead>
          <Row>
            <Column>#</Column>
            <Column>Score</Column>
            <Column>CPM</Column>
            <Column>Errors Rate</Column>
            <Column>Length</Column>
            <Column>User</Column>
          </Row>
        </thead>
        <tbody>
          {leaderboard.map((item, index) => (
            <Row key={index}>
              <Field>{index}</Field>
              <Field>{item.score}</Field>
              <Field>{item.cpm}</Field>
              <Field>{item.errors_rate.toFixed(2)} %</Field>
              <Field>{item.index}</Field>
              <Field>{item.username}</Field>
            </Row>
          ))}
        </tbody>
      </Board>
    </Wrapper>
  );
};

export default withRedux(LeaderBoard);
