import React from 'react';
import { Grid, Form, Select, Input, Button, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { setGender, setGroup } from '../actions/User';
import { wipeComments } from '../actions/Comment';


const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' }
]


class JoinPage extends React.Component {

    onClick = (e) => {
        if(this.props.comments.length > 0) {
            this.props.wipeComments();
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
    }

    onRoomChange = (e) => {
        this.props.setGroup(e.target.value);
    }

    onGenderChange = (e) => {
        this.props.setGender(e.target.value);
    }
    render() {
        return (
            <div>
                <Form>
                    <Grid centered columns={3}>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <Form.Input autoComplete='off' name ='input' placeholder='Room Name' label='Chat Room' onChange={this.onRoomChange}/>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <Select options={options} placeholder='Gender' onChange={this.onGenderChange} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column stretched>
                                <Button onClick={this.onClick}>
                                    <NavLink tag={Link} className="text-dark" to="/chat">Join</NavLink>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    comments: state.comments
})
const mapDispatchToProps = dispatch => bindActionCreators({
    wipeComments,
    setGender,
    setGroup
},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(JoinPage);