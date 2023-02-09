import AWS = require('aws-sdk');
import {config} from './config/config';


// Configure AWS
AWS.config.credentials = new AWS.Credentials(config.aws_access_key_id, config.aws_secret_access_key)

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: config.aws_region,
  params: {Bucket: config.aws_media_bucket},
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 10;

  return s3.getSignedUrl('getObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 10;

  return s3.getSignedUrl('putObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// This is better than getPutSignedUrl: if there is a problem, an HTTP error instead of a HTTP 200 with a generic URL is returned
export function getPutSignedUrlPromise( key: string ): Promise<string> {
  const signedUrlExpireSeconds = 60 * 10;

  return s3.getSignedUrlPromise('putObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}
