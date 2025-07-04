import { rootReducer } from '../rootReducer';
import { initialState as ingredientsInitialState } from '../slices/ingredients';
import { initialState as constructorInitialState } from '../slices/constructor';
import { initialState as orderInitialState } from '../slices/order';
import { initialState as userInitialState } from '../slices/user';
import { initialState as feedInitialState } from '../slices/feed';

describe('rootReducer', () => {
  it('должен корректно инициализироваться', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      ingredients: ingredientsInitialState,
      burgerConstructor: constructorInitialState,
      order: orderInitialState,
      user: userInitialState,
      feed: feedInitialState
    });
  });
});
