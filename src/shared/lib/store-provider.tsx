'use client';

import { Provider } from 'react-redux';
import { store } from '../config/store';

/**
 * Провайдер Redux store для приложения
 * @param children - дочерние компоненты
 */
export function StoreProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <Provider store={store}>{children}</Provider>;
}
