var handler = require('./handler.js').handler;
var parameters = {
    "userInput": {},
    "dbRow": {},
    "parameters": {
        id: 102,
        object: 'items'
    },
    "userProfile": {
        username: 'Somebody'
    }
};

handler(parameters, {
    succeed: function (result) {
        console.log("success: ", JSON.stringify(result, null, 2));
        process.exit(0);
    },
    fail: function (error) {
        console.error("error: ", error);
        process.exit(1);
    }
});