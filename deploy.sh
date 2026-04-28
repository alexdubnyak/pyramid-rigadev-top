#!/bin/bash

# Load environment variables
source .env.deploy

# Build the project
echo "Building project..."
npm run build

if [ $? -ne 0 ]; then
  echo "Build failed!"
  exit 1
fi

echo "Deploying to Alibaba Cloud OSS..."

# Sync dist folder to OSS bucket using AWS CLI with S3-compatible endpoint
AWS_ACCESS_KEY_ID=$OSS_ACCESS_KEY \
AWS_SECRET_ACCESS_KEY=$OSS_SECRET_KEY \
aws s3 sync dist/ s3://$OSS_BUCKET/ \
  --endpoint-url $OSS_ENDPOINT \
  --delete

if [ $? -eq 0 ]; then
  echo "Deploy successful! Site available at https://projects.rigadev.top"
else
  echo "Deploy failed!"
  exit 1
fi
