import React from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {UserManager} from "../oidc-client/config";
import '../styles/styles.scss';


class NavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isLoggedIn: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onClick = async (e) => {
        try {
            if(!this.state.isLoggedIn) {
                UserManager.signinRedirect().then(response => console.log(response)).catch(e => console.log(e));
            } else {
                UserManager.signoutRedirect().then(response => console.log(response)).catch(e => console.log(e));
            }
        } catch (e) {
            console.log(e)
        }
    };
    
    componentDidMount() {
        UserManager.getUser().then(user => {
            this.setState({isLoggedIn: !!user})
        }).catch(e =>console.log(e));
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Chat App</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/chat">Chat</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/"
                                             onClick={this.onClick}>{this.props.user.isAuthenticated ? 'Log Out' : 'Log In'}</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(NavMenu);
