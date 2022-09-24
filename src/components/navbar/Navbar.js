import React, { useState } from 'react'
import { AiOutlineSearch, AiOutlineTwitter, AiOutlineClose } from 'react-icons/ai';
import { BsList } from 'react-icons/bs'

import './Navbar.css'
import DATA from '../../data';




const Navbar = () => {

    // inicializa la lista como la lista inicial
    const [selectedList, setSelectedList] = useState(DATA.lists.data[0])
    const [searchTermLocal, setSearchTermLocal] = useState('');

    const onSearchTermChange = (e) => {
        setSearchTermLocal(e.target.value);
    }

    const onSearchTermSubmit = (e) => {

    }


    return (
        <nav className='navbar'>
            <ListsSidebar 
                selectedList={selectedList} 
                setSelectedList={setSelectedList} 
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
                         <AiOutlineSearch />
                </span>
            </form>
        </nav>
    );
}

const ListsSidebar = ({ selectedList, setSelectedList }) => {

    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => setSidebar(!sidebar);
    

    return(
        <>
            <BsList className='sidenav-item toggle' onClick={toggleSidebar} />

            <ul className={sidebar ? 'sidenav-menu active' : 'sidenav-menu'}>
                <li><AiOutlineClose 
                    className='sidenav-item toggle close' 
                    onClick={toggleSidebar}
                /></li>
                {DATA.lists.data.map((list, index) => (
                    <li 
                        key={index}
                        className={list === selectedList ? 'sidenav-item text active' : 'sidenav-item text'}
                        onClick={() => setSelectedList(list)}
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