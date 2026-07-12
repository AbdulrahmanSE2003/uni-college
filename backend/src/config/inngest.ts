import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "uni-college",
  eventKey: process.env.INNGEST_EVENT_KEY,
});
