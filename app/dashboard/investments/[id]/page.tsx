import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";

type InvestmentDetailPageParam = { params: { id: string } };

// Mock data for demonstration
const investmentData = {
  totalEarnings: 5000,
  totalValueLocked: 50000,
  claimedEarnings: 3000,
  unclaimedEarnings: 2000,
  trancheName: "High Yield Tranche A",
  trancheId: "hy-tranche-a",
  status: "Active",
  startDate: "2023-01-01",
  lastClaimedDate: "2023-06-15",
  endDate: "2023-12-31",
};

const transactions = [
  {
    id: 1,
    type: "Earnings Claim",
    status: "CONFIRMED",
    amount: 500,
    createdAt: "2023-06-15",
  },
  {
    id: 2,
    type: "Deposit",
    status: "CONFIRMED",
    amount: 10000,
    createdAt: "2023-01-01",
  },
  {
    id: 3,
    type: "Withdrawal",
    status: "PENDING",
    amount: 1000,
    createdAt: "2023-06-20",
  },
  {
    id: 4,
    type: "Earnings Claim",
    status: "FAILED",
    amount: 200,
    createdAt: "2023-05-30",
  },
];

export default function InvestmentDetailPage({
  params: { id },
}: InvestmentDetailPageParam) {
  return (
    <DashboardLayout
      appHeaderProps={{
        primaryBreadcrumb: {
          link: "/dashboard/investments",
          title: "Investments",
        },
        secondaryBreadcrumb: "Investment Detail",
      }}
    >
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-6">Investment Details</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Earnings"
            value={`$${investmentData.totalEarnings.toLocaleString()}`}
          />
          <StatsCard
            title="Total Value Locked"
            value={`$${investmentData.totalValueLocked.toLocaleString()}`}
          />
          <StatsCard
            title="Claimed Earnings"
            value={`$${investmentData.claimedEarnings.toLocaleString()}`}
          />
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unclaimed Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${investmentData.unclaimedEarnings.toLocaleString()}
              </div>
              <Button
                className="mt-2"
                disabled={investmentData.unclaimedEarnings === 0}
              >
                Claim Rewards
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Investment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="font-medium">Tranche Name</dt>
                <dd>
                  <Link
                    href={`/dashboard/tranche/${investmentData.trancheId}`}
                    className="text-blue-600 hover:underline"
                  >
                    {investmentData.trancheName}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="font-medium">Status</dt>
                <dd>
                  <Badge>{investmentData.status}</Badge>
                </dd>
              </div>
              <div>
                <dt className="font-medium">Start Date</dt>
                <dd>{investmentData.startDate}</dd>
              </div>
              <div>
                <dt className="font-medium">Last Claimed Date</dt>
                <dd>{investmentData.lastClaimedDate}</dd>
              </div>
              <div>
                <dt className="font-medium">End Date</dt>
                <dd>{investmentData.endDate}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "CONFIRMED"
                            ? "success"
                            : transaction.status === "PENDING"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      ${transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{transaction.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function StatsCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
