import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getPracticeResultsQuery } from "../graphql/practice";

const PracticeSummary = () => {
  const navigator = useHistory();
  const { id }: { id: string } = useParams();
  const { data, loading, error } = useQuery(getPracticeResultsQuery, {
    variables: { id: parseInt(id) },
  });

  let lastError: any;

  if (loading) {
    return <div>Loading...</div>;
  } else if (data?.getPracticeResult?.practice === null || error) {
    navigator.push("/server-error/");
  }

  const {
    string,
    index,
    errors_count,
    time_spent,
  } = data.getPracticeResult.practice;

  const errors = JSON.parse(data.getPracticeResult.practice.errors);
  const errKeys = Object.keys(errors).sort((a, b) => {
    return ~~a - ~~b;
  });

  return (
    <div className="practiceSummary-container">
      <div className="practiceSummary-text">
        {errKeys.map((errIndex, i) => {
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
        </span>
      </div>
      <div className="practiceSummary-stats">
        Errors: {errors_count}
        <br />
        Length: {index}
        <br />
        Time: {time_spent}
      </div>
    </div>
  );
};

export default PracticeSummary;
