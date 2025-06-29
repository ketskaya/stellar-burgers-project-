import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/feed';
import { fetchIngredients } from '../../services/slices/ingredients';
import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.feed.orders);
  const loading = useSelector((state) => state.feed.loading);

  useEffect(() => {
    dispatch(fetchUserOrders());
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (loading) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
