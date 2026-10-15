variable "aws_region" {
  description = "AWS region for S3 bucket"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project identifier used in resource names"
  type        = string
  default     = "bandhan-portfolio"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "prod"
}
