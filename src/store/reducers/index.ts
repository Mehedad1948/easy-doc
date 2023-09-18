import { combineReducers } from 'redux';
import cellsReducers from './cellsReducer';

const reducers = combineReducers({
  cells: cellsReducers,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
//  to have the type for using in useSelector