"use strict";
exports.backandCallback = function (dbRow, parameters, userProfile, respondToBackand) {
    const BACKAND = require('@backand/nodejs-sdk');
    const SLACKSDK = require('@slack/client').IncomingWebhook;
    let url = 'https://hooks.slack.com/services/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';
    let slack = new SLACKSDK(url);
    let ebc = {};
    let message = '';
    let obj = parameters['object'];

    if (parameters['delete']) {
        message = 'Item was Deleted\n';
    } else if (parameters['update']) {
        message = 'Item was Updated\n';
    } else if (obj === 'users') {
        message = 'A User Profile has been updated\n'
    } else {
        message = 'New Item was Created\n';
    }

    BACKAND.init({
        appName: 'ebc2',
        anonymousToken: '6755ec7e-3a7e-4dc7-a414-fd1acf8a51a1'
    });

    BACKAND.object.getOne(obj, parameters['id'])
        .then(res => {
            ebc = res['data'];

            if (obj === 'users') {
                message += ebc['firstName'] + ' ' + ebc['lastName'] + ' update their profile. If the they updated their pic then check <' + ebc['pic'] + '>';
            } else {
                message += 'Item\'s ID ' + ebc['id'] + ' and name ' + ebc['name'] + ' for user ' + userProfile['username'];
            }

            slack.send(message, (err, res) => {    
                if  (err)  {        
                    console.log('Error: ',  err);    
                } 
                else  {        
                    console.log('Message sent:  ',  res);    
                }
            });
        });
}