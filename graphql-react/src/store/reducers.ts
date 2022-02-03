import { LOADING } from './actionTypes'

interface LoadState{
    loading:boolean
}

const initialState: LoadState = {
   loading: false
}


const reducer =  (state = initialState, action: Action): LoadState=>{

    switch(action.type){
        case LOADING:
            return{
                ...state,
                loading: action.loading
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer