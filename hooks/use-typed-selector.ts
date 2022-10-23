import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../state';

// Rather than using "useSelector", we have to use "useTypedSelector", that has RootState applied to it
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
