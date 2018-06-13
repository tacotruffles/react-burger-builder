import axios from 'axios';
import * as actionTypes from './actionTypes';

// Show spinner
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

// Authoriztation was successful
export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.userId
    }
};

// Authorization failed
export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTimeout) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTimeout * 1000) //Firebase passes seconds so adjust to milliseconds for setTimeout()
    }
}

// Async code for authentication
export const auth = (email, password, isSignup) => {
    // Thanks to Redux Thunk!
    return dispatch => {

        console.log('email: %s \n password: %s \n signup? %s', email, password, isSignup);
        // Start spinner
        dispatch(authStart());

        // ... authetnicate user here
        // See Firbase docs: https://firebase.google.com/docs/reference/rest/auth/#section-create-email-password
        let authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBJDYKIuUr7JV64R3pkD7FCMFHnCW-KnWk'

        if(!isSignup) {
            authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBJDYKIuUr7JV64R3pkD7FCMFHnCW-KnWk';
        }
        
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        axios.post(authUrl, authData)
            .then(response => {
                console.log(response);
                const successData = {
                    userId: response.data.localId,
                    idToken: response.data.idToken
                };

                dispatch(authSuccess(successData));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFailed(err.response.data.error));
            });
    }
}