import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { practiceMenuQuery } from "../graphql/practice";
const PracticeMenu = () => {
  const [index, setIndex] = useState(0);
  const [practiceData, setPracticeData] = useState<any[]>([]);
  const [getItem, { data, error, loading }] = useLazyQuery(practiceMenuQuery);

  useEffect(() => {
    if (data?.getItem?.item?.type) {
      setPracticeData([...practiceData, data]);
      setIndex(index + 1);
      console.log("Has valid data");
    } else {
      console.log("Has invalid data");
    }
  }, [data]);

  useEffect(() => {
    console.log("Getting new data");
    setTimeout(() => getItem({ variables: { index: index } }), 50);
  }, [index]);

  if (error) {
    return <div>Error..</div>;
  }

  return (
    <div>
      {practiceData.map((item) => {
        return <p>{JSON.stringify(item)}</p>;
      })}
    </div>
  );
};

export default PracticeMenu;
