import { S3Client } from '@aws-sdk/client-s3';
import { envs } from '../../config/env';

export const s3Client = new S3Client({
	region: envs.AWS_REGION,
	credentials: {
		accessKeyId: envs.AWS_ACCESS_KEY_ID,
		secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
	},
});
