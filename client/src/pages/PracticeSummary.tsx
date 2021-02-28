import { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  resetPracticeOffset,
  resetPracticeSession,
} from "../redux/actions/practiceActions";
import { useQuery } from "@apollo/client";
import { getPracticeResultsQuery } from "../graphql/practice";
import FormattedPracticeString from "../components/practice/FormattedPracticeString";
import ArrowButton from "../components/ArrowButton";
import { ReduxState } from "../types/redux/ReduxState";
import "./PracticeSummary.scss";
import msToTime from "../utilites/msToTime";

interface PracticeSummaryProps {
  resetPractice: () => void;
  resetOffset: () => void;
}

const rdxProps = (state: ReduxState) => {
  return {};
};

const rdxDispatch = (dispatch: any) => {
  return {
    resetPractice: () => dispatch(resetPracticeSession()),
    resetOffset: () => dispatch(resetPracticeOffset()),
  };
};

const PracticeSummary: FC<PracticeSummaryProps> = ({
  resetPractice,
  resetOffset,
}) => {
  const navigator = useHistory();
  const { id }: { id: string } = useParams();
  const { data, loading, error } = useQuery(getPracticeResultsQuery, {
    variables: { id: parseInt(id) },
  });

  if (loading) {
    return <div>Loading...</div>;
  } else if (!data.getPracticeResult.result.success || error) {
    navigator.push("/server-error/");
  }

  const {
    string,
    index,
    errors_count,
    time_spent,
    practice_name,
  } = data.getPracticeResult.practice;

  const errors = JSON.parse(data.getPracticeResult.practice.errors);

  return (
    <div className={`practiceSummary-container`}>
      <div className={`practiceSummary-column`}>
        <div className="practiceSummary-field">Errors:</div>
        <div className="practiceSummary-value">{errors_count}</div>
        <div className="practiceSummary-field">Error rate:</div>
        <div className="practiceSummary-value">
          {Math.round((errors_count / index) * 10000) / 100 || 0}%
        </div>
        <div className="practiceSummary-field">Length:</div>
        <div className="practiceSummary-value">{index}</div>
        <div className="practiceSummary-field">Time:</div>
        <div className="practiceSummary-value">{msToTime(time_spent)}</div>
        <div className="practiceSummary-field">Chars per min:</div>
        <div className="practiceSummary-value">
          {Math.round(index / (time_spent / 60000))}
        </div>
      </div>
      <div className="practiceSummary-textView">
        <FormattedPracticeString
          className="practice"
          index={index}
          errors={errors}
          string={string}
        />
      </div>
      <div className="practiceSummary-column">
        <ArrowButton
          bodyWidth="110px"
          variant="left"
          onClick={() => {
            resetPractice();
            resetOffset();
            navigator.push(`/practice/p=${practice_name}/l=${index}`);
          }}
        >
          RESTART
        </ArrowButton>

        <ArrowButton
          bodyWidth="110px"
          variant="left"
          onClick={() => {
            resetPractice();
            resetOffset();
            navigator.push(`/home/`);
          }}
        >
          HOME
        </ArrowButton>
      </div>
    </div>
  );
};

export default connect(rdxProps, rdxDispatch)(PracticeSummary);
