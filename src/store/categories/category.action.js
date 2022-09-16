import { createAction } from '../../utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPE } from './category.types';
import { getCategoriesAndDocument } from '../../utils/firebase/firebase.util';

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = categoriesArray =>
  createAction(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailure = error =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => {
  return async dispatch => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategoriesAndDocument('categories');
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error));
    }
  };
};
