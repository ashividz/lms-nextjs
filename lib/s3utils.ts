import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
const s3 = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const uploadFileToS3 = async (buffer: Buffer, imageUrl: string) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${imageUrl}`,
    Body: buffer,
    ContentType: "image/jpg",
  };
  const command = new PutObjectCommand(params);

  try {
    const data = await s3.send(command);
    return data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
export const deleteImageFromS3 = async (imageUrl: string) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${imageUrl}`,
  };

  try {
    const command = new DeleteObjectCommand(params);
    const data = await s3.send(command);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
