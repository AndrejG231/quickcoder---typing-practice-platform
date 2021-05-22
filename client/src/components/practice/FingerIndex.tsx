import React, { FC } from "react";
import { keyColors } from "../../static";
import { schemeCharacters } from "../../types";
import { useNextColors } from "../../utilites";

import { FiContainer, FingerTag } from "./finger_index";

interface props {
  next: string;
  layout: string;
}

const FingerIndex: FC<props> = ({ next, layout }) => {
  const nextColors = useNextColors(layout, next as schemeCharacters);

  return (
    <FiContainer>
      {Object.entries(keyColors).map(([key, color], index) => (
        <FingerTag
          key={index}
          color={color}
          highlight={nextColors.indexOf(key) > -1}
        >
          {key}
        </FingerTag>
      ))}
    </FiContainer>
  );
};

export default FingerIndex;
