import { FC, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { reduxStore, practiceObject } from "../types";
import { createPractice, loadPractice } from "../api";
import { setGlobalMessage, setPractice } from "../redux/actions";

import {
  PsGrid,
  StatPanel,
  PracticeDisplayArea,
  PracticeString,
} from "../components/practice_summary";
import { Stats, ArrowButton, NavBar } from "../components/";
import { routes } from "../static";

const rdxProps = (state: reduxStore) => {
  return {
    practice: state.practice,
  };
};

const rdxDispatch = (dispatch: Dispatch) => {
  return {
    setPractice: (practice: practiceObject) => dispatch(setPractice(practice)),
    setGlobalMessage: (message: string) => dispatch(setGlobalMessage(message)),
  };
};

const withRedux = connect(rdxProps, rdxDispatch);

type props = ConnectedProps<typeof withRedux>;

const PracticeSummary: FC<props> = ({
  practice,
  setPractice,
  setGlobalMessage,
}) => {
  const { id }: { id: string } = useParams();
  const nav = useHistory();
  const [loading, setLoading] = useState(false);
  let lastError = 0;

  useEffect(() => {
    if (practice?.id !== ~~id) {
      loadPractice({
        id: ~~id,
        onSuccess: (pract: practiceObject) => setPractice(pract),
        onError: () => null,
      });
    }
  }, [practice, id, setPractice]);

  if (!practice || practice?.id !== ~~id) {
    return <div>Loading...</div>;
  }

  const restartPractice = () => {
    if (practice) {
      setLoading(true);
      createPractice({
        category: practice.category,
        index: practice.practice_index,
        length: practice.string.length,
        onSuccess: (newPractice: practiceObject) => {
          setPractice(newPractice);
          nav.push(routes.runningPractice(practice.id));
        },
        onError: () => {
          nav.push(routes.home);
          setGlobalMessage("Could not recreate practice session.");
        },
      });
    }
  };

  return (
    <PsGrid>
      <NavBar>
        <ArrowButton
          width={160}
          onClick={loading ? () => null : restartPractice}
        >
          {loading ? "Loading.." : "Restart"}
        </ArrowButton>
        <ArrowButton width={160} onClick={() => nav.push(routes.practiceMenu)}>
          New practice
        </ArrowButton>
        <ArrowButton
          width={160}
          onClick={() =>
            nav.push(
              routes.leaderBoard(practice.category, practice.practice_index)
            )
          }
        >
          Leaderboard
        </ArrowButton>
        <ArrowButton width={160} onClick={() => nav.push(routes.profile)}>
          Profile
        </ArrowButton>
        <ArrowButton width={160} onClick={() => nav.push(routes.home)}>
          Home
        </ArrowButton>
      </NavBar>
      <StatPanel>
        <Stats practice={practice} noTimer noLastError column />
      </StatPanel>
      <PracticeDisplayArea>
        {Object.keys(practice.errors).map((errIndex, i) => {
          const prevError = lastError;
          lastError = ~~errIndex;
          return (
            <PracticeString key={i}>
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
