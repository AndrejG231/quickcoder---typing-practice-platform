import React, { FC } from "react";
import { keyColors } from "../../static";
import keymaps from "../../static/keymaps";
import layouts from "../../static/layouts";
import { fingerKeys, schemeCharacters } from "../../types";

import { FiContainer, FingerTag } from "./finger_index";

interface props {
  next: schemeCharacters;
  layout: string;
}

const FingerIndex: FC<props> = ({ next, layout }) => {
  let nextColors: string[] = [];

  for (const row of Object.values(layouts[layout])) {
    for (const element of row) {
      if (keymaps[layout][next].indexOf(element.char) > -1) {
        nextColors.push(element.finger);
      }
    }
  }

  return (
    <FiContainer>
      {/* Mapped finger indexes, higlighted if in next colors */}
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
