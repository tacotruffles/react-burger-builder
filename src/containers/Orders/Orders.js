import React, { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import Order from '../../components/Order/Order';


class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
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
                this.setState({loading: false, orders: fecthedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }


    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                        customer={order.customer}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);