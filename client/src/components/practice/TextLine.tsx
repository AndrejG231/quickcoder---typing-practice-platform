import React, { useState } from "react";
import { transform } from "typescript";

import "./TextLine.scss";

interface TextAreaProps {
  index: number;
  practiceString: string;
}

const TextLine = () => {
  const string =
    "Hello World How are you today, it is good () => This is a test string.\
Hello World How are you today, it is good () => This is a test string.\
Hello World How are you today, it is good () => This is a test string. ";
  const [index, setIndex] = useState(50);
  const [offSet, setOffset] = useState(0);
  console.log(string.length);
  return (
    <div className="textLine-container">
      <div className="textLine-text-container">
        <div
          className="textLine-string"
          style={{ transform: `translateX(-${index * 22}px)` }}
        >
          {string.slice(0, index)}
          <span className="textLine-nextChar">{string[index]}</span>
          {string.slice(index + 1, string.length)}
        </div>
      </div>
      <div className="textLine-cover left" />
      <div className="textLine-cover right" />
      <div className="textLine-marker">^</div>
    </div>
  );
};

export default TextLine;
