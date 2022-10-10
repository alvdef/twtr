
exports.handler = async function (event, context) {
    console.log(event);
    console.lot(context);
    
    const { listId } = event.queryStringParameters;
    const token = process.env.bearer_token;
    const endpointURL = `https://api.twitter.com/2/lists/${listId}/tweets?`;

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

    if (res.body) {
        return res.body;
    }
    else {
        throw new Error('Something went wrong');
    }
}