const needle = require('needle')

async function getRequest () {
    
    const token = process.env.bearer_token;
    const endpointURL = `https://api.twitter.com/2/users/1566757431413293057/owned_lists`;

    const res = await needle("get", endpointURL, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    
    if (res.body) {
        return res.body;
    }
    else {
        throw new Error("Unsuccessful request");
    }
}


exports.handler = async function (event, context) {
    console.log(event);
    console.log(context);
    
    try {
        const response = await getRequest();
        return {
            statusCode: 200,
            body: JSON.stringify(response),
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