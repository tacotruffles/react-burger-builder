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

### Basic Firebase Configuration
NOTE: API-KEY and Firebase url twill be deleted soon! You'll need your own.
- Set up a Firebase DB with Email and Password Authentication
- Copy the API-KEY and DB Url into the .env variables
```
REACT_APP_FIREBASE_API_KEY=********---REPLACE API KEY---*************
REACT_APP_FIREBASE_DB_URL=********---REPLACE URL---*************
```

### Create the React Apps configiration table in Firebase
- Set up an "ingredients" table in Firebase with the following properties:
```
{
  "ingredients" : {
    "lettuce": 0,
    "bacon": 0,
    "cheese": 0,
    "meat": 0
  }
}
```

### Adjust Firebase access rules to the following
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

## Burger Builder Demo
You can see the Burger Builder app livin' large at the following demo link:
https://burger-builder-3214d.firebaseapp.com
