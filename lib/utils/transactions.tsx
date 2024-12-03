import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

import { $Enums } from "@prisma/client";

export const getStatusIcon = (status: $Enums.TransactionStatus) => {
  switch (status) {
    case "CONFIRMED":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "PENDING":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case "FAILED":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

export const getStatusColor = (status: $Enums.TransactionStatus) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "FAILED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
