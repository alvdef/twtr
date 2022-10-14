const fetch = require('node-fetch')

exports.handler = async function (event, context) {
    console.log(event);
    console.log(context);
    
    const { listId } = event.queryStringParameters;
    const token = process.env.bearer_token;
    const endpointURL = `https://api.twitter.com/2/lists/1566842355059154945/tweets?`;

    try {
        const res = await fetch(endpointURL, {
            method: 'GET',
            params: {
                'tweet.fields': 'author_id,created_at,id,in_reply_to_user_id,text',
                'expansions': 'author_id',
                'user.fields': 'created_at,id,name,username',
            },
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