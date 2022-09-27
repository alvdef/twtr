import React from "react";
import { DateTime } from "luxon";
import { AiOutlineTwitter } from 'react-icons/ai';

import './Post.css'

const Post = ({ tweet }) => {

    const date = DateTime.fromISO(tweet.created_at).toFormat('ff');
    const tweetURL = `https://twitter.com/${tweet.user.username}/status/${tweet.tweet_id}`;


    return (
        <div className="post-wrapper">
            <div className="post-header">
                <h4 id='name'>{ tweet.user.name }</h4>
                <a id='username' href={tweet.user.url}>@{ tweet.user.username }</a>
                <a id='go-to-twitter' href={tweetURL} > <AiOutlineTwitter /> </a>
                
                <p id='created_at' >{ date }</p>
            </div>
            
            <div className="post-body">
                <p>{tweet.text}</p>
                {/* {media ? <img>} */}
            </div>
        </div>
    )
}


export default Post;