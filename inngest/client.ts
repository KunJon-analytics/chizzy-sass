import { Inngest, EventSchemas } from "inngest";

import { siteConfig } from "@/config/site";

type ConfirmInvestment = {
  data: {
    wait?: "20 mins" | "5 mins";
    invoiceId: string;
  };
};

type Events = {
  "investment/payment.confirm": ConfirmInvestment;
};

// Create a client to send and receive events
export const inngest = new Inngest({
  id: siteConfig.name,
  schemas: new EventSchemas().fromRecord<Events>(),
});
