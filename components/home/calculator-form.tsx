"use client";

import { Gauge, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Icons } from "@/components/icons";
import { LoadingAnimation } from "@/components/loading-animation";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

/**
 * IDEA we can create a list of last requests and show them in a list, but
 * we will have to sync both expiration dates, for redis and localStorage
 */

const METHODS = ["GET", "POST", "PUT", "DELETE"] as const;

const formSchema = z.object({
  amount: z.coerce.number().min(100),
  tranche: z.enum(METHODS).default("GET"),
  noOfDays: z.coerce
    .number()
    .min(1, {
      message: "Number of Days must be at least 0.",
    })
    .max(100, {
      message: "Number of Days must be at most 100.",
    })
    .default(1),
});

type FormSchema = z.infer<typeof formSchema>;

type ResultType = FormSchema & { result: number };

export function CalculatorForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: 100, noOfDays: 30, tranche: "GET" },
  });
  const [result, setResult] = useState<null | ResultType>(null);

  function onSubmit(data: FormSchema) {
    startTransition(async () => {
      try {
        const result = data.noOfDays * data.amount;
        setResult({ ...data, result });
      } catch (_e) {
        // TODO: better error handling, including e.g. toast
        form.setError("amount", { message: "Something went wrong" });
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
            <FormField
              control={form.control}
              name="tranche"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="sr-only">Tranche</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {METHODS.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-3 sm:col-span-4">
                  <FormLabel className="sr-only">Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="100000"
                      className="bg-muted"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="noOfDays"
              render={({ field }) => (
                <FormItem className="grid gap-1 my-4">
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      max={100}
                      min={1}
                      step={1}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>{field.value} Days to Stake</FormLabel>
                </FormItem>
              )}
            />
            <div className="col-span-full mt-2 sm:col-span-1">
              <Button disabled={isPending} className="group h-10 w-full">
                {isPending ? (
                  <LoadingAnimation />
                ) : (
                  <>
                    Check{" "}
                    <Gauge className="[&>*:first-child]:-rotate-90 ml-1 h-4 w-4 [&>*:first-child]:origin-[12px_14px] [&>*:first-child]:transition-transform [&>*:first-child]:duration-500 [&>*:first-child]:ease-out [&>*:first-child]:group-hover:rotate-0" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="grid gap-4">
        <TableResult result={result} loading={isPending} />
      </div>
    </>
  );
}

function TableResult({
  result,
  loading,
}: {
  loading: boolean;
  result: ResultType | null;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex items-center gap-1">
            <p className="w-[95px]">Key </p>
            {loading ? (
              <Loader className="inline h-4 w-4 animate-spin" />
            ) : result ? (
              <Icons.check className="inline h-4 w-4 text-green-500" />
            ) : null}
          </TableHead>
          <TableHead className="w-[100px] text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {result ? (
          <>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-medium">
                Tranche
              </TableCell>
              <TableCell className="text-right">{result.tranche}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-medium">
                Amount
              </TableCell>
              <TableCell className="text-right">{result.amount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-medium">
                Days Staked
              </TableCell>
              <TableCell className="text-right">{result.noOfDays}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-medium">
                Profit
              </TableCell>
              <TableCell className="text-right">${result.result}</TableCell>
            </TableRow>
          </>
        ) : (
          <TableRow>
            <TableCell
              colSpan={2}
              className="border border-border border-dashed text-center"
            >
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
