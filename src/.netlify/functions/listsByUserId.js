
exports.handler = async function (event, context) {
    console.log(event);
    console.lot(context);
    
    const userId = '1566757431413293057';
    const token = process.env.bearer_token;
    const endpointURL = `https://api.twitter.com/2/users/${userId}/owned_lists`;
    
    try {
        const res = await fetch(endpointURL, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        console.log(res);

        return {
            statusCode: 200,
            body: JSON.stringify(res)
        }
        
    } catch (error) {
        console.log('Error: ');
        console.log(error);

        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify(error),
        };
    }
}
