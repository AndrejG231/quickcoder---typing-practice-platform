import { FC } from "react";
import { connect } from "react-redux";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { IconContext } from "react-icons";
import { practiceSwitchLen } from "../../redux/actions/practiceSelectionActions";
import { ReduxState } from "../../types/redux/ReduxState";
import "./PracticeSelector.scss";
import { useHistory } from "react-router-dom";

const rdxProps = (state: ReduxState) => {
  return {
    practiceName: state.PracticeSelection.selected,
    length: state.PracticeSelection.length,
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
  setLength: (len: number) => void;
}

const PracticeSelector: FC<PracticeSelectorProps> = ({
  className,
  practiceName,
  length,
  setLength,
}) => {
  const nav = useHistory();
  return (
    <div className={`pSel-container ${className || ""}`}>
      <h1 className={`pSel-title`}>
        {practiceName ? practiceName.split("+")[1].replaceAll("_", " ") : ""}
      </h1>
      <div className="pSel-stats"></div>
      <div className="pSel-length">
        {length}
        <IconContext.Provider value={{ className: "pSel-Icon" }}>
          <AiFillPlusSquare onClick={() => setLength(1)} />
        </IconContext.Provider>
        <IconContext.Provider value={{ className: "pSel-Icon" }}>
          <AiFillMinusSquare onClick={() => setLength(-1)} />
        </IconContext.Provider>
      </div>
      <button
        onClick={(e) => nav.push(`/practice/p=${practiceName}/l=${length}`)}
      >
        START
      </button>
    </div>
  );
};

export default connect(rdxProps, rdxDispatch)(PracticeSelector);
