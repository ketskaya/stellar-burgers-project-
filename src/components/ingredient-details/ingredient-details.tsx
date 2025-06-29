import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/slices/ingredients';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import type { RootState, AppDispatch } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { ingredients, loading } = useSelector(
    (state: RootState) => state.ingredients
  );

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  if (
    loading ||
    (!ingredients.length && !ingredients.find((i) => i._id === id))
  ) {
    return <Preloader />;
  }

  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
