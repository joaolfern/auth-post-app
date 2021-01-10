const mongoose = require('mongoose')
const aws = require('aws-sdk')
const fs = require('fs')
const { promisify } = require('util')
const path = require('path')

const s3 = new aws.S3()

const ImageSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
})

ImageSchema.pre('save', function () {
    if (!this.url) {
        this.url = `${process.env.API_URL}/files/${this.key}`
    }
})

ImageSchema.pre('remove', function () {
    if (process.env.STORAGE_TYPE === 's3') {
        s3.deleteObject({
            Bucket: process.env.AWS_BUCKET,
            Key: this.key,
        }).promise()
    } else {
        return promisify(fs.unlink)(
            path.resolve(__dirname, '..', 'temp', 'uploads', this.key)
        )
    }
})

module.exports = mongoose.model('Image', ImageSchema)