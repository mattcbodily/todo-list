import React, {useState} from 'react';

export default props => {
    let [user, setUser] = useState(props.location.user)

    return (
        <div>{user.first_name}</div>
    )
}