import react, { FC } from "react";

import { keyboardLayout } from "../../types";
import { KeysContainer, KeysRow, Key } from "./keyboard/";

interface props {
  layout: keyboardLayout;
  next: string;
}

const Keyboard: FC<props> = ({layout, next}) =>{
  console.log(layout);
  return (
    <KeysContainer>
      {Object.values(layout).map((row, index) => {
        return (
          <KeysRow key={index}>
            {row.map((key, i) => {
              return <Key ratio={key.ratio} key={10*i} selected>{key.char}</Key>
            })}
          </KeysRow>
        )
      })
    }
    </KeysContainer>
  )
};

export default Keyboard