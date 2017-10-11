'use strict'

const s3upload = require('../lib/aws-s3-upload')
const filename = process.argv[2]

s3upload(filename)
