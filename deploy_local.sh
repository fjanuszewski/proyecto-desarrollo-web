#!/bin/bash

YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# VARIABLES STANDAR
ENV=develop #THIS WORK FINE IF WE USE SAM IN LOCAL. IN PIPELINE IS NOT NEED
BUCKET=temporaly-bucket-deploysam #BUCKET IS REQUIRED FOR SAM PACKAGE

DOMAIN="buplex.com"
SUBDOMAIN="demo"
CERTARN=arn:aws:acm:us-east-1:458519205575:certificate/4375bd89-943c-4d30-8cd2-edf072b64e31

STACK=demo-frontend-$ENV #NAME OF STACK, IS IMPORTANT FOR THE NAME OF ALL OBJECTS IN TEMPLATE
PROJECT=cpem #PROJECT NAME FOR THE TAGS

AWS_PROFILE=default

REGION=us-east-1

echo "${YELLOW} Creating temporaly bucket for SAM..."
echo " ================================================= ${NC}"
aws s3api create-bucket --bucket $BUCKET

echo "${YELLOW} Validating local SAM Template..."
echo " ================================================= ${NC}"
sam validate --profile $AWS_PROFILE --template "template.yaml"

echo "${YELLOW} Package"
echo " ================================================= ${NC}"
sam package --profile $AWS_PROFILE --template-file ./template.yaml --output-template-file packaged-template.yaml --s3-bucket $BUCKET

echo "${YELLOW} Deploy"
echo " ================================================= ${NC}"
sam deploy --profile $AWS_PROFILE --region us-east-1 --template-file packaged-template.yaml --stack-name $STACK --tags Project=$PROJECT --parameter-overrides CertArn=$CERTARN ProjectId=$PROJECT Environment=$ENV Domain=$DOMAIN SubDomain=$SUBDOMAIN --capabilities CAPABILITY_NAMED_IAM

echo "${YELLOW} Desrcibe Stack"
echo " ================================================= ${NC}"

CLOUDFRONT_DISTRIBUTION=`aws cloudformation describe-stacks --profile $AWS_PROFILE --stack-name "$STACK" --output text | grep $STACK-PortalDistribution | awk -F"\t" '{$0=$5}6'`

echo "${YELLOW} Push to S3 dist"
echo " ================================================= ${NC}"

aws s3 sync dist/ s3://$SUBDOMAIN.$DOMAIN/  --acl public-read --profile $AWS_PROFILE --cache-control max-age=3600

echo "${YELLOW} Creating Invalidation"
echo " ================================================= ${NC}"
aws cloudfront create-invalidation --profile $AWS_PROFILE --distribution-id $CLOUDFRONT_DISTRIBUTION --paths "/*"

echo "${YELLOW} Empty temporaly bucket for SAM..."
echo " ================================================= ${NC}"
aws s3 rm s3://$BUCKET --recursive

echo "${YELLOW} Deleting temporaly bucket for SAM..."
echo " ================================================= ${NC}"
aws s3 rb s3://$BUCKET --force