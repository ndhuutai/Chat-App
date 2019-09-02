import React from 'react'

export default (props) => (
    <form onSubmit={props.onSubmit}>
        <div className='container form-group row p-0 m-0 d-flex'>
            <div className='col-sm-9 p-0 m-0 align-self-center'>
                <input className='form-control' name='input' type="text" placeholder='Enter your message...'/>
            </div>
            <div className='col-sm-3 flex-sm-fill p-0 pl-sm-1 '>
                <button type='submit' className='btn btn-primary flex-sm-fill w-100'>Send Message</button>
            </div>
        </div>
    </form>
)

// (<Form onSubmit={props.onSubmit} autoComplete='off'>
//     <Grid columns={3} stackable>
//         <Grid.Row divided={true} stretched>
//             <Grid.Column width={13}>
//                 <Form.Input name='input' placeholder='Enter your message here'/>
//             </Grid.Column>
//             <Grid.Column width={3}>
//                 <div className='btn btn-primary text-wrap mr-0 text-center'>Send Message</div>
//             </Grid.Column>
//         </Grid.Row>
//     </Grid>
// </Form>)