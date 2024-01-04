"use client";
import React, { useEffect } from "react";

const Alert = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [message, onClose]);

  return message ? (
    <div className="fixed items-center top-4 animate-fade-in  ">
      <p className="bg-red-500 p-2 text-center top-rounded-md">{message}</p>
      <div className="bg-white h-[3px] botttom-rounded-md animate-loading"></div>
    </div>
  ) : null;
};

export default Alert;
