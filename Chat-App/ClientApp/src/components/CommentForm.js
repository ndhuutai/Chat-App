import React from 'react'
import {Button, Form, Grid} from "semantic-ui-react";

export default (props) => (
    <Form onSubmit={props.onSubmit} autoComplete='off'>
        <Grid columns={3} stackable>
            <Grid.Row divided={true} stretched>
                <Grid.Column width={13}>
                    <Form.Input name='input' placeholder='Enter your message here'/>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Button>Send Message</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Form>
)