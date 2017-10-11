'use strict'

require('dotenv').config()
const fs = require('fs')
const crypto = require('crypto')
const path = require('path')

const AWS = require('aws-sdk')
const mime = require('mime-types')

const s3 = new AWS.S3()

const promiseRandomBytes = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        reject(err)
      }
      resolve(buf.toString('hex'))
    })
  })
}

const promiseS3Upload = (params) => {
  return new Promise((resolve, reject) => {
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

const s3upload = function (filename) {
  const stream = fs.createReadStream(filename)
  const contentType = mime.lookup(filename)
  const ext = path.extname(filename)
  const today = new Date().toISOString().split('T')[0]

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: 'some random string',
    Body: stream,
    ACL: 'public-read',
    ContentType: contentType
  }
  promiseRandomBytes()
  .then((randomString) => {
    params.Key = `filebucket/${today}/${randomString}${ext}`
    return params
  })
  .then(promiseS3Upload)
  .then(console.log)
  .catch(console.error)
}

module.exports = s3upload
