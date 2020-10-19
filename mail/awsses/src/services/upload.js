exports['SINGLETON upload'] = (config) => {

    // NOTE see https://www.npmjs.com/package/aws-sdk

    // Load the AWS SDK for Node.js
    const AWS = require('aws-sdk');
    const fs = require('fs');
    const util = require('util')
    
    const readFile = util.promisify(fs.readFile);

    // Set the region 
    AWS.config.update({ region: config.AWSSES_REGION });

    // Create S3 service object
    const s3 = new AWS.S3({
        accessKeyId: config.AWSSES_KEY,
        secretAccessKey: config.AWSSES_SECRET
    });

    const upload = util.promisify(s3.upload);

    /*EXAMPLE MESSAGE
        var msg = {
            "filePath": "/test.jpg",
            "fileName": "ImageInBucket.jpg",
            "bucketName": "Bucket1",
        }
    */

    async function uploadFile(msg) {
        const fileContent =  await readFile(msg.filePath);
        const params = {
            Bucket: bucketName,
            Key: fileName, // File name you want to save as in S3
            Body: fileContent
        };
        await upload(params)
        return { success: true };
    }

    return { uploadFile };
}