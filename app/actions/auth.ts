"use server";
import { db } from "@/utils/database/db";
import { getCookie, deleteCookie } from "cookies-next";
import { cookies } from "next/headers";
const { verify } = require("jsonwebtoken");

export const checkToken = async ({ token }: { token: string }) => {
  try {
    const res = await fetch("https://redshield.vercel.app/api/service/verify", {
      next: { revalidate: 0 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.RED_KEY!,
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.log("something went wrong", error);
    return {
      status: false,
    };
  }
};

export const ValidateAuthToken = async ({ token }: { token: string }) => {
  if (!token) {
    return {
      status: false,
      message: "session token not found",
    };
  }

  try {
    const verifyToken = verify(token, process.env.JWT_SECRET_KEY!);

    const user = (await db.get(
      `${verifyToken.project_id}:${verifyToken.email}:user`
    )) as User;



    if (user.pwd_version > verifyToken.pwd_version) {
      return {
        status: false,
        message: "invalid token",
      };
    }

    if (Date.now() > verifyToken.expires) {
      return {
        status: false,
        message: "expired token",
      };
    }

    return {
      status: true,
      message: "token is valid",
      data: verifyToken,
    };
  } catch (error) {
    console.log("error verifying token: " + error);

    return {
      status: false,
      message: "token signature invalid",
    };
  }
};

export const LogOut = async () => {
  const res = deleteCookie("_auth_token", { cookies });
  return {
    status: true,
    message: "logged out successfully",
  };
};

//return the details of logged in user

export const getSession = async () => {
  const token = getCookie("_auth_token", { cookies });
  if (!token) {
    return {
      status: false,
      message: "session token not found",
    };
  }

  try {
    const res = await ValidateAuthToken({token: token});
    return {
      status: res.status,
      message: res.message,
      data: res.data,
    };
  } catch (error) {
    console.log("error verifying token: " + error);

    return {
      status: false,
      message: "token signature invalid",
    };
  }
};

//get user information and project information

type Project = {
  id: string;
  image: string;
  name: string;
  description: string;
  created_at: string;
  key: string;
};

type User = {
  first_name?: string;
  last_name?: string;
  creation_date: string;
  email: string;
  password: string;
  uid: string;
  profile_picture?: string;
  pwd_version: number;
};

export const getUserInfo = async ({ email }: { email: string }) => {
  try {
    //get current session with JWT credentials
    const session = await getSession();
    //fetch user information
    const user = (await db.get(
      session.data.project_id + ":" + session.data.email + ":user"
    )) as User;
    //fetch user projects
    const projects = (await db.get(
      session.data.project_id + ":" + session.data.email + ":projects"
    )) as Project[];

    const response = { user, projects };
    return {
      first_name: response.user?.first_name || "",
      last_name: response.user?.last_name || "",
      email: response.user.email,
      profile_picture: response.user.profile_picture,
      projects: response.projects,
      created_at: response.user.creation_date,
    };
  } catch (error) {
    console.log("something went wrong", error);
    return {
      first_name: "",
      last_name: "",
      email: "",
      profile_picture: "",
      projects: [],
      created_at: "",
    };
  }
};
