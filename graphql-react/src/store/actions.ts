import {LOADING} from './actionTypes'

export const load = (loading:boolean)=>{
    return{
        type: LOADING,
        loading
    }
}