import React, { FC, useCallback, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { leaderboardItem, practiceMenuItem, reduxStore } from "../types";
import { selectCategory, selectPractice } from "../redux/actions";
import { getLeaderBoard } from "../api";

import { getCategoryIndex } from "../utilites";

import { Board, Row, Field, Column, LbGrid } from "../components/leaderboard";
import { NavBar, ArrowButton } from "../components";

const rdxProps = (state: reduxStore) => ({
  menu: state.practiceMenu,
});

const rdxDispatch = (dispatch: Dispatch) => ({
  selectPractice: (category: number, practice: practiceMenuItem) => {
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

  //Fetching leaderboard and loading it to state handler
  const loadLeaderBoard = useCallback(async () => {
    const leaderBoard = await getLeaderBoard(~~index, category);
    setLeaderboard(leaderBoard);
  }, [setLeaderboard, index, category]);

  //Fetch leaderboard
  useEffect(() => {
    if (!leaderboard) {
      loadLeaderBoard();
    }
  }, [leaderboard, loadLeaderBoard]);

  if (!leaderboard) {
    return <div>Loading...</div>;
  }

  return (
    <LbGrid>
      {/* Navigation  */}
      <NavBar>
        <ArrowButton
          /* If neccessarry data is loaded already, selects practice
           of current leaderboard before going to menu */
          onClick={() => {
            if (
              menu &&
              typeof categoryIndex === "number" &&
              selectionPractice
            ) {
              selectPractice(categoryIndex, selectionPractice);
            }
            nav.push("/practice_menu/");
          }}
        >
          New practice
        </ArrowButton>
        <ArrowButton onClick={() => nav.push("/home/")}>Home</ArrowButton>
        <ArrowButton onClick={() => nav.push("/profile/")}>Profile</ArrowButton>
      </NavBar>
      {/* Leaderboard data table */}
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
              <Field>{index + 1}</Field>
              <Field>{item.score}</Field>
              <Field>{item.cpm}</Field>
              <Field>{item.errors_rate.toFixed(2)} %</Field>
              <Field>{item.index}</Field>
              <Field>{item.username}</Field>
            </Row>
          ))}
        </tbody>
      </Board>
    </LbGrid>
  );
};

export default withRedux(LeaderBoard);
