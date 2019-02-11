## Command Line Setup

### AWS CLI
```
pip install awscli --upgrade --user
```
https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html

### AWS SAM CLI
```
brew upgrade
brew update
brew tap aws/tap
brew install aws-sam-cli
sam --version
```
https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html


## Deployment

### S3 Bucket 
This bucket stores the resource files.

Create bucket (the name is globally unique across all AWS users. example name, your-app-lambda-resources):
```
aws s3 mb s3://<YOUR_BUCKET_NAME>
```

### Package and Deploy

Package:
```
sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket <YOUR_BUCKET_NAME>
```

Deploy:
```
aws cloudformation deploy --template-file /Users/timothyjordison/Documents/personal/repos/basic-rest/infrastructure/packaged.yaml --stack-name snake-app --capabilities CAPABILITY_IAM
```