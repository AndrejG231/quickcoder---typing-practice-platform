import { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { useHistory, useParams } from "react-router";

import { reduxStore, practiceObject } from "../types";
import { createPractice, loadPractice } from "../api";
import { setGlobalMessage, setPractice } from "../redux/actions";

import {
  PsGrid,
  NavBar,
  StatPanel,
  PracticeDisplayArea,
  PracticeString,
} from "../components/practice_summary";
import { Stats, ArrowButton } from "../components/";

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

const PracticeSummary: FC<props> = ({ practice, setPractice }) => {
  const { id }: { id: string } = useParams();
  const nav = useHistory();
  let lastError = 0;

  useEffect(() => {
    if (practice?.id !== ~~id) {
      loadPractice({
        id: ~~id,
        onSuccess: (pract: practiceObject) => setPractice(pract),
        onError: () => null,
      });
    }
  }, [practice, id]);

  if (!practice) {
    return <div>Loading...</div>;
  }

  const restartPractice = () => {
    if (practice) {
      nav.push("/loading_screen/");
      createPractice({
        category: practice.category,
        index: practice.index,
        length: practice.string.length,
        onSuccess: (practice: practiceObject) => {
          setPractice(practice);
          nav.push(`/practice/in_progress/id=${practice.id}/`);
        },
        onError: () => {
          nav.push(`/home/`);
          setGlobalMessage("Could not recreate practice session.");
        },
      });
    }
  };

  return (
    <PsGrid>
      <NavBar>
        <ArrowButton width={160} onClick={restartPractice}>
          Restart
        </ArrowButton>
        <ArrowButton width={160} onClick={() => nav.push(`/practice_menu/`)}>
          New practice
        </ArrowButton>
        <ArrowButton
          width={160}
          onClick={() =>
            nav.push(
              `/leaderboard/c=${practice.category}/i=${practice.practice_index}/`
            )
          }
        >
          Leaderboard
        </ArrowButton>
        <ArrowButton width={160} onClick={() => nav.push(`/profile/`)}>
          Profile
        </ArrowButton>
        <ArrowButton width={160} onClick={() => nav.push(`/home/`)}>
          Home
        </ArrowButton>
      </NavBar>
      <StatPanel>
        <Stats practice={practice} noTimer column />
      </StatPanel>
      <PracticeDisplayArea>
        {Object.keys(practice.errors).map((errIndex, i) => {
          const prevError = lastError;
          lastError = ~~errIndex;
          return (
            <PracticeString>
              {practice.string.slice(prevError, lastError)}
              <PracticeString error>
                {practice.errors[lastError]}
              </PracticeString>
            </PracticeString>
          );
        })}
        <PracticeString>
          {practice.string.slice(lastError, practice.string.length)}
        </PracticeString>
      </PracticeDisplayArea>
    </PsGrid>
  );
};

export default withRedux(PracticeSummary);
