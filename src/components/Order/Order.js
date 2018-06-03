import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]});
    }

    // console.log(ingredients);

    const ingredientList = ingredients.map(ig => {
        return <span
            key={ig.name}
            style={{
                textTransform: 'capitalize',
                display:'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}>{ig.name} ({ig.amount}) </span>
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientList}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
            <p>Cusomter Name: {props.customer.name}</p>
        </div>
    )
};

export default order;