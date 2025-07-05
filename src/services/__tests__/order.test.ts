import reducer, {
  createOrder,
  fetchOrderByNumber,
  clearOrder,
  setOrderModalData,
  clearOrderModalData,
  initialState
} from '../slices/order';
import { TOrder } from '@utils-types';

describe('Редьюсер слайса order', () => {
  const mockOrder: TOrder = {
    _id: '9876543210abcdef12345678',
    ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c8'],
    status: 'done',
    name: 'Галактический бургер',
    createdAt: '2025-06-28T14:20:00.000Z',
    updatedAt: '2025-06-28T14:21:00.000Z',
    number: 424242
  };

  it('При вызове createOrder.pending устанавливается orderRequest = true', () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('При вызове createOrder.fulfilled сохраняются данные заказа и orderRequest = false', () => {
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.order).toEqual(mockOrder);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  it('При вызове createOrder.rejected сохраняется ошибка и orderRequest = false', () => {
    const error = 'Ошибка при создании заказа';
    const action = {
      type: createOrder.rejected.type,
      error: { message: error }
    };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(error);
  });

  it('При вызове fetchOrderByNumber.pending устанавливается orderRequest = true', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('При вызове fetchOrderByNumber.fulfilled сохраняются данные заказа и orderRequest = false', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  it('При вызове fetchOrderByNumber.rejected сохраняется ошибка и orderRequest = false', () => {
    const error = 'Ошибка загрузки заказа';
    const action = {
      type: fetchOrderByNumber.rejected.type,
      error: { message: error }
    };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(error);
  });

  it('clearOrder очищает order, orderModalData и error', () => {
    const prevState = {
      ...initialState,
      order: mockOrder,
      orderModalData: mockOrder,
      error: 'Ошибка'
    };
    const state = reducer(prevState, clearOrder());
    expect(state.order).toBeNull();
    expect(state.orderModalData).toBeNull();
    expect(state.error).toBeNull();
  });

  it('setOrderModalData устанавливает orderModalData', () => {
    const action = setOrderModalData(mockOrder);
    const state = reducer(initialState, action);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  it('clearOrderModalData очищает orderModalData', () => {
    const prevState = {
      ...initialState,
      orderModalData: mockOrder
    };
    const state = reducer(prevState, clearOrderModalData());
    expect(state.orderModalData).toBeNull();
  });
});
