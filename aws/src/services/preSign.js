exports['SINGLETON presign'] = (config) => {

    // NOTE see https://www.npmjs.com/package/aws-sdk

    // Load the AWS SDK for Node.js
    const AWS = require('aws-sdk');

    // Set the region 
    AWS.config.update({ region: config.AWSSES_REGION });

    // Create S3 service object
    const s3 = new AWS.S3({
        accessKeyId: config.AWSSES_KEY,
        secretAccessKey: config.AWSSES_SECRET
    });


    /*EXAMPLE MESSAGE
        var params = {
            Bucket: "key",
            Key: "Bucket1",
        }
    */
    async function preSign(params) {
        const url = await s3.getSignedUrlPromise('putObject', params)
        return {
            success: true,
            url: url
        };
    }

    return { preSign };
}