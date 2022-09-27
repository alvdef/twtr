const axios = require("axios");

exports.handler = async function (event, context) {
    console.log(event);
    console.lot(context);    

    const userId = '1566757431413293057';
    const token = process.env.BEARER_TOKEN;
    const endpointURL = `https://api.twitter.com/2/users/${userId}/owned_lists`;
 
    try {
        const res = await axios.get(endpointURL, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return {
            statusCode: 200,
            body: res.body,
        }
    } catch (err) {
        return {
            statusCode: 404,
            body: err.toString(),
        }
    }
}