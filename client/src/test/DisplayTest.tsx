import React from "react";
import {gql, useQuery} from "@apollo/client"

const componentStyle: React.CSSProperties = {
  height: 250,
  border: "10px solid black",
  margin: "auto",
  boxSizing: "content-box",
};

///////////////////////////
const DisplayTest = () => {
  const query = gql`
    query {
      userInfo(id: 10)
    }
  `;

  const { loading, error, data } = useQuery(query);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  console.log(data);

  const Component = () => <div></div>;
  return (
    <div>
      <button
        onClick={(e) => {
          console.log(data);
        }}
      >
        Click
      </button>
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
