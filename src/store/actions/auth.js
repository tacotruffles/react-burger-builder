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

    // No need for async f(x) to log out so we'll remove the locally store token and epxiration dates here
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

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

        //console.log('email: %s \n password: %s \n signup? %s', email, password, isSignup);
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
                //console.log('[AUTH ACTIon]: ', response);
                const successData = {
                    userId: response.data.localId,
                    idToken: response.data.idToken
                };
                
                // Calculate Expiration Date
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                // Store the token locally
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate);

                dispatch(authSuccess(successData));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                //console.log(err);
                dispatch(authFailed(err.response.data.error));
            });
    }
};

export const setAuthRedirectPath = (redirectPath) => {
    return {
        type: actionTypes.AUTH_SET_REDIRECT_PATH,
        path: redirectPath
    }
}

export const authCheckAuthentication = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if(expirationDate <= new Date ()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');

                const authData = {
                    idToken: token,
                    userId: userId
                }

                dispatch(authSuccess(authData));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000));
            }
        }
    }
}