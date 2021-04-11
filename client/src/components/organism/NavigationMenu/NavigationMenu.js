import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Sidebar from "../../molecules/Sidebar/Sidebar";
import {Navbar} from "../../molecules/Navbar/Navbar";

const NavigationMenu = () => {

    const [isOpen,setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    return(
        <>
            <Sidebar isOpen={isOpen} toggle={handleToggle}/>
            <Navbar toggle={handleToggle} />
        </>
    );
};

export default NavigationMenu;