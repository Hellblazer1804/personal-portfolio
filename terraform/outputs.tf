output "bucket_name" {
  description = "S3 bucket name — use this in the upload script"
  value       = aws_s3_bucket.photos.id
}

output "cdn_url" {
  description = "CloudFront CDN base URL — set as NEXT_PUBLIC_PHOTO_CDN_URL in Amplify env vars"
  value       = "https://${aws_cloudfront_distribution.photos.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID — use for cache invalidation after uploads"
  value       = aws_cloudfront_distribution.photos.id
}
