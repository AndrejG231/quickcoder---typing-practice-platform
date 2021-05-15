import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { reduxStore } from "../../types";

import {
  TextArea,
  Text,
  Cursor,
  Done,
  Comming,
  Error,
  Current,
  ErrorsShift,
} from "./textline/";

const rdxProps = (state: reduxStore) => ({
  practice: state.practice,
});

const withRedux = connect(rdxProps, () => ({}));

type props = ConnectedProps<typeof withRedux>;

const TextLine: React.FC<props> = ({ practice }) => {
  let lastError = 0;

  if (!practice) {
    return <div>Error...</div>;
  }

  return (
    <TextArea>
      <ErrorsShift errors={practice.errors_count}>
        <Text offset={practice.index}>
          {Object.keys(practice?.errors).map((errIndex, i) => {
            const prevError = lastError;
            lastError = ~~errIndex;
            return (
              <Done>
                {practice.string.slice(prevError, lastError)}
                <Error>{practice.errors[lastError]}</Error>
              </Done>
            );
          })}
          <Done>{practice.string.slice(lastError, practice.index)}</Done>
          <Current>{practice.string[practice.index]}</Current>
          <Comming>
            {practice.string.slice(practice.index + 1, practice.string.length)}
          </Comming>
        </Text>
      </ErrorsShift>
      <Cursor>^</Cursor>
    </TextArea>
  );
};

export default withRedux(TextLine);
