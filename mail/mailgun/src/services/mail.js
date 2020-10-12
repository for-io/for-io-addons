exports['SINGLETON mail'] = (config) => {

    // NOTE see https://www.npmjs.com/package/mailgun-js

    const apiKey = config.MAILGUN_API_KEY;
    const domain = config.MAIL_DOMAIN || config.DOMAIN;
    const mailgun = require('mailgun-js')({ apiKey, domain });

    async function sendMail(opts) {
        await mailgun.messages().send(opts);

        return { success: true };
    }

    return { sendMail };

}