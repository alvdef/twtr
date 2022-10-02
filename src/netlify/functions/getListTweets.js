const axios = require("axios");

// exports.handler = async function (event, context) {
//     console.log(event);
//     console.lot(context);    
    
//     const token = process.env.bearer_token;
//     const { listId } = event.queryStringParameters;
//     const endpointURL = `https://api.twitter.com/2/lists/${listId}/tweets`;

//     try {
//         const res = await axios.get(endpointURL, {
//             headers: {
//                 authorization: `Bearer ${token}`,
//             },
//             params: {
//                 "tweet.fields": "created_at",   
//                 expansions: "author_id",            
//                 "user.fields": "name,url,username",    
//             }
//         });
//         return {
//             statusCode: 200,
//             body: res.body,
//         }
//     } catch (err) {
//         return {
//             statusCode: 400,
//             body: err,
//         }
//     }
// }

exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: "hello wrld getlisttweets"
    }
}