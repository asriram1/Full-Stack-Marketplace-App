import Credentials from "next-auth/providers/credentials";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY,
    secretAccessKey: process.env.MY_AWS_SECRET_KEY,
  },
});

async function s3Upload({ files, links }) {
  files.forEach(async (file) => {
    const ext = file.name.split(".").slice(-1)[0];
    const newFileName = uniqid() + "." + ext;
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const bucket = "anirudh-marketplace";
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );
    const link = "https://" + bucket + ".s3.amazonaws.com/" + newFileName;
    // console.log(link);
    links.push(link);
  });
}

export async function POST(req) {
  const data_objects = await req.formData();
  var links = [];
  const files = data_objects.getAll("files[]");

  s3Upload({ files, links }).then(() => {
    console.log(links);
  });

  return new Promise((resolve) => {
    setTimeout(() => resolve(Response.json(links)), 3000);
  });
}
