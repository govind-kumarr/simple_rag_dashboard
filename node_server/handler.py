import base64
import boto3

def get_image(event, context):
    # Initialized S3 client inside the handler
    s3 = boto3.resource('s3')
    
    image_name = event["pathParameters"]["image_name"]
    key = f"avatars/{image_name}"
    bucket_name = "govind-public-assets"
    bucket = s3.Bucket(bucket_name)
    obj = bucket.Object(key)
    image_data = obj.get()["Body"].read()
    response = {
        "headers": {"Content-Type": "image/png"},
        "statusCode": 200,
        "body": base64.b64encode(image_data).decode('utf-8'),
        "isBase64Encoded": True,
    }
    return response

def upload_image(event, context):
    # Initialize S3 client inside the handler
    s3 = boto3.resource('s3')
    
    response: dict = {}
    if not "queryStringParameters" in event:
        response.update(
            {
                "statusCode": 400,
                "body": "Missing image name. Please include image name in your query params",
            }
        )
        return response
    query_str = event["queryStringParameters"]
    if not "image_name" in query_str:
        response.update(
            {
                "statusCode": 400,
                "body": "Missing image name. Please include image name in your query params",
            }
        )
        return response
    image_name = query_str["image_name"]
    content_type: str = event["headers"]["content-type"]
    if content_type and "image/" not in content_type:
        return {"statusCode": 400, "body": "Invalid content type"}
    image_type = content_type.split("/")[1]
    image_data = base64.b64decode(event["body"])
    key = f"avatars/{image_name}.{image_type}"
    print({"key": key})
    bucket_name = "govind-public-assets"
    bucket = s3.Bucket(bucket_name)
    obj = bucket.Object(key)
    obj.put(Body=image_data)
    response = {"statusCode": 200, "body": "Image uploaded successfully!"}
    return response