import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../slices/constructor';

describe('Редьюсер слайса constructor', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const bunIngredient = {
    _id: '60d3b41abdacab0026a733c6',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
    id: 'bun'
  };

  const mainIngredient = {
    _id: '60d3b41abdacab0026a733c8',
    name: 'Филе люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0,
    id: 'main'
  };

  const sauceIngredient = {
    _id: '60d3b41abdacab0026a733c9',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 400,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0,
    id: 'sauce'
  };

  it('Должен добавить булку', () => {
    const action = addIngredient(bunIngredient);
    const state = constructorReducer(initialState, action);
    expect(state.bun).toEqual(
      expect.objectContaining({
        ...bunIngredient,
        id: expect.any(String)
      })
    );
    expect(state.ingredients).toHaveLength(0);
  });

  it('Должен добавить ингредиент', () => {
    const action = addIngredient(sauceIngredient);
    const state = constructorReducer(initialState, action);
    expect(state.ingredients).toContainEqual(
      expect.objectContaining({
        ...sauceIngredient,
        id: expect.any(String)
      })
    );
    expect(state.bun).toBeNull();
  });

  it('Должен удалить ингредиент', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { ...sauceIngredient, id: 'sauce' },
        { ...mainIngredient, id: 'main' }
      ]
    };
    const state = constructorReducer(
      stateWithIngredients,
      removeIngredient('sauce')
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients).not.toContainEqual(
      expect.objectContaining({ id: 'sauce' })
    );
  });

  it('Должен переместить ингредиент', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { ...sauceIngredient, id: 'sauce' },
        { ...mainIngredient, id: 'main' }
      ]
    };
    const state = constructorReducer(
      stateWithIngredients,
      moveIngredient({ from: 0, to: 1 })
    );
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({ id: 'main' })
    );
    expect(state.ingredients[1]).toEqual(
      expect.objectContaining({ id: 'sauce' })
    );
  });

  it('Должен очистить конструктор', () => {
    const stateWithData = {
      bun: bunIngredient,
      ingredients: [sauceIngredient]
    };
    const state = constructorReducer(stateWithData, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });

  it('Не должен ничего удалять, если ингредиентов нет', () => {
    const emptyState = {
      bun: null,
      ingredients: []
    };
    const state = constructorReducer(
      emptyState,
      removeIngredient('non-existent-id')
    );
    expect(state.ingredients).toHaveLength(0);
  });

  it('Не должен менять порядок, если индексы некорректны (отрицательный индекс)', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { ...sauceIngredient, id: 'sauce' },
        { ...mainIngredient, id: 'main' }
      ]
    };
    const state = constructorReducer(
      stateWithIngredients,
      moveIngredient({ from: -1, to: 1 })
    );
    expect(state.ingredients).toEqual(stateWithIngredients.ingredients);
  });

  it('Не должен менять порядок, если индексы некорректны (индекс за пределами массива)', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [sauceIngredient, { ...mainIngredient, id: 'main' }]
    };
    const state = constructorReducer(
      stateWithIngredients,
      moveIngredient({ from: 0, to: 99 })
    );
    expect(state.ingredients).toEqual(stateWithIngredients.ingredients);
  });
});
