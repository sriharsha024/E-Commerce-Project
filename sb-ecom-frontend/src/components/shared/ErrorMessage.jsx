import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center gap-2 p-3 border border-red-400 bg-red-100 text-red-600 rounded-lg" aria-live="assertive">
      <FaExclamationTriangle className="text-red-600" size={20} />
      <span>{message ? message : "Unexpected error occurred"}</span>
    </div>
  );
};

export default ErrorMessage;
