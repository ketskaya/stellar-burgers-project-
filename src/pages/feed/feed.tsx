import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feed';
import { fetchIngredients } from '../../services/slices/ingredients';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.feed);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(fetchFeeds());
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
    dispatch(fetchIngredients());
  };

  if (loading) {
    return <Preloader />;
  }

  if (showError && error) {
    return (
      <div className='text text_type_main-medium text_color_error' role='alert'>
        {error}
      </div>
    );
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
