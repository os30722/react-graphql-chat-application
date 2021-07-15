import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router';
import { setUsername } from '../store/userSlice';

const Register = withRouter(({ history }) => {

    const dispatch = useDispatch();
    const [ usrInput , setUsrInput ] = useState(null);

    const handleSubmit = () => {
        String(usrInput).length !== 0 && dispatch(setUsername(usrInput));
        history.push('./chats');
    }

    return (
        <div className='home_wrapper'>
            <div className='form'>
                <div id='welcome_logo'>WELCOME !</div>
                <input 
                    id='username_input'
                    value={usrInput}
                    onChange={(e) => setUsrInput(e.target.value)}
                    type='text'
                    placeholder='Enter Username'
                />
                <button id='join_button'  onClick={handleSubmit} >
                    Join Room
                </button>
            </div>

        </div>
    )
}
)

export default Register;
