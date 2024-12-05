import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface TrancheCardProps {
  name: string;
  fee: number;
  coolDownInterval: number;
  dailyProfitIncrease: number;
  isCurrentTranche: boolean;
  isSuggestedPlan: boolean;
}

export function TrancheCard({
  name,
  fee,
  coolDownInterval,
  dailyProfitIncrease,
  isCurrentTranche,
  isSuggestedPlan,
}: TrancheCardProps) {
  return (
    <Card className={`w-full ${isCurrentTranche ? "border-primary" : ""}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {name}
          {isCurrentTranche ? (
            <Badge variant="outline">Current Plan</Badge>
          ) : isSuggestedPlan ? (
            <Badge variant="secondary">Suggested Plan</Badge>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2">
          <div className="flex justify-between">
            <dt>Minimum Stake:</dt>
            <dd>{formatCurrency(fee)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Cool Down:</dt>
            <dd>{coolDownInterval} days</dd>
          </div>
          <div className="flex justify-between">
            <dt>Daily Profit Increase:</dt>
            <dd>{dailyProfitIncrease}%</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={isCurrentTranche ? "outline" : "default"}
        >
          {isCurrentTranche ? "Current Plan" : "Invest Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}
