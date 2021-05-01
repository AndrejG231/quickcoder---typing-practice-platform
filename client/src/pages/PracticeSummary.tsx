import { FC } from "react";
import { connect } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
// import {
//   resetPracticeOffset,
//   resetPracticeSession,
// } from "../redux/actions/practiceActions";
// import { useQuery } from "@apollo/client";
// import { getPracticeResultsQuery } from "../graphql/practice";
// import FormattedPracticeString from "../components/practice/FormattedPracticeString";
// import ArrowButton from "../components/ArrowButton";
// import { ReduxState } from "../types/reduxStore";
// import msToTime from "../utilites/msToTime";
// import Stat from "../components/practice/Stat";
// interface PracticeSummaryProps {
//   resetPractice: () => void;
//   resetOffset: () => void;
// }

const rdxProps = () => {
  return {};
};

const rdxDispatch = (dispatch: any) => {
  return {};
};

const PracticeSummary: FC = (
  {
    // resetPractice,
    // resetOffset,
  }
) => {
  // const navigator = useHistory();
  // const { id }: { id: string } = useParams();
  // const { data, loading, error } = useQuery(getPracticeResultsQuery, {
  //   variables: { id: parseInt(id) },
  // });

  // if (loading) {
  //   return <div>Loading...</div>;
  // } else if (!data.getPracticeResult.result.success || error) {
  //   navigator.push("/server-error/");
  // }

  // const {
  //   string,
  //   index,
  //   errors_count,
  //   time_spent,
  //   practice_name,
  // } = data.getPracticeResult.practice;

  // const errors = JSON.parse(data.getPracticeResult.practice.errors);

  return (
    <div className={`pS-container`}>
      {/* <div className={`pS-column`}>
        <Stat field={"Errors"} value={errors_count} />
        <Stat field={"Length"} value={index} />
        <Stat field={"Time"} value={msToTime(time_spent)} />
        <Stat
          field={"Error rate"}
          value={`${Math.round((errors_count / index) * 10000) / 100 || 0}%`}
        />
        <Stat field={"CPM"} value={Math.round(index / (time_spent / 60000))} />
      </div>
      <div className="pS-textView">
        <FormattedPracticeString
          className="practice"
          index={index}
          errors={errors}
          string={string}
        />
      </div>
      <div className="pS-column">
        <ArrowButton
          left
          onClick={() => {
            resetPractice();
            resetOffset();
            navigator.push(`/practice/p=${practice_name}/l=${index}`);
          }}
        >
          RESTART
        </ArrowButton>

        <ArrowButton
          left
          onClick={() => {
            navigator.push(`/practice_menu/`);
          }}
        >
          NEW EXERCISE
        </ArrowButton>

        <ArrowButton
          left
          onClick={() => {
            navigator.push(`/home/profile/`);
          }}
        >
          PROFILE
        </ArrowButton>
        <ArrowButton
          left
          onClick={() => {
            resetPractice();
            resetOffset();
            navigator.push(`/home/`);
          }}
        >
          HOME
        </ArrowButton>
      </div> */}
    </div>
  );
};

export default connect(rdxProps, rdxDispatch)(PracticeSummary);
