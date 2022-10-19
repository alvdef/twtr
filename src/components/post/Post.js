import React from "react";
import { DateTime } from "luxon";
import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";

import { AiOutlineTwitter } from 'react-icons/ai';

import './Post.css'

const Post = ({ tweet }) => {

    const date = DateTime.fromISO(tweet.created_at).toFormat('ff');
    const tweetURL = `https://twitter.com/${tweet.user.username}/status/${tweet.id}`;

    const options = {
        formatHref: {
            hashtag: (val) => `https://twitter.com/hashtag/${val.substring(1)}`,
            mention: (val) => `https://twitter.com/${val.substring(1)}`,
        }
    };

    return (
        <div className="post-wrapper">
            <div className="post-header">
                <h4 id='name'>{ tweet.user.name }</h4>
                <a id='username' href={tweet.user.url}>@{ tweet.user.username }</a>
                <a id='go-to-twitter' href={tweetURL} > <AiOutlineTwitter /> </a>
                
                <p id='created_at' >{ date }</p>
            </div>
            
            <div className="post-body">.
                <Linkify options={options}>
                    { tweet.text }
                </Linkify>
            </div>
        </div>
    )
}


export default Post;