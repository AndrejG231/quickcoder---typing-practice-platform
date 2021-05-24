import react, { FC } from "react";

import { keyboardLayout, schemeCharacters } from "../../types";
import { keyColors } from "../../static";
import { KeysContainer, KeysRow, Key } from "./keyboard/";

import layouts from "../../static/layouts";
import keymaps from "../../static/keymaps";

interface props {
  keyboard: string;
  next: schemeCharacters;
  lastError: schemeCharacters;
}

const Keyboard: FC<props> = ({ keyboard, next, lastError }) => {
  const layout = layouts[keyboard];

  return (
    <KeysContainer>
      {Object.values(layout).map((row, index) => {
        return (
          <KeysRow key={index}>
            {row.map((key, i) => {
              return (
                <Key
                  ratio={key.ratio}
                  key={10 * i}
                  selected={keymaps[keyboard][next].indexOf(key.char) > -1}
                  color={keyColors[key.finger]}
                  error={
                    lastError
                      ? keymaps[keyboard][lastError].indexOf(key.char) > -1
                      : false
                  }
                >
                  {key.char}
                </Key>
              );
            })}
          </KeysRow>
        );
      })}
    </KeysContainer>
  );
};

export default Keyboard;
