import React from "react";
import { connect } from "react-redux";

import FormattedPracticeString from "./FormattedPracticeString";

//types
// import { Errors } from "../../types/practice/PracticeT";
// import { ReduxState } from "../../types/reduxStore";

//styles

const rdxProps = () => {
  return {
    // index: state.Practice.index, string: state.Practice.string,
    // errors: state.Practice.errors,
    // offset: state.PracticeOffset,
  };
};

const withRedux = connect(rdxProps, () => ({}));

interface TextAreaProps {
  index: number;
  string: string;
  offset: number;
  // errors: Errors;
}

const TextLine: React.FC<TextAreaProps> = ({
  index,
  string,
  offset,
  // errors,
}) => {
  let lastError = 0;
  return (
    <div className="textLine-container">
      {/* <div className="textLine-text-container">
        <div
          className="textLine-string"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          <FormattedPracticeString
            errors={errors}
            string={string}
            index={index}
          />
        </div>
      </div>
      <div className="textLine-cover left" />
      <div className="textLine-cover right" />
      <div className="textLine-marker">^</div> */}
    </div>
  );
};

export default withRedux(TextLine);
