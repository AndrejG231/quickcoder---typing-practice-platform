import { Users } from "src/entities";
import generatePasswordRetrieveToken from "src/utilities/auth/generatePasswordToken";
import generateResponse from "src/utilities/generateResponse";
import sendMail from "src/utilities/sendMail";

const retrievePasswordToken = async (email: string) => {
  const user = await Users.findOne({ email: email });

  if (!user) {
    return generateResponse(false, "retrievePassword_email_notFound");
  }

  const token = await generatePasswordRetrieveToken(user);

  if (!token) {
    return generateResponse(false, "retrievePassword_server_unknownError");
  }

  const successfulMessage = await sendMail({
    to: "andrej.germic@gmail.com",
    subject: "Hello Myself",
    text: token.raw[0].token,
  });

  if (!successfulMessage) {
    return generateResponse(false, "retrievePassword_server_unknownError");
  }

  return generateResponse(true, "retrievePassword_resetLink_sent");
};

export default retrievePasswordToken;
