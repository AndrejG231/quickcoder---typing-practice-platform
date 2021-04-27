import { FC } from "react";
import { connect } from "react-redux";
import { practiceSwitchLen } from "../../redux/actions/practiceSelectionActions";
import { ReduxState } from "../../types/reduxStore";
import { useHistory } from "react-router-dom";
import { userStatObjectT } from "../../types/types_redux/userPracticeStatsT";

const rdxProps = (state: ReduxState) => {
  return {
    practiceName: state.PracticeSelection.selected,
    length: state.PracticeSelection.length,
    stats: state.PracticeUserStats,
  };
};

const rdxDispatch = (dispatch: any) => {
  return {
    setLength: (len: number) => dispatch(practiceSwitchLen(len)),
  };
};

interface PracticeSelectorProps {
  className?: string;
  practiceName: string;
  length: number;
  stats: userStatObjectT;
  setLength: (len: number) => void;
}

const PracticeSelector: FC<PracticeSelectorProps> = ({
  className,
  practiceName,
  length,
  setLength,
  stats,
}) => {
  const nav = useHistory();
  const stat = stats[practiceName];

  const score = stat?.score < 650 ? "bad" : stat?.score > 800 ? "good" : "";

  const errors =
    stat?.error_rate > 4 ? "bad" : stat?.error_rate < 2 ? "good" : "";

  const cpm = stat?.cpm < 320 ? "bad" : stat?.cpm > 350 ? "good" : "";

  if (!practiceName) {
    return <div />;
  }
  return (
    <div className={`pSel-container ${className || ""}`}>
      <div className="pSel-header">
        <h1 className={`pSel-title`}>
          {practiceName ? practiceName.split("+")[1].replaceAll("_", " ") : ""}
        </h1>
        <div className="pSel-titleUnderline" />
      </div>
      <div className="pSel-stats">
        <h2 className="pSel-statTitle">Stats:</h2>
        {stat?.length >= 500 ? (
          <>
            <div className="pSel-statPair">
              <span className="pSel-statField">Total length:</span>
              <span className="pSel-statValue">{stat.length}</span>
            </div>
            <div className="pSel-statPair">
              <span className="pSel-statField">Score:</span>
              <span className={`pSel-statValue ${score}`}>{stat.score}</span>
            </div>
            <div className="pSel-statPair">
              <span className="pSel-statField">Error rate:</span>
              <span className={`pSel-statValue ${errors}`}>
                {stat.error_rate}
              </span>
            </div>
            <div className="pSel-statPair">
              <span className="pSel-statField">Cpm:</span>
              <span className={`pSel-statValue ${cpm}`}>{stat.cpm}</span>
            </div>
            <div className="pSel-messages">
              {errors === "bad" ? (
                <p className="pSel-statMessage bad">
                  Your error rate should be improved.
                </p>
              ) : null}
              {cpm === "bad" ? (
                <p className="pSel-statMessage bad">
                  Your cpm should be improved.
                </p>
              ) : null}
              {score === "good" && cpm !== "bad" && errors !== "bad" ? (
                <p className="pSel-statMessage good">
                  Your score is good. Feel free to move on to next practice!
                </p>
              ) : null}
            </div>
          </>
        ) : (
          <p className="pSel-statMessage">
            Your total practice length should be over 500 to display stats...
          </p>
        )}
      </div>
      <div className="pSel-startSetting">
        <div className="pSel-setLength">
          Practice Length:
          <div className="pSel-length">
            <span className="pSel-lenValue">{length}</span>
          </div>
        </div>
        <button
          className="pSel-start"
          onClick={(e) => nav.push(`/practice/p=${practiceName}/l=${length}`)}
        >
          START
        </button>
      </div>
    </div>
  );
};

export default connect(rdxProps, rdxDispatch)(PracticeSelector);
