"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { deleteUser } from "@/app/actions/user";
import { Button } from "./ui/button";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import {MoreHorizontal} from "lucide-react"
export default async function TableComponent({
  email,
  i,
  secret,
}: {
  email: string;
  i: number;
  secret: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const mailArr = email.split("@");
  const FakeLoad = async ()=>{
    return;
  }
  const removeUser = async () => {
    await FakeLoad();
    setLoading(true);
    await deleteUser({ email: email, secret: secret });
    setLoading(false);
    return window.location.reload();
  };

  return (
    <>
      <Drawer>
        <div className="flex justify-center items-center w-[90vw] gap-2 max-w-[500px]">
          <div className="w-full flex justify-between items-center p-2 border border-[#EBEBEB] dark:border-[#1F1F1F] mx-2 cursor-pointer gap-5">
            <span className="md:block hidden">{i + 1 + "] "}</span>
            <p className=" w-full flex justify-start">{mailArr[0].slice(0,20)}<span className="md:block hidden">@{mailArr[1]}</span></p>
            <span className="md:block hidden"><MoreHorizontal /></span>
          </div>
          <DrawerTrigger>
            <Button variant={"outline"} className="border-red-700 rounded-none">
              Delete
            </Button>
          </DrawerTrigger>
        </div>

        <DrawerContent className="flex justify-center items-center h-[40vh] dark:bg-black">
          <DrawerHeader>
            <DrawerTitle>Are you sure to delete ?</DrawerTitle>
            <DrawerDescription className="text-center">
              This action cannot be undone.
            </DrawerDescription>
          </DrawerHeader>
          This will permenently delete the user{" "}
          <span className="font-bold">{email}</span>
          <DrawerFooter className="flex sm:flex-row flex-col mb-10">
            <Button
              variant={"destructive"}
              className="w-[200px]"
              onClick={removeUser}
            >
              {loading ? (
                <Oval
                  visible={true}
                  height="25"
                  width="25"
                  strokeWidth="5"
                  color="white"
                  ariaLabel="oval-loading"
                  secondaryColor="black"
                />
              ) : (
                "Delete"
              )}
            </Button>
            <DrawerClose>
              <Button variant="outline" className="w-[200px]">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}