import React from 'react';
import NavigationMenu from "../../organism/NavigationMenu/NavigationMenu";

const MainTemplate = ({children}) => {

    return(
       <>
        <NavigationMenu/>
        {children}
       </>
    );
};


export default MainTemplate;