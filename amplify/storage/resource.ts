import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "portfolioAssets",
  access: (allow) => ({
    // All photos publicly readable — no auth required
    "photos/*": [allow.guest.to(["read"])],
  }),
});
