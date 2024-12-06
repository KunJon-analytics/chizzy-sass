"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { createInvestment } from "@/actions/investments/create-investment";
import { Button } from "@/components/ui/button";
import { LoadingAnimation } from "@/components/loading-animation";

export function InvestForm({ trancheId }: { trancheId: string }) {
  const [isPending, startTransition] = useTransition();
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async () => {
    startTransition(async () => {
      const { error, success } = await createInvestment({ trancheId });
      if (error) {
        toast.error(error);
        return;
      }
      if (success) {
        toast.success(`Payment link generated successfully. Link: ${success}`);
        setPaymentLink(success);
        router.refresh();
      }
    });
  };

  if (paymentLink) {
    return (
      <Button className="w-full" asChild>
        <Link href={paymentLink} target="_blank">
          Make Payment
        </Link>
      </Button>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? <LoadingAnimation /> : "Invest Now"}
      </Button>
    </form>
  );
}
