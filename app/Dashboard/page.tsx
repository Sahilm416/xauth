import DashboardComponent from "@/components/Dashboard";
import ProjectList from "@/components/ProjectList";
import { LoggedUser } from "../actions/auth";
export const dynamic = 'force-dynamic'
export default async function DashboardPage() {

  interface resData {
    status: boolean,
    message: string,
    data : {
      username: string , email: string , isVerified: boolean
    }
  }
  const user : resData = await LoggedUser() as resData;

  if(!user.status){
    return(
      <div>
        <h1>Session Expired Login again</h1>
      </div>
    )
  }
  return (
    <div className="w-full flex flex-col justify-start items-center mt-[100px]">
        <DashboardComponent username={user.data.username} isVerified={user.data?.isVerified} />
        <ProjectList/>
    </div>
  );
}
