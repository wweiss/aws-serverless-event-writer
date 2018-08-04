import { Context } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { AppConfig } from './AppConfig';

const s3 = new S3();
const config = new AppConfig();

// tslint:disable:no-console
exports.handler = (event: any, context: Context) => {
  const req: PutObjectRequest = {
    Body: JSON.stringify(event),
    Bucket: config.s3Bucket,
    Key: config.eventKey,
  };
  if (config.eventContentType) {
    req.ContentType = config.eventContentType;
  }
  s3.putObject(req, (err, data) => {
    if (err) {
      console.error(`Error writting event to S3[${req.Bucket} | ${req.Key}]: `, err);
    } else {
      console.info(`Event written to S3[${req.Bucket}]: ${req.Key}`);
    }
  });
};
