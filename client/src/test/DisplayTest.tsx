import React from "react";
import Header from "../components/home/Header";

const componentStyle: React.CSSProperties = {
  height: 250,
  border: "10px solid black",
  margin: "auto",
  boxSizing: "content-box",
};

///////////////////////////
const DisplayTest = () => {
  const Component = () => (<div></div>);
  return (
    <div>
      <h1>Component Visual</h1>
      <div
        style={{
          width: 1280,
          ...componentStyle,
        }}
        className="testContainer"
      >
        <Component />
      </div>
      <div
        style={{ width: 800, ...componentStyle, boxSizing: "content-box" }}
        className="testContainer"
      >
        <Component />
      </div>{" "}
      <div
        style={{ width: 1800, ...componentStyle, boxSizing: "content-box" }}
        className="testContainer"
      >
        <Component />
      </div>
      <div
        style={{ width: 600, ...componentStyle, boxSizing: "content-box" }}
        className="testContainer"
      >
        <Component />
      </div>
    </div>
  );
};

export default DisplayTest;
