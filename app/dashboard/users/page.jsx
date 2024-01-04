import { fetchUsers } from "@/app/lib/data";
import { deleteUser } from "@/app/lib/actions";
import { auth } from "@/app/auth";
import { MdOutlineModeEdit, MdDelete, MdArrowDropDown } from "react-icons/md";
import Pagination from "@/app/ui/dashboard/pagination/Pagination";
import Search from "@/app/ui/dashboard/search/Search";
import Image from "next/image";
import Link from "next/link";

const UsersPage = async ({ searchParams }) => {
  const { user } = await auth();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);

  return (
    <div className="global-bg mt-5 p-5 rounded-md">
      <div className="flex justify-between">
        <Search placeholder="Search for users...." />
        {user.isAdmin && (
          <Link href="/dashboard/users/add">
            <button className="bg-blue-800 text-white px-3 py-2 rounded-md">
              Add User
            </button>
          </Link>
        )}
      </div>
      <div className="custom-bg w-full my-5">
        <div className="global-bg flex gap-5 font-bold p-4">
          <div className="w-[200px]">Name</div>
          <div className="w-[200px]">Email</div>
          <div className="flex-1">Created at</div>
          <div className="flex-1">Role</div>
          <div className="flex-1">Status</div>
          {user.isAdmin && <div className="flex-1">Action</div>}
        </div>
        {users.length === 0 ? (
          <div className="w-full text-center font-bold text-gray-500 m-10">
            No users found.
          </div>
        ) : (
          users.map(
            (item) =>
              item.id !== "6594f77b265f036674094058" &&
              item.id !== "65969f1991bd7ac66e137ed0" && (
                <div
                  key={item.id}
                  className="flex items-center gap-5 p-4 border-b border-b-gray-600"
                >
                  <div className="w-[200px] flex gap-2 items-center">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <Image
                        src={
                          item.img !== "undefined" ? item.img : "/noavatar.png"
                        }
                        alt="avatar"
                        width={500}
                        height={500}
                        className="object-contain"
                      />
                    </div>
                    <span>{item.username}</span>
                  </div>
                  <div className="w-[200px]">{item.email}</div>
                  <div className="flex-1">
                    {item.createdAt?.toString().slice(4, 16)}
                  </div>
                  <div className="flex-1">
                    {item.isAdmin ? "Admin" : "Client"}
                  </div>
                  <div className="flex-1">
                    {item.isActive ? "Active" : "Passive"}
                  </div>
                  {user.isAdmin && (
                    <div className="flex-1 flex gap-3 items-center">
                      <Link href={`/dashboard/users/${item.id}`}>
                        <button className="bg-green-500 p-2 rounded-md">
                          <MdOutlineModeEdit />
                        </button>
                      </Link>
                      <form action={deleteUser}>
                        <input type="hidden" name="id" value={item.id} />
                        <button className="bg-red-500 p-2 rounded-md">
                          <MdDelete />
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )
          )
        )}
      </div>
      <Pagination count={count} />
    </div>
  );
};

export default UsersPage;
