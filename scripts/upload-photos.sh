#!/bin/bash
# Upload portfolio photos to S3 and invalidate CloudFront cache.
#
# Usage:
#   ./scripts/upload-photos.sh <bucket-name> [cloudfront-distribution-id]
#
# Get both values from Terraform outputs:
#   cd terraform && terraform output

set -e

BUCKET="${1:-}"
CF_DIST="${2:-}"

if [ -z "$BUCKET" ]; then
  echo "Usage: ./scripts/upload-photos.sh <bucket-name> [cloudfront-distribution-id]"
  echo ""
  echo "Get values from: cd terraform && terraform output"
  exit 1
fi

REGION="${AWS_REGION:-us-east-1}"

echo "Uploading to s3://${BUCKET}/photos/ ..."

aws s3 sync public/photos/ "s3://${BUCKET}/photos/" \
  --region "$REGION" \
  --cache-control "public,max-age=31536000,immutable" \
  --metadata-directive REPLACE \
  --exclude "*.DNG" \
  --exclude "*.dng" \
  --exclude "*.PNG" \
  --include "*.jpg" \
  --include "*.jpeg"

echo "Upload complete."

# Invalidate CloudFront cache if distribution ID provided
if [ -n "$CF_DIST" ]; then
  echo "Invalidating CloudFront cache ..."
  aws cloudfront create-invalidation \
    --distribution-id "$CF_DIST" \
    --paths "/photos/*" \
    --region us-east-1
  echo "Cache invalidation submitted."
fi

echo ""
echo "Done. Set NEXT_PUBLIC_PHOTO_CDN_URL in Amplify env vars:"
echo "  https://[cloudfront-domain].cloudfront.net"
echo "(from: cd terraform && terraform output cdn_url)"
