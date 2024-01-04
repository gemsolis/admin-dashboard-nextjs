"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdSearch, MdClose } from "react-icons/md";

const Search = ({ placeholder }) => {
  const [field, setField] = useState("");
  const [closeBtn, setCloseBtn] = useState(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = (e) => {
    const value = e.target.value;

    const params = new URLSearchParams(searchParams);
    params.set("page", value);

    if (value.length >= 0) {
      params.set("q", value);
      setCloseBtn(true);
    } else {
      params.delete("q");
      setCloseBtn(false);
    }

    replace(`${pathname}?${params}`);
  };

  const handleField = () => {
    setField("");
    setCloseBtn(false);
    const defaultParams = new URLSearchParams();
    replace(`${pathname}?${defaultParams}`);
  };

  return (
    <div className="flex items-center relative">
      <MdSearch size={25} className="absolute left-2" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-[300px] p-2 pl-10 bg-slate-200 dark:bg-gray-700 rounded-md"
        onChange={handleSearch}
        value={field}
        onInput={(e) => setField(e.target.value)}
      />
      {closeBtn && (
        <MdClose
          size={20}
          className="absolute right-2 bg-red-200 rounded-full cursor-pointer"
          onClick={handleField}
        />
      )}
    </div>
  );
};

export default Search;
