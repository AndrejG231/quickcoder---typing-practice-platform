import React, { FC } from "react";
import { keyColors } from "../../static";
// import keymaps from "../../static/keymaps";
// import layouts from "../../static/layouts";
import { fingerKeys /* schemeCharacters */ } from "../../types";

import { FiContainer, FingerTag } from "./finger_index";

// interface props {
//   next: schemeCharacters;
//   layout: string;
// }

const FingerIndex: FC /*<props>*/ = () => {
  return (
    <FiContainer>
      {/* Mapped finger indexes, higlighted if in next colors */}
      {[
        ["pinky", "l1"],
        ["ring", "l2"],
        ["middle", "l3"],
        ["index", "l4"],
        ["thumb", "space"],
        ["index", "r4"],
        ["middle", "r3"],
        ["ring", "r2"],
        ["pinky", "r1"],
      ].map((key, index) => (
        <FingerTag
          key={index}
          color={keyColors[key[1] as fingerKeys]}
          highlight={false}
        >
          {key[0]}
        </FingerTag>
      ))}
    </FiContainer>
  );
};

export default FingerIndex;
