// Resolves a photo path to either a local public/ path (dev)
// or the CloudFront CDN URL (production).
// Set NEXT_PUBLIC_PHOTO_CDN_URL in Amplify env vars to activate CDN delivery.
// Example: https://d1234abcd.cloudfront.net
export function photoUrl(path: string): string {
  const cdn = process.env.NEXT_PUBLIC_PHOTO_CDN_URL;
  return cdn ? `${cdn.replace(/\/$/, "")}${path}` : path;
}
