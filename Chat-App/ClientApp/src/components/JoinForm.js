import React from 'react';


export default (props) => (
    <form className="m-auto w-50" onSubmit={props.onSubmit}>
        <div className="form-group">
            <label htmlFor="roomName">Room Name</label>
            <input type="text"
                   className="form-control"
                   id="roomName"
                   placeholder="name of room"
                   autoComplete="off"
                   onChange={props.onRoomChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select name="gender" id="gender" onChange={props.onGenderChange}
                    className="form-control">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        </div>
        <button
            className="btn btn-primary">Join
        </button>
    </form>
)