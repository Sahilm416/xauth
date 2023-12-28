"use client";
import { LoginUser } from "@/app/actions/login";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "./ui/card";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import Loader from "./Loader";
import { toast } from "sonner";
export default function LoginCard() {

  const[loading,setLoading] = useState<boolean>(false);

  const fakeLoad = async ()=> {
    return
  }
  const sendData = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await fakeLoad()
    setLoading(true);
    const res = await LoginUser({ email: email, password: password });
    if(res.status){
      toast.success(res.message);
    }else{
      toast.error(res.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Card className=" w-auto max-w-[550px] min-w-[350px] dark:bg-black ">
        <form action={sendData}>
          <CardHeader>
            <CardTitle>
              Login to <span className="text-red-600">Red</span>shield
            </CardTitle>
            <CardDescription>redis based auth</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Label htmlFor="email">Email</Label>
            <Input autoFocus type="email" name="email" id="email" required />
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" required />
          </CardContent>
          <CardFooter>
            <Button disabled={loading} className="w-full" type="submit">
              {loading ? <Loader darkOn="bg-black" darkOff="bg-white"/> : "login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
