import React, { FC } from "react";
import { keyColors } from "../../static";
import { fingerKeys, schemeCharacters } from "../../types";
import { useNextColors } from "../../utilites";

import { FiContainer, FingerTag } from "./finger_index";

interface props {
  next: schemeCharacters;
  layout: string;
}

const FingerIndex: FC<props> = ({ next, layout }) => {
  const nextColors = useNextColors(layout, next as schemeCharacters);

  return (
    <FiContainer>
      {["l1", "l2", "l3", "l4", "space", "r4", "r3", "r2", "r1"].map(
        (key, index) => (
          <FingerTag
            key={index}
            color={keyColors[key as fingerKeys]}
            highlight={nextColors.indexOf(key) > -1}
          >
            {key}
          </FingerTag>
        )
      )}
    </FiContainer>
  );
};

export default FingerIndex;
