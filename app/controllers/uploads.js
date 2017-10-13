'use strict'

const multer = require('multer')
const multerUpload = multer({dest: 'tmp/'})

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Upload = models.upload

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')
const s3upload = require('lib/aws-s3-upload')

const index = (req, res, next) => {
  const query = req._parsedUrl.query
  if (query) {
    Upload.find({ tags: query })
      .then(uploads => res.json({
        uploads: uploads.map((e) =>
          e.toJSON({ virtuals: true, user: req.user }))
      }))
      .catch(next)
  } else {
    Upload.find()
    .then(uploads => res.json({
      uploads: uploads.map((e) =>
      e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
  }
}

const show = (req, res) => {
  res.json({
    upload: req.upload.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  console.log('user is', req.user)
  const options = {
    filename: req.file.path,
    mime: req.file.mimetype,
    originalName: req.file.originalname
  }
  console.log('options are', options)
  s3upload(options)
    .then(s3response => {
      console.log(s3response)
      return Upload.create({
        url: s3response.Location,
        name: req.body.file.name,
        _owner: req.user._id,
        uploadedBy: req.user.email
      })
    })
    .then(upload =>
      res.status(201)
      .json({
        upload
      }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body.upload._owner  // disallow owner reassignment.
  req.upload.update(req.body.upload)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.upload.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: multerUpload.single('file[file]'), only: ['create'] },
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Upload), only: ['show'] },
  { method: setModel(Upload, { forUser: true }), only: ['update', 'destroy'] }
] })
