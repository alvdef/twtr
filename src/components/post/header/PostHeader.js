import React from "react";
import moment from "moment/moment";
import Stack from "react-bootstrap/Stack"
import { AiOutlineTwitter } from 'react-icons/ai';




const PostHeader = (props) => {

    const { user, created_at } = props
    const date = created_at.split("T")
    const tweetURL = `https://twitter.com/${props.username}/status/${props.tweet_id}`;
    

    return (
        <>
            <Stack direction="horizontal" gap={3} >
                <h3 id='name'>{ user.name }</h3>
                <a id='username' href={user.url}>@{ user.username }</a>
                <a id='go-to-twitter' href={tweetURL} ><AiOutlineTwitter /></a>
                <p id='created_at' className="ms-auto">{ date[1] }</p>
            </Stack>
        </>
    );
}
  
  
  
export default PostHeader