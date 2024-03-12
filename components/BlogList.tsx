import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function BlogComponent({
  blogs,
}: {
  blogs: [{ title: string; content: string }];
}) {

  if(blogs.length < 1){
    return (
      <div className="w-full mt-14 justify-center items-center">
        <p className="text-3xl text-center text-zinc-400">No Blogs</p>
      </div>
    )
  }
  return (
    <>
      {blogs.reverse().map((blog) => {
        return (
          <Card
            key={blog.title + 1}
            className="w-full max-w-[700px] border-0 border-b dark:border-[#222222] rounded-none mx-auto shadow-none dark:text-[#D4D4D4] text-[#444444]"
          >
            <CardHeader>
              <CardTitle className="text-black dark:text-[#ffffff] text-4xl">
                {blog.title.replaceAll("_", " ")}
              </CardTitle>
              <CardDescription>{blog.content.slice(0, 50)+"..."}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                className="hover:text-blue-700 hover:underline"
                href={`/Blogs/${blog.title}`}
              >
                Read more ...
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
