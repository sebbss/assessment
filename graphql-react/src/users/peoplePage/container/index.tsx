import { useQuery } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { load } from '../../../store/actions';
import { GET_ALL_PEOPLE } from '../../graphql-tasks';
import PeoplePage from '../component';

const PeopleContainer: React.FC = ()=> {
    const[page, setPage] = useState(1)
    const[name, setName] = useState("")

    const dispatch = useDispatch()

    const {data, loading, error} = useQuery<PeopleResult,{page:number, name:string}>(GET_ALL_PEOPLE,{
        variables:{
            page,
            name:name.trim().length ? name.trim(): ""
        }
    })
    useCallback(()=>{
        dispatch(load(loading))
    },[loading, dispatch])


  return (
      <PeoplePage
      data={data}
      error={error}
      setPage={setPage}
      name={name}
      page={page}
      loading={loading}
      setName={setName}/>
  )
}

export default PeopleContainer;
