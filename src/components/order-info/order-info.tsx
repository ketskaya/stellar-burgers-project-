import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { fetchFeeds } from '../../services/slices/feed';
import { fetchIngredients } from '../../services/slices/ingredients';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const orders = useSelector((state) => state.feed.orders);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const needsIngredients = !ingredients.length;
    const needsOrders = !orders.length;

    if (needsIngredients || needsOrders) {
      setLoading(true);
      Promise.all([
        needsIngredients ? dispatch(fetchIngredients()).unwrap() : null,
        needsOrders ? dispatch(fetchFeeds()).unwrap() : null
      ])
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [dispatch, ingredients.length, orders.length]);

  const orderData: TOrder | undefined = orders.find(
    (order) => order.number.toString() === number
  );

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || loading) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
