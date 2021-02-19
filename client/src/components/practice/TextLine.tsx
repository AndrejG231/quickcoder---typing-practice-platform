import React from "react";
import { connect } from "react-redux";

//types
import { Errors } from "../../types/practice/PracticeT";
import { ReduxState } from "../../types/redux/ReduxState";

//styles
import "./TextLine.scss";

const rdxProps = (state: ReduxState) => {
  return {
    index: state.Practice.index,
    string: state.Practice.string,
    errors: state.Practice.errors,
    offset: state.PracticeOffset,
  };
};

interface TextAreaProps {
  index: number;
  string: string;
  offset: number;
  errors: Errors;
}

const TextLine: React.FC<TextAreaProps> = ({
  index,
  string,
  offset,
  errors,
}) => {
  let lastError = 0;
  return (
    <div className="textLine-container">
      <div className="textLine-text-container">
        <div
          className="textLine-string"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {Object.keys(errors).map((errIndex) => {
            const prevError = lastError;
            lastError = parseInt(errIndex);
            return (
              <span>
                {string.slice(prevError, lastError)}
                <span className="textLine-error">{errors[lastError]}</span>
              </span>
            );
          })}
          <span>
            {string.slice(lastError, index)}
            <span className="textLine-nextChar">{string[index]}</span>
            {string.slice(index + 1, string.length)}
          </span>
        </div>
      </div>
      <div className="textLine-cover left" />
      <div className="textLine-cover right" />
      <div className="textLine-marker">^</div>
    </div>
  );
};

export default connect(rdxProps, () => {
  return {};
})(TextLine);
