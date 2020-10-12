const assert = require('assert');

async function runTest(addonName, config) {
    const mailFactory = require(`./${addonName}/src/services/mail`);
    const mail = mailFactory['SINGLETON mail'](config);

    let result1 = await mail.sendMail({
        from: 'spock@example.com',
        to: 'kirk@example.com',
        subject: 'test 1',
        text: 'This is a test message 1!',
    });

    assert.deepStrictEqual(result1, { success: true });

    let result2 = await mail.sendMail({
        from: 'spock@example.com',
        to: 'kirk@example.com',
        subject: 'test 2',
        html: 'This is a <b>test message 2</b>!',
    });

    assert.deepStrictEqual(result2, { success: true });
}

runTest('mailgun', {
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY || 'MAILGUN_API_KEY',
    MAIL_DOMAIN: process.env.MAIL_DOMAIN || 'example.com',
}).catch(e => console.log('MAILGUN TEST ERROR: ', e));