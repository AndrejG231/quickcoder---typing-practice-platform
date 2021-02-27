import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getPracticeResultsQuery } from "../graphql/practice";
import FormattedPracticeString from "../components/practice/FormattedPracticeString";

const PracticeSummary = () => {
  const navigator = useHistory();
  const { id }: { id: string } = useParams();
  const { data, loading, error } = useQuery(getPracticeResultsQuery, {
    variables: { id: parseInt(id) },
  });

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

  return (
    <div className="practiceSummary-container">
      <FormattedPracticeString index={index} errors={errors} string={string} />
      <div className="practiceSummary-text"></div>
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
