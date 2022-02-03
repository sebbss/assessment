import { useQuery } from '@apollo/client';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { load } from '../../../store/actions';
import { GET_ONE_PERSON } from '../../graphql-tasks';
import PersonPage from '../component';

const PersonContainer: React.FC=() =>{

    const dispatch = useDispatch()
    const {id} = useParams<{id:string}>()

    

    const {loading, data, error} = useQuery<PersonResult, {id?: string}>(GET_ONE_PERSON,{
        variables:{
            id
        }
    })
    
    useCallback(()=>{
        dispatch(load(loading))
    },[loading, dispatch])

    return(<PersonPage 
        data={data}
        error={error}
        loading={loading}/>)
}

export default PersonContainer
