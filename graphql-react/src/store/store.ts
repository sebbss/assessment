import { createStore, combineReducers } from "redux"

import reducer from './reducers'

export const rootReducer = combineReducers({
    loading :reducer
})

export type LoadingState = ReturnType< typeof rootReducer> 


export default createStore(rootReducer)
