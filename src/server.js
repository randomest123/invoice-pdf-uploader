import 'dotenv/config'
import express from 'express'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
const s3 = new S3Client({ region: process.env.AWS_REGION })
const app = express()
app.post('/upload/:id', express.raw({ type: 'application/pdf', limit: '10mb' }), async (req, res) => {
  await s3.send(new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: `invoices/${req.params.id}.pdf`, Body: req.body }))
  res.json({ ok: true })
})
app.listen(3000, () => console.log('listening on :3000'))
