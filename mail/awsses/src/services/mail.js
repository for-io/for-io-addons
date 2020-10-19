exports['SINGLETON mail'] = (config) => {

    // NOTE see https://www.npmjs.com/package/aws-sdk

    // Load the AWS SDK for Node.js
    var AWS = require('aws-sdk');
    // Set the sdk 
    AWS.config.update({
        region: config.AWSSES_REGION,
        accessKeyId: config.AWSSES_KEY,
        secretAccessKey: config.AWSSES_SECRET
    });

    /* EXAMPLE MESSAGE
    var msg = {
        Destination: {
            CcAddresses: [
                'EMAIL_ADDRESS',
            ],
            ToAddresses: [
                'EMAIL_ADDRESS',
            ]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: "HTML_FORMAT_BODY"
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "TEXT_FORMAT_BODY"
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Test email'
            }
        },
        Source: 'SENDER_EMAIL_ADDRESS',
        ReplyToAddresses: [
            'EMAIL_ADDRESS',
        ],
    };
    */
    async function sendMail(msg) {
        await sendWithPromice(msg)
        return { success: true };
    }

    function sendWithPromice(msg) {
        return new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(msg).promise();
    }
    return { sendMail };
}