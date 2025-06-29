import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients';
import orderReducer from './slices/order';
import constructorReducer from './slices/constructor';
import userReducer from './slices/user';
import feedReducer from './slices/feed';

export const rootReducer = combineReducers({
  burgerConstructor: constructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer
});
