# CloudWatch Event Rule Configuration Script

# Step 1: Create a CloudWatch Event Rule

# Create the CloudWatch Event Rule
aws events put-rule \
  --schedule-expression "rate(5 minutes)" \
  --name keep-lambda-warm-rule

# Step 2: Add the Lambda Function as a Target

# Add your Lambda function as a target for the CloudWatch event rule.
aws events put-targets \
  --rule keep-lambda-warm-rule \
  --targets "Id"="1","Arn"="arn:aws:lambda:us-west-2:123456789012:function:your-lambda-function-name"
# Replace:
# - us-west-2 with your AWS region.
# - 123456789012 with your AWS account ID.
# - your-lambda-function-name with the name of your Lambda function.

# Step 3: Grant Permissions to CloudWatch Events

# Grant CloudWatch Events permission to invoke your Lambda function.
aws lambda add-permission \
  --function-name your-lambda-function-name \
  --statement-id keep-warm-permission \
  --action 'lambda:InvokeFunction' \
  --principal events.amazonaws.com \
  --source-arn arn:aws:events:us-west-2:123456789012:rule/keep-lambda-warm-rule
