import Image from "next/image";
import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/Pagination";
import Search from "@/app/ui/dashboard/search/Search";
import { auth } from "@/app/auth";
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import { fetchProducts } from "@/app/lib/data";
import { deleteProduct } from "@/app/lib/actions";

const ProductsPage = async ({ searchParams }) => {
  const { user } = await auth();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, products } = await fetchProducts(q, page);

  return (
    <div className="global-bg mt-10 p-5 rounded-md">
      <div className="flex justify-between">
        <Search placeholder="Search for products...." />
        {user.isAdmin && (
          <Link href="/dashboard/products/add">
            <button className="bg-blue-800 text-white px-3 py-2 rounded-md">
              Add Product
            </button>
          </Link>
        )}
      </div>
      <div className="w-full flex flex-col items-center justify-center text-center">
        <div className=" my-5 w-full flex gap-5 justify-center flex-wrap">
          {products.length === 0 ? (
            <div className="w-full  text-center font-bold text-gray-500 m-10">
              No products found.
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="rounded-md shadow-lg overflow-hidden"
              >
                <div className=" md:w-[300px] bg-[#f0f0f0] dark:bg-slate-800 flex flex-col">
                  <div className="w-full h-[200px] mb-3 rounded-sm overflow-hidden">
                    <Image
                      src={
                        product.img !== "undefined"
                          ? product.img
                          : "/noproduct.jpg"
                      }
                      alt="avatar"
                      width={300}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[16px] my-2 font-black">
                    {product.title}
                  </span>
                  <div className="mx-4">
                    <div className="flex justify-between py-2 px-3 border-b-2 border-b-slate-300 border-dotted">
                      <span>Price</span>
                      <span>$ {product.price}</span>
                    </div>
                    <div className="flex justify-between py-2 px-3 border-b-2 border-b-slate-300 border-dotted">
                      <span>Category</span>
                      <span>{product.category}</span>
                    </div>
                    <div className="flex justify-between py-2 px-3 border-b-2 border-b-slate-300 border-dotted">
                      <span>Stock</span>
                      <span>{product.stock}</span>
                    </div>
                  </div>

                  <div className="p-4 self-end">
                    {user.isAdmin && (
                      <div className="flex gap-3 items-center">
                        <Link href={`/dashboard/products/${product.id}`}>
                          <button className="bg-green-500 p-2 rounded-md">
                            <MdOutlineModeEdit />
                          </button>
                        </Link>
                        <form action={deleteProduct}>
                          <input type="hidden" name="id" value={product.id} />
                          <button className="bg-red-500 p-2 rounded-md">
                            <MdDelete />
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Pagination count={count} />
    </div>
  );
};

export default ProductsPage;
