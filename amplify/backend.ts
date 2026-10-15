import { defineBackend } from "@aws-amplify/backend";

// Empty backend — no storage resource needed.
// Photos in public/photos/ are already served via CloudFront
// through Amplify Hosting's built-in CDN.
export const backend = defineBackend({});
