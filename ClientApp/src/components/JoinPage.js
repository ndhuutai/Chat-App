import React from 'react';
import { Grid, Form, Select, Input, Button, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';


const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' }
]


class JoinPage extends React.Component {

    onSubmit = (e) => {
        e.preventDefault();
    }

    onRoomChange = (e) => {
        console.log(e.target.value);
    }

    onGenderChange = (e) => {
        console.log(e.target.value);
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
                                <Button>
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

const mapDispatchToProps = dispatch => bindActionCreators({

},dispatch);
export default connect()(JoinPage);