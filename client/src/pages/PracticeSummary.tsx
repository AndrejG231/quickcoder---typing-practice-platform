import { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { useParams } from "react-router";

import { reduxStore, practiceObject } from "../types";
import { loadPractice } from "../api";
import { setPractice } from "../redux/actions";

import {
  PsGrid,
  NavBar,
  StatPanel,
  PracticeDisplayArea,
  PracticeString,
} from "../components/practice_summary";
import { Stats } from "../components/";

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

  return (
    <PsGrid>
      <NavBar>{JSON.stringify(practice.errors)}</NavBar>
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
