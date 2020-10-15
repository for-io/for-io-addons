exports['SINGLETON mail'] = (config) => {

    // NOTE see https://www.npmjs.com/package/mandrill-api

    const apiKey = config.MANDRILL_API_KEY;
    const async = config.MANDRILL_IS_ASYNC || false;
    const ip_pool = config.MANDRILL_IP_POOL || "Main Pool";
    const send_at = config.MANDRILL_SEND_AT || "example send_at";
    const mandrill = require('mandrill-api/mandrill');
    const mandrill_client = new mandrill.Mandrill(apiKey);

    /* EXAMPLE MESSAGE
    var message = {
        "html": "<p>Example HTML content</p>",
        "text": "Example text content",
        "subject": "example subject",
        "from_email": "message.from_email@example.com",
        "from_name": "Example Name",
        "to": [{
                "email": "recipient.email@example.com",
                "name": "Recipient Name",
                "type": "to"
            }]
    };
    */
    async function sendMail(msg) {
        await sendWithPromice(msg)
        return { success: true };
    }

    function sendWithPromice(msg) {
        return new Promise((resolve, reject) => {
            mandrill_client.messages.send(
                { "message": msg, "async": async, "ip_pool": ip_pool, "send_at": send_at },
                (result) => resolve(result),
                (error) => reject(error))
        })
    }
    return { sendMail };
}