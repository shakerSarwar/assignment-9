import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { userContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [logedInUser, setLogedInUser] = useContext(userContext)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                logedInUser.email || logedInUser.displayName ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;