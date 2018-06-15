# react-burger-builder

A fully featured React app. In development....more info upon completion:
- A rich comibination of stateful components, higher order components, and stateless components for best practices.
- Uses async Action Creators to pull the initial burger ingredients from Firebase and set an initial state in a Redux store.
- Lean reducers for clean and maintainable code 
- Some useful local state configurations for managing UI like spinners and side menus
- JWT Authentication for guarded enpoints
- Lazy loading for components (Orders, Auth, Checkout) for faster loading of necessary core components
- Unit testing examples for a Redux reducer, container and component


## How to stand up this repo

### Firebase Configuration
NOTE: API-KEY and Firebase url twill be deleted soon! You'll need your own.
- Url to first base is configured in axios-orders.js
- More Documentation coming soon....

### Create a Database with the following Rules on Firebase 
- "ingredients" table is public
- all other tables are only accesible via authenticated users
- "orders" table needs an index so we can fetch by userId

```
{
  "rules": {
    "ingredients": {
        ".read": true,
        ".write": true,	
    },
     "orders": {
        ".read": "auth != null",
        ".write": "auth != null",
        ".indexOn": ["userId"]
      }
  }
}
```

###  Run the React app 

```shell
git clone https://github.com/tacotruffles/react-burger-builder.git
cd react-burger-builder

#run
yarn
yarn start
```

### Redux Dev Tool Instructions

https://github.com/zalmoxisus/redux-devtools-extension#usage

