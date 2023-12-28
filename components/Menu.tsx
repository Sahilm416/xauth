"use client";
import { LogOut as LogOutIcon, Settings, Menu } from "lucide-react";
import { LogOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LogOut as LogUserOut } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
export function MenuBar({ logged }: { logged: boolean }) {
  const router = useRouter();
  return (
    <>
      {/*1st */}
      <div className="sm:flex hidden">
        {logged && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  className="rounded-full"
                  width={40}
                  height={40}
                  src="https://github.com0/sahilm416.png"
                />
                <AvatarFallback className=" rounded-full text-center bg-slate-200 cursor-pointer dark:text-slate-900 p-2">
                  CN
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-7 mt-4 dark:bg-black">
              <DropdownMenuItem className="flex">
                <Settings className="text-slate-300 w-[20px] mx-2" />
                Account settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await LogOut();
                  return window.location.reload();
                }}
                className="flex"
              >
                <LogOutIcon className="text-slate-300 w-[20px] mx-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {/*2nd */}
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Menu className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-7 mt-4 shadow-lg">
            <DropdownMenuGroup>
              <Link href="/Dashboard">
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Link href="#">Docs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#">Contact</Link>
              </DropdownMenuItem>
              {logged && (
                <DropdownMenuItem>
                  <Link href="#">Account</Link>
                </DropdownMenuItem>
              )}
              {logged && (
                <DropdownMenuItem
                  onClick={async () => {
                    await LogOut();
                    return window.location.reload();
                  }}
                >
                  Sign Out
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
