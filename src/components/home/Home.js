import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSpinner } from 'react-icons/fa';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import Post from '../post/Post'
import { 
    fetchPosts, 
    selectFilteredPosts,
    setSearchTerm
} from '../../redux/tweetsSlice'
import { selectLists } from '../../redux/listsSlice';


const Home = () => {
    const tweets = useSelector(state => state.tweets);
    const { isLoading, error, searchTerm, selectedList } = tweets;
    const posts = useSelector(selectFilteredPosts);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPosts(selectedList));
    }, [selectedList])

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
                    onClick={() => dispatch(fetchPosts(selectedList))}
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
        console.log(posts);
        return (
            <Container fluid="sm">
                {posts.map((tweet, index) => 
                    <Row >
                        <Post 
                            key={index}
                            tweet={tweet}
                        />
                    </Row>
                )}
            </Container>
        )
    }
}

export default Home