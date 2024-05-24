# Provisioned Concurrency Configuration Script

# Step 1: Enable Provisioned Concurrency

# Update Your Lambda Function Configuration
# Enable provisioned concurrency for your Lambda function and set the number of instances to 5.

aws lambda put-provisioned-concurrency-config \
  --function-name your-lambda-function-name \
  --qualifier $LATEST \
  --provisioned-concurrent-executions 5
# Replace your-lambda-function-name with the name of your Lambda function.


# Step 2: Verify Provisioned Concurrency
# Ensure that the provisioned concurrency configuration is correctly applied:

aws lambda get-provisioned-concurrency-config \
  --function-name your-lambda-function-name \
  --qualifier $LATEST
