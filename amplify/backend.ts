import { defineBackend } from "@aws-amplify/backend";
import { storage } from "./storage/resource.js";

export const backend = defineBackend({
  storage,
});
