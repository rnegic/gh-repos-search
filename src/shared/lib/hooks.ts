import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../config/store';

/**
 * Типизированный хук useDispatch для использования с Redux store
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Типизированный хук useSelector для использования с Redux store
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
