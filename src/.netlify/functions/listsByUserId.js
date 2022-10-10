
exports.handler = async function (event, context) {
    console.log(event);
    console.lot(context);
    
    const userId = '1566757431413293057';
    const token = process.env.bearer_token;
    const endpointURL = `https://api.twitter.com/2/users/${userId}/owned_lists`;

    const res = await fetch(endpointURL, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

    if (res.body) {
        return {
            statusCode: 200,
            body: res.body
        };
    }
    else {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Something went wrong' })
        };
    }
}