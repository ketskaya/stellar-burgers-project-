import { FC, ReactElement } from 'react';
import { useSelector } from '../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type TProps = {
  children: ReactElement;
};

export const ProtectedRoute: FC<TProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isAuthChecked } = useSelector((state) => state.user);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return children;
};
