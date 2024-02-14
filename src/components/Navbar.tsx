import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';


const drawerWidth = 250;

const styles = (theme: any) => ({

    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            maxWidth: '80%',
            flexShrink: 0,
        },
    },

    menuButton: {
        marginLeft: 'auto',
        marginRight: 0,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },

    drawerPaper: {
        width: drawerWidth,
        maxWidth: '80%',
    },

    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
});

@observer
class Navbar extends React.Component<{ classes: any, theme: any }> {

    @observable private mobileOpen: boolean = false;



    render() {

        const { classes } = this.props;

        const links = (
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/members">Meet the Group</Link>
                <Link to="/apply">Apply</Link>
            </div>
        );

        return <nav className="navbar"
            id="navbar">

            <div className="navbar-logo">
                <Link to="/"><img
                    alt="Mediocre Melodies text logo"
                    src="/resources/images/logo.png"
                /></Link></div>


            <Hidden xsDown implementation="css">
                {links}
            </Hidden>

            <IconButton
                color="inherit"
                aria-label="Open drawer"
                edge="start"
                onClick={action(() => this.mobileOpen = !this.mobileOpen)}
                className={classes.menuButton}>
                <MenuIcon />
            </IconButton>

            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={this.mobileOpen}
                    onClose={action(() => this.mobileOpen = !this.mobileOpen)}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}>
                    <IconButton onClick={action(() => this.mobileOpen = !this.mobileOpen)} className={classes.closeMenuButton}>
                        <CloseIcon />
                    </IconButton>
                    <div className="drawer-links">
                        <div className="links">
                            <Link to="/" onClick={action(() => this.mobileOpen = !this.mobileOpen)}>Home</Link>
                            <hr />
                            <Link to="/members" onClick={action(() => this.mobileOpen = !this.mobileOpen)}>Meet the Group</Link>
                            <hr />
                            <Link to="/apply" onClick={action(() => this.mobileOpen = !this.mobileOpen)}>Apply</Link>
                        </div>
                    </div>
                </Drawer>
            </Hidden>

        </nav>;
    }
}

export default withStyles(styles, { withTheme: true })(Navbar);

