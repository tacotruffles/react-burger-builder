import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: orderId,
        orderData: orderData
    }
};

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

// Async - dispatch orderData and get order id or pass any errors thru
export const purchaseBurger =  (orderData, token) => {
    return dispatch => {
        // Start the spinner
        dispatch(purchaseBurgerStart());

        // Send the order to Firebase
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error));
            });
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
};


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrders = (token) => {
    return dispatch => {
        // Show spinner
        dispatch(fetchOrdersStart());

        // Fetch or db orders
        axios.get('/orders.json?auth=' + token)
            .then(res => {
                //console.log(res);
                const fecthedOrders = []
                for(let key in res.data) {
                    fecthedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }

                //console.log(fecthedOrders);
                //this.setState({loading: false, orders: fecthedOrders});
                dispatch(fetchOrdersSuccess(fecthedOrders));
            })
            .catch(err => {
                //this.setState({loading: false});
                dispatch(fetchOrdersFailed(err));
            })
    }
};
