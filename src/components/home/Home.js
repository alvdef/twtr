import React from 'react'
import { Row } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Post from '../post/Post'

import DATA from '../../data'


const Home = () => {

    const currentList = DATA.lists.currentList;
    const listTweets = DATA.tweets[currentList].data;
    const listUsers = DATA.tweets[currentList].users;

    const getUser = (tweet, users) => users.find(user => user.id === tweet.author_id);

    const tweets = listTweets.map((tweet, index) => 
        <Row>
            <Post 
                key={index}
                user={getUser(tweet, listUsers)}
                tweet={tweet}
            />
        </Row>
    );


    return (
        <Container>
            {tweets}
        </Container>
    )
}

export default Home