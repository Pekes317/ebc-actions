// var BackandSDK = require('backandsdk/backand');
// var backand = new BackandSDK();

exports.backandCallback = function(dbRow, parameters, userProfile, respondToBackand) {
    // README - Here is the starting point of your code.
    // Do not change the signature of backandCallback.
    // Do not exit anywhere from your code, meaning, do not use process.exit
    // Backand will take care of that for you
    // You should call the respondToBackand callback: function(err, data) { ... }
    // err (Error): The error object returned from the request. Set to null if the request is successful.
    // data (Object): The de-serialized data returned from the request. Set to null if a request error occurs.
    
    // Bellow is an example of how to handle success and failure of your code
    const backand = require('@backand/nodejs-sdk');

    var runBackandSDKDemo = false;

    if (runBackandSDKDemo) {
        backandCrudDemo()
        .then(function(result) {
            /* response to exist the action */ respondToBackand(null, {"message": "Backand SDK Demo Finished"})
        });
    }
    else {
        // a response data example
        var helloWorld = {"message": "Hello World!"};

        // error handling
        if (!helloWorld) {
            respondToBackand({errorMessage: "An error occurred"}, null);
        }
        // success handling
        else {
            respondToBackand(null, helloWorld);
        }
    }
}

// To run a demo of how to perform CRUD (Create, Read, Update and Delete) with Backand SDK, do the following:
// 1. npm install backandsdk --save
// 2. Change runBackandSDKDemo to true
// 3. Uncomment the function backandCrudDemo and the two first variables BackandSDK and backand
// 4. Uncomment the call for the function backandCrudDemo

// function backandCrudDemo(){
//
//     var masterToken = "b50a5125-769c-472f-9287-6ba227818f2e"; //<put here the master token that you run in the action init>;
//     var userToken = "83d0f58e-f60d-11e5-b112-0ed7053426cb"; //<put here the user token that you run in the action init>;
//     var token = masterToken + ":" + userToken;
//
//     return backand.basicAuth(token)
//         .then(function() {
//             return backand.post('/1/objects/items' /* url for create */, {"name":"new item", "description":"new item description"} /* data to post */)
//         })
//         .then(function(result) {
//             console.log("create", result);
//             return backand.get('/1/objects/items' /* url to read a list */)
//         })
//         .then(function(result) {
//             console.log("read a list", result);
//             return backand.get('/1/objects/items/1' /* url to read a one */)
//         })
//         .then(function(result) {
//             console.log("read one", result);
//             return backand.put('/1/objects/items/1' /* url to update */, {"name":"new item change", "description":"new item description change"} /* data to post */)
//         });
// }
