import { Request } from "express";
import { Users } from "../../entities";
import { getConnection } from "typeorm";
import { ActionResponse } from "../../types";
import { validateUserFromCookie } from "../../utilities";

const defaultFields = [
  "language",
  "keyboard_layout",
  "keyboard_indexes",
  "keyboard_visuals",
  "animations",
];

const changePreference = async (
  req: Request,
  field: string,
  to: string | boolean
): Promise<ActionResponse> => {
  const { user, error } = await validateUserFromCookie(req);

  if (!user) {
    return error!;
  }

  if (defaultFields.includes(field)) {
    const queryResult = await getConnection()
      .createQueryBuilder()
      .update(Users)
      .set({ [field]: to })
      .where("id = :id", { id: user.id })
      .execute();

    if (queryResult.affected === 1) {
      return {
        success: true,
        info: "updateUserPreference_preferenceUpdate_updated",
        message: "Successfuly update users preference.",
      };
    } else {
      return {
        success: false,
        info: "updateUserPreference_preferenceUpdate_failed",
        message: "Failed to update users preference.",
      };
    }
  } else {
    return {
      info: "updateUserPreference_preferenceKey_invalid",
      message: `Invalid preference field key, -- ${field}`,
      success: false,
    };
  }
};

export default changePreference;
