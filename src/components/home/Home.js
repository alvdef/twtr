import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSpinner } from 'react-icons/fa';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import Post from '../post/Post'
import { 
    fetchPOSTS, 
    selectListUsers,
    selectFilteredPosts 
} from '../../redux/tweetsSlice'


const Home = () => {
    const dispatch = useDispatch();

    const tweets = useSelector(state => state.tweets);
    const { isLoading, error, searchTerm, selectedList } = tweets;
    const users = useSelector(selectListUsers)
    const posts = useSelector(selectFilteredPosts);

    useEffect(() => {
        dispatch(fetchPOSTS(selectedList));
    }, [selectedList])

    const getUser = (tweet, users) => users.find(user => user.id === tweet.author_id);

    const postsContainer = posts.map((tweet, index) => 
        <Row >
            <Post 
                key={index}
                user={getUser(tweet, users)}
                tweet={tweet}
            />
        </Row>
    );

    if (isLoading) {
        return (
            <div className='error'>
                <FaSpinner className='loading' />
                <h1>Loading...</h1>
            </div>
        )
    }
    else if (error) {
        return (
            <div className="error">
                <h2>Failed to load posts.</h2>
                <button
                    type="button"
                    onClick={() => dispatch(fetchPosts(selectedSubreddit))}
                >
                Try again
                </button>
            </div>
        );
    }
    else if (posts.length === 0) {
        return (
            <div className="error">
                <h2>No posts matching "{searchTerm}"</h2>
                <button 
                    type="button" 
                    onClick={() => dispatch(setSearchTerm(''))}
                >
                Go home
                </button>
            </div>
        );
    }
    else {
        return (
            <Container fluid="sm">
                {postsContainer}
            </Container>
        )
    }
}

export default Home