import Image from "next/image";
import Link from "next/link";

const HelpPage = () => {
  return (
    <div className="global-bg w-full h-[65vh] flex flex-col justify-center items-center gap-5 my-5  p-5 rounded-md">
      <Image src="/gem-logo.webp" alt="Gem Logo" width={50} height={50} />
      <p>Coded by Gem Solis.</p>
      <div className="flex gap-5">
        <Link href="https://gemsolis.online" target="_blank">
          <button className="bg-slate-200 dark:bg-slate-700 p-4 hover:bg-slate-400 hover:dark:bg-slate-500  rounded-lg shadow-md">
            My Portfolio
          </button>
        </Link>
        <Link href="https://github.com/gemsolis" target="_blank">
          <button className="bg-slate-200 dark:bg-slate-700 p-4 hover:bg-slate-400 hover:dark:bg-slate-500  rounded-lg shadow-md">
            Github Repo
          </button>
        </Link>
      </div>
      <p></p>
    </div>
  );
};

export default HelpPage;
