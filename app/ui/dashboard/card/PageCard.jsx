import { MdSupervisedUserCircle } from "react-icons/md";

const PageCard = (props) => {
  return (
    <div className="global-bg w-full flex gap-3 justify-start p-7 cursor-pointer hover:duration-700 hover:bg-slate-400 hover:dark:bg-slate-600 shadow-md">
      <MdSupervisedUserCircle size={20} />
      <div className="flex flex-col gap-2">
        <span className="text-sm">{props.title}</span>
        <span className="text-2xl font-bold">{props.amount}</span>
      </div>
    </div>
  );
};

export default PageCard;
