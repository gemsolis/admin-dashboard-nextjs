import Image from "next/image";
import Link from "next/link";
import { fetchProduct } from "@/app/lib/data";
import { MdClose } from "react-icons/md";
import { updateProduct } from "@/app/lib/actions";

const SingleProductPage = async ({ params }) => {
  const { id } = params;
  const product = await fetchProduct(id);
  return (
    <div className="w-full global-bg py-5 px-5 my-3 flex justify-between gap-4">
      <div className="info-container text-center">
        <div className="custom-bg rounded-md">
          <div className="w-[250px] h-250px] overflow-hidden rounded-lg mb-5">
            <Image
              src={product.img || "/noproduct.jpg"}
              height={250}
              width={250}
              alt="Product Image"
              className="object-contain"
            />
          </div>
          <span className="my-10">{product.title}</span>
        </div>
      </div>
      <div className="flex-grow form-container custom-bg rounded-md relative">
        <div className="absolute top-3 right-3">
          <Link href="/dashboard/products">
            <button className="bg-red-500 p-2 rounded-md">
              <MdClose />
            </button>
          </Link>
        </div>
        <form action={updateProduct} className="single-form flex flex-col pt-5">
          <input type="hidden" name="id" value={product.id} />
          <label>
            <span>Product Name</span>
            <input type="text" name="title" placeholder={product.title} />
          </label>
          <label>
            <span>Category</span>
            <select name="category" selected={product.category}>
              <option value="Mobile">Mobile</option>
              <option value="Laptop">Laptop</option>
              <option value="Desktop">Desktop</option>
              <option value="Accessories">Accessories</option>
              <option value="Others">Others</option>
            </select>
          </label>
          <label>
            <span>Price</span>
            <input type="number" name="price" placeholder={product.price} />
          </label>
          <label>
            <span>Stock</span>
            <input type="number" name="stock" placeholder={product.stock} />
          </label>
          <label>
            <span>Description</span>
            <textarea
              name="desc"
              placeholder={product.desc}
              className="w-[100%] resize-none"
            ></textarea>
          </label>
          <label>
            <span>Color</span>
            <input type="text" name="color" placeholder={product.color} />
          </label>
          <label>
            <span>Size</span>
            <input type="text" name="size" placeholder={product.size} />
          </label>
          <button className="w-full bg-teal-500 p-5 rounded-md mt-2">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
