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
  NofieldError,
} from "./components_form";

import { formError, inputData } from "../types/";

interface InputGroupProps {
  data: inputData;
  setData: (data: inputData) => void;
  submitFunction: () => void;
  page: string;
  errors: formError;
}

const Form: FC<InputGroupProps> = ({
  data,
  setData,
  submitFunction,
  page,
  errors,
}) => {
  let isErrorDisplayed = false;
  return (
    <FormContainer
      onSubmit={(e) => {
        e.preventDefault();
        submitFunction();
      }}
    >
      {Object.keys(data).map((inputKey, index) => {
        const input = data[inputKey];
        let error = "";
        if (errors.field === inputKey) {
          error = errors.value;
          isErrorDisplayed = true;
        }
        return (
          <InputWrapper key={index}>
            <InputLabel htmlFor={inputKey}>{inputKey}</InputLabel>
            <InputField
              value={input.value}
              name={inputKey}
              type={input.type}
              onChange={(e) =>
                setData({
                  ...data,
                  [inputKey]: { ...data[inputKey], value: e.target.value },
                })
              }
            />
            {error ? (
              <InputError>
                <InputErrorIcon size={"20px"} />
                <InputErrorText>{error}</InputErrorText>
              </InputError>
            ) : null}
          </InputWrapper>
        );
      })}
      {errors.field && !isErrorDisplayed ? (
        <NofieldError>
          <InputErrorIcon size={"20px"} />
          <InputErrorText>{errors.value}</InputErrorText>
        </NofieldError>
      ) : null}
      <FormSubmitButton type="submit">{page}</FormSubmitButton>
    </FormContainer>
  );
};

export default Form;
