import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <Image
        src="/404.png"
        width={400}
        height={400}
        alt="404"
        className="m-10"
      />
      <p className="my-2 text-lg">Ooops! Page not found!</p>
      <p className="my-2">
        Go back to{" "}
        <Link href="/dashboard" className="text-underline text-blue-500">
          Dashboard
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
