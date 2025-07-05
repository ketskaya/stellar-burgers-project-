import reducer, {
  initialState,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser,
  setAuthChecked,
  clearUserErrors,
  setUser,
  setAuthenticated
} from '../slices/user';

import { TUser } from '@utils-types';

describe('Редьюсер слайса user', () => {
  const mockUser: TUser = {
    email: 'usermeow@yandex.ru',
    name: 'UserMeow'
  };

  it('При вызове registerUser.pending устанавливается registerUserRequest = true', () => {
    const action = { type: registerUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.registerUserRequest).toBe(true);
    expect(state.registerUserError).toBeNull();
  });

  it('При вызове registerUser.fulfilled сохраняется пользователь, registerUserRequest = false, isAuthenticated = true', () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = reducer(initialState, action);
    expect(state.registerUserRequest).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.registerUserError).toBeNull();
  });

  it('При вызове registerUser.rejected сохраняется ошибка, registerUserRequest = false', () => {
    const error = 'Ошибка регистрации';
    const action = {
      type: registerUser.rejected.type,
      error: { message: error }
    };
    const state = reducer(initialState, action);
    expect(state.registerUserRequest).toBe(false);
    expect(state.registerUserError).toBe(error);
  });

  it('При вызове registerUser.rejected без сообщения ошибка по умолчанию', () => {
    const action = { type: registerUser.rejected.type, error: {} };
    const state = reducer(initialState, action);
    expect(state.registerUserRequest).toBe(false);
    expect(state.registerUserError).toBe('Ошибка регистрации');
  });

  it('При вызове loginUser.pending устанавливается loginUserRequest = true', () => {
    const action = { type: loginUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.loginUserRequest).toBe(true);
    expect(state.loginUserError).toBeNull();
  });

  it('При вызове loginUser.fulfilled сохраняется пользователь, loginUserRequest = false, isAuthenticated = true', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = reducer(initialState, action);
    expect(state.loginUserRequest).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loginUserError).toBeNull();
  });

  it('При вызове loginUser.rejected сохраняется ошибка, loginUserRequest = false', () => {
    const error = 'Ошибка входа';
    const action = { type: loginUser.rejected.type, error: { message: error } };
    const state = reducer(initialState, action);
    expect(state.loginUserRequest).toBe(false);
    expect(state.loginUserError).toBe(error);
  });

  it('При вызове loginUser.rejected без сообщения ошибка по умолчанию', () => {
    const action = { type: loginUser.rejected.type, error: {} };
    const state = reducer(initialState, action);
    expect(state.loginUserRequest).toBe(false);
    expect(state.loginUserError).toBe('Ошибка входа');
  });

  it('При вызове getUser.fulfilled сохраняется пользователь, isAuthenticated и isAuthChecked = true', () => {
    const action = { type: getUser.fulfilled.type, payload: mockUser };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  it('При вызове getUser.rejected устанавливается isAuthChecked = true', () => {
    const action = { type: getUser.rejected.type };
    const state = reducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
  });

  it('При вызове updateUser.fulfilled обновляются данные пользователя', () => {
    const updatedUser = { email: 'newemail@yandex.ru', name: 'NewName' };
    const action = { type: updateUser.fulfilled.type, payload: updatedUser };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(updatedUser);
  });

  it('При вызове logoutUser.fulfilled очищается пользователь, isAuthenticated = false, isAuthChecked = true', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser,
      isAuthenticated: true,
      isAuthChecked: false
    };
    const action = { type: logoutUser.fulfilled.type };
    const state = reducer(stateWithUser, action);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('setAuthChecked устанавливает isAuthChecked', () => {
    const action = setAuthChecked(true);
    const state = reducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
  });

  it('clearUserErrors очищает ошибки loginUserError и registerUserError', () => {
    const stateWithErrors = {
      ...initialState,
      loginUserError: 'Ошибка входа',
      registerUserError: 'Ошибка регистрации'
    };
    const action = clearUserErrors();
    const state = reducer(stateWithErrors, action);
    expect(state.loginUserError).toBeNull();
    expect(state.registerUserError).toBeNull();
  });

  it('setUser устанавливает пользователя', () => {
    const action = setUser(mockUser);
    const state = reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
  });

  it('setAuthenticated устанавливает isAuthenticated', () => {
    const action = setAuthenticated(true);
    const state = reducer(initialState, action);
    expect(state.isAuthenticated).toBe(true);
  });
});
