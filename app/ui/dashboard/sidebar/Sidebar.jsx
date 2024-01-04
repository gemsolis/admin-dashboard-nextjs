import Image from "next/image";
import MenuLink from "./MenuLink";
import { auth, signOut } from "@/app/auth";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";

const menuItems = [
  {
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = async () => {
  const { user } = await auth();

  return (
    <div className="sticky top-0 h-screen overflow-y-auto px-5 py-5 shadow-md">
      <div className="custom-bg flex py-5 max-md:flex-col max-md:justify-center">
        <div className="w-[50px] h-[50px] mr-5 object-contain rounded-full overflow-hidden max-md:m-3">
          <Image
            src={user.img || "/noavatar.png"}
            alt="user"
            width={50}
            height={50}
          />
        </div>
        <div className="flex flex-col justify-center max-md:items-center">
          <span className="text-lg">{user.username}</span>
          <span className="font-thin text-gray-400">
            {user.isAdmin ? "Administrator" : "Client"}
          </span>
        </div>
      </div>
      <ul className="mt-5">
        {menuItems.map((link) => (
          <li key={link.list}>
            <div className="flex flex-col">
              {link.list.map((item) => (
                <MenuLink item={item} key={item.title} />
              ))}
            </div>
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="flex w-full items-center px-2 py-3 hover:bg-red-500 hover:text-white rounded-md">
          <span className="pr-3">
            <MdLogout />
          </span>
          <span className="max-md:hidden">Logout</span>
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
