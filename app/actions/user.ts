"use server";
import { db } from "@/utils/database/db";
import { getUser } from "./auth";

//get the specific user
export const getUserInfo = async ({
  email,
  project_id,
}: {
  email: string;
  project_id: string;
}) => {
  try {
    const user = (await db.get(project_id + ":" + email + ":user")) as {
      email: string;
      profile_picture: string;
    };

    return {
      email: user.email,
      profile: user.profile_picture,
    };
  } catch (error) {
    console.log("something went wrong", error);
    return {
      email: "ok",
      profile: "ok",
    };
  }
};

export const getAllUsers = async ({ key }: { key: string }) => {
  try {
    const res = await fetch(
      "https://redshield.vercel.app/api/service/getAllUsers",
      {
        headers: {
          Authorization: key,
        },
      }
    );
    if (res.status === 200) {
      const response = await res.json();
      return response.users;
    }else{
      console.log(Response)
      return [];
    }
  } catch (error) {
    console.log("error", error);
    return [];
  }
};
