"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cancelInvestment } from "@/actions/investments/cancel-investment";
import { LoadingAnimation } from "@/components/loading-animation";

type CancelPlanFormProps = { investmentId: string };

const CancelPlanForm = ({ investmentId: id }: CancelPlanFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = async () => {
    startTransition(async () => {
      try {
        const { error, success } = await cancelInvestment({ id });
        console.log({ error, success });
        if (error) {
          toast.error(error);
          return;
        }
        if (success) {
          toast.success(`Investment was successfully cancelled`);
        }
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Network error");
      }
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <Button variant="destructive" type="submit" disabled={isPending}>
        {isPending ? <LoadingAnimation /> : "Cancel Plan"}
      </Button>
    </form>
  );
};

export default CancelPlanForm;
