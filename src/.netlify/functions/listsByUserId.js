
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
        return res.body;
    }
    else {
        throw new Error('Something went wrong');
    }
}