const axios = require("axios");

exports.handler = async function (event, context) {
    console.log(event);
    console.lot(context);    

    const userId = '1566757431413293057';
    const token = process.env.bearer_token;
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
            statusCode: 400,
            body: {
                "data": [
                    {
                        "id": "1566842355059154945",
                        "name": "Tecnologia"
                    },
                    {
                        "id": "1566842155594833922",
                        "name": "Deportes"
                    }
                ],
                "meta": {
                    "result_count": 2
                }
            }
        }
    }
}