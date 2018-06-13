# react-burger-builder

A fully featured React app. In development....more info upon completion:
- A rich comibination of stateful components, higher order components, and stateless components for best practices.
- Uses async Action Creators to pull the initial burger ingredients from Firebase and set an initial state in a Redux store.
- Lean reducers for clean and maintainable code 
- Some useful local state configurations for managing UI like spinners and side menus
- JWT Authentication for guarded enpoints


## How to stand up this repo

### First create and then a public Firebase database url to the axios-orders.js url
NOTE: API-KEY will be deleted soon! You'll need your own.

Database Rules on Firebase 
- "ingredients" table is public
- all other tables are only accesible via authenticated users

```
{
  "rules": {
    "ingredients": {
        ".read": true,
        ".write": true,	
    },
     "orders": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
  }
}
```

More Documentation coming soon....

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

