import { FC } from "react";
// import { Errors } from "../../types/practice/PracticeT";

// interface FormattedPracticeStringProps {
//   errors: Errors;
//   string: string;
//   index: number;
//   className?: string;
// }

const FormattedPracticeString: FC = (
  {
    // errors,
    // string,
    // index,
    // className,
  }
) => {
  // let lastError = 0;
  // const errKeys = Object.keys(errors).sort((a, b) => {
  //   return ~~a - ~~b;
  // });
  return (
    <div>
      {/* {errKeys.map((errIndex, i) => {
        const prevError = lastError;
        lastError = ~~errIndex;
        return (
          <span key={i}>
            {string.slice(prevError, lastError)}
            <span key={i * 9 + 1000} className="textLine-error">
              {errors[lastError]}
            </span>
          </span>
        );
      })}
      <span>
        {string.slice(lastError, index)}
        <span className="textLine-nextChar">{string[index]}</span>
        {string.slice(index + 1, string.length)}
      </span> */}
    </div>
  );
};

export default FormattedPracticeString;
