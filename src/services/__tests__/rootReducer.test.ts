import { rootReducer } from '../rootReducer';

describe('rootReducer', () => {
  it('должен корректно инициализироваться', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        loading: false,
        error: null,
      },
      burgerConstructor: {
        bun: null,
        ingredients: [],
      },
      order: {
        order: null,
        orderRequest: false,
        orderModalData: null,
        error: null,
      },
      user: {
        user: null,
        isAuthenticated: false,
        isAuthChecked: false,
        loginUserRequest: false,
        loginUserError: null,
        registerUserRequest: false,
        registerUserError: null,
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: null,
      },
    });
  });
});
