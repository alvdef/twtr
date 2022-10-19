const needle = require('needle')

async function getRequest (listId) {
    
    const token = process.env.bearer_token;
    const endpointURL = `https://api.twitter.com/2/lists/${listId}/tweets?`;
    const params = {
        'tweet.fields': 'author_id,created_at,id,in_reply_to_user_id,text',
        'expansions': 'author_id',
        'user.fields': 'created_at,id,name,username',
    };

    const res = await needle("get", endpointURL, params, {
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

    const { listId } = event.queryStringParameters;

    try {
        const response = await getRequest(listId);
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
