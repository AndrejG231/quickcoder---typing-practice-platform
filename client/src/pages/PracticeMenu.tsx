import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MenuItem from "../components/menu/MenuItem";
import { practiceMenuQuery } from "../graphql/practice";
import { setTrueCategoryAction } from "../redux/actions/practiceMenuActions";

const rdxProps = () => {};

const rdxDispatch = (dispatch: any) => {
  return {
    setTrue: (category: string) => dispatch(setTrueCategoryAction(category)),
  };
};

interface PracticeMenuProps {
  setTrue: (category: string) => void;
}

const PracticeMenu: React.FC<PracticeMenuProps> = ({ setTrue }) => {
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

  let category: string;
  return (
    <div>
      {practiceData.map((data, index) => {
        const item = data.getItem.item;
        if (item.type === "category") {
          category = item.name as string;
          setTrue(category);
        }
        return (
          <MenuItem
            category={category}
            onClick={() => null}
            selected={false}
            desc={item.description as string}
            type={item.type as string}
            title={item.name.replaceAll("_", " ") as string}
            overwiev={item.overview ? (item.overview as string) : ""}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default connect(rdxProps, rdxDispatch)(PracticeMenu);
