import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvestmentDetailPayload } from "@/lib/validations/investment";
import { Button } from "@/components/ui/button";

type InvestmentDetailsCardParams = { investmentData: InvestmentDetailPayload };

const InvestmentDetailsCard = async ({
  investmentData,
}: InvestmentDetailsCardParams) => {
  const showPaymentTx = investmentData.transactions.find(
    (tx) => tx.status === "PENDING" && tx.type === "DEPOSIT"
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="font-medium">Tranche Name</dt>
            <dd>{investmentData.tranche.name}</dd>
          </div>
          <div>
            <dt className="font-medium">Status</dt>
            <dd>
              <Badge>{investmentData.status}</Badge>
            </dd>
          </div>
          <div>
            <dt className="font-medium">Start Date</dt>
            <dd>
              {investmentData.started
                ? formatDistanceToNow(investmentData.started)
                : "N/A"}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Last Claimed Date</dt>
            <dd>
              {investmentData.lastClaimed
                ? formatDistanceToNow(investmentData.lastClaimed)
                : "N/A"}
            </dd>
          </div>
          <div>
            <dt className="font-medium">End Date</dt>
            <dd>
              {investmentData.ended
                ? formatDistanceToNow(investmentData.ended)
                : "N/A"}
            </dd>
          </div>
          {showPaymentTx && (
            <div>
              <dt className="font-medium">Make Payment</dt>
              <dd>
                <Button asChild>
                  <Link
                    href={`https://nowpayments.io/payment/?iid=${showPaymentTx.txId}`}
                    target="_blank"
                  >
                    Make Payment
                  </Link>
                </Button>
              </dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
};

export default InvestmentDetailsCard;
