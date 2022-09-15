import React from "react";
import PostBody from "./body/PostBody";
import PostHeader from "./header/PostHeader";

const Post = (props) => {

    return (
        <>
            <PostHeader 
                user={props.user} 
                tweet_id={props.tweet.id} 
                created_at={props.tweet.created_at} 
            />
            <PostBody 
                text={props.tweet.text}
            />
        </>
    );
}


export default Post;