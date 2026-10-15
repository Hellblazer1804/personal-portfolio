#!/bin/bash
# Upload portfolio photos to Amplify S3 bucket for CDN delivery.
#
# Usage:
#   ./scripts/upload-photos.sh <bucket-name>
#
# The bucket name is shown in the Amplify console under
# Storage > portfolioAssets > Bucket name.
# It looks like: portfolioassets-[hash]-[env]
#
# After uploading, set NEXT_PUBLIC_PHOTO_CDN_URL in the Amplify console:
#   App settings > Environment variables
#   Key:   NEXT_PUBLIC_PHOTO_CDN_URL
#   Value: https://[your-cloudfront-id].cloudfront.net
#
# The CloudFront domain is shown in Amplify console > Storage > CDN domain.

set -e

BUCKET="${1:-}"
if [ -z "$BUCKET" ]; then
  echo "Usage: ./scripts/upload-photos.sh <bucket-name>"
  echo ""
  echo "Find your bucket name in: Amplify console > Storage > portfolioAssets"
  exit 1
fi

REGION="${AWS_REGION:-us-east-1}"

echo "Uploading photos to s3://${BUCKET}/photos/ ..."

# Portfolio photos
aws s3 sync public/photos/ "s3://${BUCKET}/photos/" \
  --region "$REGION" \
  --cache-control "public,max-age=31536000,immutable" \
  --metadata-directive REPLACE \
  --exclude "*.DNG" \
  --exclude "*.dng" \
  --exclude "*.PNG" \
  --include "*.jpg" \
  --include "*.jpeg"

# Personal photo (hero)
aws s3 cp public/personal-photo.jpg "s3://${BUCKET}/photos/personal-photo.jpg" \
  --region "$REGION" \
  --cache-control "public,max-age=31536000,immutable"

echo ""
echo "Done. Photos are at: https://[cloudfront-id].cloudfront.net/photos/"
echo "Set NEXT_PUBLIC_PHOTO_CDN_URL in Amplify env vars to activate CDN delivery."
