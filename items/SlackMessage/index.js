const BACKAND = require('@backand/nodejs-sdk');
const SLACKSDK = require('@slack/client').IncomingWebhook;

exports.backandCallback = function (dbRow, parameters, userProfile, respondToBackand) {
    let url = 'https://hooks.slack.com/services/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';
    let slack = new SLACKSDK(url);
    let ebc = {};

    BACKAND.init({
        appName: 'ebc2',
        anonymousToken: '6755ec7e-3a7e-4dc7-a414-fd1acf8a51a1'
    });

    BACKAND.object.getOne('items', dbRow['id'])
        .then(res => {
            let  message = 'New Item was Created\n';
            ebc = res['data'];

            message += 'Item\'s ID ' + ebc['id'] + ' and name ' + ebc['name'] + ' for user ' + userProfile['username']; 

            slack.send(message, (err, res) => {    
                if  (err)  {        
                    console.log('Error:',  err);    
                } 
                else  {        
                    console.log('Message sent: ',  res);    
                }
            });
        });
}