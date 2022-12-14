import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineSearch, AiOutlineTwitter, AiOutlineClose } from 'react-icons/ai';
import { BsList } from 'react-icons/bs'

import './Navbar.css'
import { 
    fetchLists,
    selectLists,
} from '../../redux/listsSlice';
import { 
    selectSelectedList,
    setSelectedList,
    setSearchTerm
} from '../../redux/tweetsSlice';



const Navbar = () => {

    const dispatch = useDispatch();
    const lists = useSelector(selectLists);
    const selectedList = useSelector(selectSelectedList);

    const [searchTermLocal, setSearchTermLocal] = useState('');

    useEffect(() => {
        dispatch(fetchLists());
        // dispatch(setSelectedList(lists[0]));
    }, [dispatch])

    const onSearchTermChange = (e) => {
        setSearchTermLocal(e.target.value);
    };

    const onSearchTermSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(searchTermLocal));
    };

    return (
        <nav className='navbar'>
            <ListsSidebar 
                lists={lists}
                selectedList={selectedList} 
                setSelectedList={setSelectedList} 
                dispatch={dispatch}
            />
            <span className='header'>
                <AiOutlineTwitter size={40} />
                <h1>{selectedList.name}</h1>
            </span>
            <form className='search' >
                <input 
                    type='text'
                    placeholder='Search'
                    value={searchTermLocal}
                    onChange={onSearchTermChange}
                    aria-label='Search tweets'
                />
                <span onClick={onSearchTermSubmit} aria-label='Search' >
                         <AiOutlineSearch size={25} />
                </span>
            </form>
        </nav>
    );
}

const ListsSidebar = ({ lists, selectedList, setSelectedList, dispatch }) => {

    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => setSidebar(!sidebar);

    return(
        <>
            <BsList className='sidenav-item toggle' onClick={toggleSidebar} />

            <ul className={sidebar ? 'sidenav-menu active' : 'sidenav-menu'}>
                <li>
                    <AiOutlineClose 
                        className='sidenav-item toggle close' 
                        onClick={toggleSidebar}
                    />
                </li>
                {lists.map((list, index) => (
                    <li 
                        key={index}
                        className={list === selectedList ? 'sidenav-item text active' : 'sidenav-item text'}
                        onClick={() => dispatch(setSelectedList(list))}
                    >
                        <span >
                            {list.name}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    )
}


export default Navbar