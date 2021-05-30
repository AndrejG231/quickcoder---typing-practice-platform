import React from "react";
import { practiceObject } from "../../types";

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

interface props {
  practice: practiceObject;
}

const TextLine: React.FC<props> = ({ practice }) => {
  //place for last error position on text mapping
  let lastError = 0;

  return (
    <TextArea>
      {/* When errors added, text line moves without transition, appears unchanged */}
      <ErrorsShift
        errors={Object.values(practice.errors).reduce(
          (acc, val) => acc + val.length,
          0
        )}
      >
        {/* On successful keypress, textline smoothly moves to next characters */}
        <Text offset={practice.index}>
          {/* Mapping practice string and errors into textline */}
          {Object.keys(practice?.errors).map((errIndex, i) => {
            const prevError = lastError;
            lastError = ~~errIndex;
            return (
              <Done key={i}>
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
      {/* Pointer to next character */}
      <Cursor>^</Cursor>
    </TextArea>
  );
};

export default TextLine;
