import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
//import * as burgerBuilderActions from '../../store/actions/';
import * as actions from "../../store/actions";

export class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        purchasable: false,
        purchaseMode: false,
    }

    componentDidMount () {
        //console.log(this.props);
        // Dispatch an Ingredient Fetch from Firebase
        this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            // Reduce values to a sum
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;

    }

    purchaseHandler = () => {

        if(this.props.isAuthenticated) {
            this.setState({purchaseMode: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () => {

        this.setState({purchaseMode: false});

    }

    purchaseContinueHandler = () => {
        
        this.props.onInitPruchase();
        this.props.history.push('/checkout');

    }

    render() {

        // Copy the ingredients
        const disabledInfo = {
            ...this.state.ingredients
        };

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        isAuth={this.props.isAuthenticated}
                        price={this.props.total}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        disabled={disabledInfo}
                        checkout={this.purchaseHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.total} //.toFixed(2)
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
        }

        // Set the copy to true or false if an ingredient is empty
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Modal show={this.state.purchaseMode} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {

    return {
        ings: state.burgerBuilder.ingredients,
        total: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };

};

const mapDispatchToProps = dispatch => {

    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.delIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPruchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));