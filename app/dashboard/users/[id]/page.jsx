import { updateUser } from "@/app/lib/actions";
import { fetchUser } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { MdClose } from "react-icons/md";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchUser(id);

  return (
    <div className="w-full global-bg py-5 px-5 my-3 flex justify-between gap-4">
      <div className="info-container text-center">
        <div className="custom-bg rounded-md">
          <div className="w-[200px] h-[200px] overflow-hidden rounded-lg mb-5">
            <Image
              src={user.img || "/noavatar.png"}
              height={200}
              width={200}
              alt="User Image"
              className="object-contain"
            />
          </div>
          <span>{user.username}</span>
        </div>
      </div>

      <div className="flex-grow form-container custom-bg rounded-md relative">
        <div className="absolute top-3 right-3">
          <Link href="/dashboard/users">
            <button className="text-white bg-red-500 p-2 rounded-md">
              <MdClose />
            </button>
          </Link>
        </div>
        <form action={updateUser} className="single-form flex flex-col mt-5">
          <input type="hidden" name="id" value={user.id} />
          <label>
            <span>Username</span>
            <input type="text" name="username" placeholder={user.username} />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" placeholder={user.email} />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder={user.password}
            />
          </label>
          <label>
            <span>Phone Number</span>
            <input type="text" name="phone" placeholder={user.phone} />
          </label>
          <label>
            <span>Address</span>
            <textarea
              name="address"
              placeholder={user.address}
              className="w-[100%] resize-none"
            ></textarea>
          </label>
          <label>
            <span>Is Admin?</span>
            <select name="isAdmin" id="isAdmin">
              <option value={true} selected={user.isAdmin}>
                Yes
              </option>
              <option value={false} selected={!user.isAdmin}>
                No
              </option>
            </select>
          </label>
          <label>
            <span>Is Active?</span>
            <select name="isActive" id="isActive">
              <option value={true} selected={user.isActive}>
                Yes
              </option>
              <option value={false} selected={!user.isActive}>
                No
              </option>
            </select>
          </label>
          <button className="w-full bg-teal-500 p-5 rounded-md mt-2">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
