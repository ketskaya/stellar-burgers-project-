import reducer, {
  fetchFeeds,
  fetchUserOrders,
  initialState
} from '../slices/feed';
import { TOrder } from '@utils-types';

describe('Редьюсер слайса feed', () => {
  const mockOrder: TOrder = {
    _id: '9876543210abcdef12345678',
    ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c8'],
    status: 'done',
    name: 'Галактический бургер',
    createdAt: '2025-06-28T14:20:00.000Z',
    updatedAt: '2025-06-28T14:21:00.000Z',
    number: 424242
  };

  const mockFeedPayload = {
    orders: [mockOrder],
    total: 1000,
    totalToday: 50
  };

  it('При вызове fetchFeeds.pending устанавливается loading = true', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('При вызове fetchFeeds.fulfilled записываются заказы и связанные данные, loading = false', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: mockFeedPayload
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockFeedPayload.orders);
    expect(state.total).toBe(mockFeedPayload.total);
    expect(state.totalToday).toBe(mockFeedPayload.totalToday);
    expect(state.error).toBeNull();
  });

  it('При вызове fetchFeeds.rejected записывается ошибка и loading = false', () => {
    const error = 'Не удалось загрузить ленту';
    const action = { type: fetchFeeds.rejected.type, payload: error };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('При вызове fetchUserOrders.pending устанавливается loading = true', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('При вызове fetchUserOrders.fulfilled записываются заказы и loading = false', () => {
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: [mockOrder]
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([mockOrder]);
    expect(state.error).toBeNull();
  });

  it('При вызове fetchUserOrders.rejected записывается ошибка и loading = false', () => {
    const error = 'Не удалось загрузить заказы пользователя';
    const action = { type: fetchUserOrders.rejected.type, payload: error };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});
