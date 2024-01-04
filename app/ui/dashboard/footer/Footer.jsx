import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between items-center text-gray-500 mt-10 mb-3 ">
      <h3 className="flex gap-2 items-center">
        <span>
          <Image src="/gem-logo.webp" alt="Gem.Dev" width={25} height={25} />
        </span>
        GEM.DEV
      </h3>
      <p>All rights reserved.</p>
    </div>
  );
};

export default Footer;
