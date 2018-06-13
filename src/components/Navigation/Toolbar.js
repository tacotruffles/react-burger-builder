import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../components/Logo/Logo';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.opened}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;