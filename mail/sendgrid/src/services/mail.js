exports['SINGLETON mail'] = (config) => {

    // NOTE see https://www.npmjs.com/package/@sendgrid/mail

    const apiKey = config.SENDGRID_API_KEY;

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(apiKey)

    /* EXAMPLE MESSAGE
    const msg = {
        to: 'test@example.com', // Change to your recipient
        from: 'test@example.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      }
    */

    async function sendMail(msg) {
        await sgMail.send(msg);
        return { success: true };
    }

    return { sendMail };

}