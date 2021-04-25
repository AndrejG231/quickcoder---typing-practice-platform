import React, { FC } from "react";

import {
  InputError,
  InputErrorIcon,
  InputErrorText,
  InputField,
  InputWrapper,
  InputLabel,
  FormContainer,
  FormSubmitButton,
} from "./components_form";

import { inputDataT } from "../types/InputDataT";

interface InputGroupProps {
  data: inputDataT;
  setData: (data: inputDataT) => void;
  submitFunction: () => void;
  page: string;
}

const InputGroup: FC<InputGroupProps> = ({
  data,
  setData,
  submitFunction,
  page,
}) => {
  return (
    <FormContainer
      onSubmit={(e) => {
        e.preventDefault();
        submitFunction;
      }}
    >
      {Object.keys(data).map((inputKey, index) => {
        const input = data[inputKey];
        return (
          <InputWrapper key={index}>
            <InputLabel>
              <InputField
                value={input.value}
                onChange={(e) =>
                  setData({
                    ...data,
                    [inputKey]: { ...data[inputKey], value: e.target.value },
                  })
                }
              />
            </InputLabel>
            {input.error ? (
              <InputError>
                <InputErrorIcon />
                <InputErrorText>{input.error}</InputErrorText>
              </InputError>
            ) : null}
          </InputWrapper>
        );
      })}
      <FormSubmitButton type="submit">{page}</FormSubmitButton>
    </FormContainer>
  );
};

export default InputGroup;
