# AWS Serverless Event Writer

This serverless app accepts events and writes the contents to a designated S3 Bucket.

## Installation Steps

1. [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and login

2. Go to the app's page on the [Serverless Application Repository](https://serverlessrepo.aws.amazon.com/#/applications/arn:aws:serverlessrepo:us-east-1:771389557967:applications~EventWriter) and click "Deploy"

3. Provide the required app parameters

### Parameters

The app requires the following parameters:

1. **S3Bucket** (required) - The name (not ARN) of the bucket where events should be written.

2. **EventKey** (optional) - The specific key that the events should be written to. If this parameter is provided, each subsequent event will overwrite the previous one. If this key is not set, a dynamic key will be generated in the form of: `event-<Unix EPOCH>`.

3. **EventKeyPrefix** (optional) - If the `EventKey` parameter is not set, this value will be added before the dynamically generated key value, allowing for the creation of folder structure.

4. **EventKeySuffix** (optional) - If the `EventKey` parameter is not set, this value will be appended to the dynamically generated key value, allowing for the possible specification of a file extension. If a dynamic key is used and this parameter is not set, `.json` will be assumed.

5. **EventContentType** (optional) - Provides a content type to be set on the resulting S3 object. If `EventKey` and `EventKeySuffix` are not set, `application/json` will be used.

6. **LoggingLevel** (optional) - The level of logging desired (`error,warn,info,verbose,debug` or `silly`).
