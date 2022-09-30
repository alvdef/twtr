const axios = require("axios");

exports.handler = async function (event, context) {
    console.log(event);
    console.lot(context);    
    
    const token = process.env.bearer_token;
    const { listId } = event.queryStringParameters;
    const endpointURL = `https://api.twitter.com/2/lists/${listId}/tweets`;

    try {
        const res = await axios.get(endpointURL, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            params: {
                "tweet.fields": "created_at",   
                expansions: "author_id",            
                "user.fields": "name,url,username",    
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
                        "created_at": "2022-09-27T14:20:00.000Z",
                        "author_id": "443680219",
                        "text": "Te dicen que te van a hacer uno de estos dos peinados.\n\n¿Cuál eliges?",
                        "id": "1574765805400735746"
                    },
                    {
                        "created_at": "2022-09-27T14:17:36.000Z",
                        "author_id": "376256489",
                        "text": "RT @mincoturgob: 🏖 Hoy se celebra el #DiaMundialDelTurismo bajo el lema #RepensarElTurismo\n\nEn España somos líderes mundiales por nuestra o…",
                        "id": "1574765201181786113"
                    }
                ],
                "includes": {
                    "users": [
                        {
                            "url": "https://t.co/5VuFimg0q5",
                            "id": "443680219",
                            "name": "NBA Spain",
                            "username": "NBAspain"
                        },
                        {
                            "url": "https://t.co/GamM83oZcy",
                            "id": "376256489",
                            "name": "CSD",
                            "username": "deportegob"
                        }
                    ]
                },
                "meta": {
                    "result_count": 2,
                    "next_token": "7140dibdnow9c7btw423hvanaxz0p73t2oe62qwn65vlf"
                }
            },
        }
    }
}
