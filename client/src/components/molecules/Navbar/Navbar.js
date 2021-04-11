import React from 'react'
import {FaBars} from 'react-icons/fa'
import {
    Nav,
    NavContainer,
    NavLogo,
    MobileIcon,
    NavLinks,
    NavMenu,
    NavItem, NavBtn, NavBtnLink
} from './Navbar.style'
import {NavLink} from "react-router-dom";

export const Navbar = ({toggle}) => {
    return (
        <>
            <Nav>
                <NavContainer>
                    <NavLogo to="\">
                        Novme
                    </NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars/>
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="specialist" >Specialist</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="discover" >Discover</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="about" >About</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to='/sign-in'> Sign In</NavBtnLink>
                    </NavBtn>
                </NavContainer>
            </Nav> 
        </>
    )
}
