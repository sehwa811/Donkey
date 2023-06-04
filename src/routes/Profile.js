import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../contexts/usercontext';
import { auth } from '../fbase'

const Profile = () => {
    const { setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const onLogOutClick = () => {
        auth.signOut();
        navigate('/');
        sessionStorage.removeItem('user');
        setCurrentUser(null);
    }

    return (
        <button onClick={onLogOutClick}>Log Out</button>
    )
}

export default Profile;