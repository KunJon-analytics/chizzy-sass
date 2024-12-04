import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvestmentDetailPayload } from "@/lib/validations/investment";

type InvestmentDetailsCardParams = { investmentData: InvestmentDetailPayload };

const InvestmentDetailsCard = async ({
  investmentData,
}: InvestmentDetailsCardParams) => {
  return (
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
                {investmentData.tranche.name}
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
        </dl>
      </CardContent>
    </Card>
  );
};

export default InvestmentDetailsCard;
