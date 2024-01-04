import { MdInfo } from "react-icons/md";
import LoginForm from "../ui/login/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col w-full h-[100vh] justify-center items-center">
      <div className="bg-slate-50 dark:bg-slate-900 min-w-[35%] text-center p-10 rounded-md shadow-md">
        <h1 className="text-[2rem] mb-5">Welcome!</h1>
        <LoginForm />
      </div>
      <div className="flex gap-2">
        <div className="bg-slate-50 dark:bg-slate-900 my-5 px-5 py-3 flex justify-center items-center gap-5 shadow-md">
          <MdInfo size={30} />
          <span>
            <p className="font-medium">Admin Role</p>
            <p>Username: admin</p>
            <p>Password: admin1234</p>
          </span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 my-5 px-5 py-3 flex justify-center items-center gap-5 shadow-md">
          <MdInfo size={30} />
          <span>
            <p className="font-medium">Client Role</p>
            <p>Username: client</p>
            <p>Password: client1234</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
