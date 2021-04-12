import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from "../Sidebar/Sidebar";
import {Navbar} from "../Navbar/Navbar";

const MainTemplate = ({children}) => {

    return(
        <>
           <Sidebar/>
           <Navbar/>
        </>
    );
};

MainTemplate.propTypes = {

}

export default MainTemplate;