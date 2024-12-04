import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TransactionsPayload } from "@/lib/validations/transaction";
import { getStatusIcon, getTransactionType } from "@/lib/utils/transactions";
import { formatCurrency } from "@/lib/utils";

const TransactionDetailCard = ({
  transaction,
}: {
  transaction: TransactionsPayload;
}) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Transaction Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Transaction ID
            </h3>
            <p className="text-sm font-medium">{transaction.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
            <p className="text-sm font-medium">
              {getTransactionType(transaction.type)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Status
            </h3>
            <Badge
              variant={
                transaction.status === "CONFIRMED"
                  ? "success"
                  : transaction.status === "FAILED"
                  ? "destructive"
                  : "warning"
              }
            >
              {getStatusIcon(transaction.status)}
            </Badge>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Amount
            </h3>
            <p className="text-sm font-medium">
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        </div>
        <Separator />
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Created At
            </h3>
            <p className="text-sm font-medium">
              {transaction.createdAt.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Updated At
            </h3>
            <p className="text-sm font-medium">
              {transaction.updatedAt.toLocaleString()}
            </p>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Associated Investment
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                {transaction.investment.tranche.name}
              </p>
              <p className="text-xs text-muted-foreground">
                ID: {transaction.investment.id}
              </p>
            </div>
            <Button asChild>
              <Link
                href={`/dashboard/investments/${transaction.investment.id}`}
              >
                View Investment
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Print Receipt</Button>
        <Button variant="secondary">Contact Support</Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionDetailCard;