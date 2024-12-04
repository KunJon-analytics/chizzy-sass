export type Transaction = {
  id: string;
  status: "completed" | "pending" | "failed";
  type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  investmentName: string;
  investmentId: string;
  createdAt: string;
};

export const transactions: Transaction[] = [
  {
    id: "1",
    status: "completed",
    type: "deposit",
    amount: 1000,
    investmentName: "Tech Growth Fund",
    investmentId: "TGF001",
    createdAt: "2023-06-01T10:00:00Z",
  },
  {
    id: "2",
    status: "pending",
    type: "withdrawal",
    amount: 500,
    investmentName: "Real Estate Trust",
    investmentId: "RET002",
    createdAt: "2023-06-02T14:30:00Z",
  },
  {
    id: "3",
    status: "failed",
    type: "transfer",
    amount: 750,
    investmentName: "Green Energy ETF",
    investmentId: "GEE003",
    createdAt: "2023-06-03T09:15:00Z",
  },
  // Add more mock data as needed
];
