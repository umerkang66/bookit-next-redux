import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

export const useActions = () => {
  const dispatch = useDispatch();
  // bindActionCreators will bind all the actionCreators, and when we will call the these action creators, the return values will be automatically passed from the dispatch function
  return useMemo(
    () => bindActionCreators(actionCreators, dispatch),
    [dispatch]
  );
};
