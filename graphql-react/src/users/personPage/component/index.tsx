import { ApolloError } from '@apollo/client';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom'
import {Button} from "baseui/button"
import { ArrowLeft, Spinner } from 'baseui/icon';
import { Container,CenterEl } from '../../peoplePage/component';
import { Card, StyledBody } from 'baseui/card';
import { StyledLink } from 'baseui/link';
import { Notification } from 'baseui/notification';
import { KIND } from "baseui/toast"


interface Props{
    loading: boolean,
    data: PersonResult| undefined
    error: ApolloError | undefined
}

const PersonPage: React.FC<Props> = ({
    loading,
    data,
    error
}) =>{
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate('/')
    }
    
    const BackButton = ()=>{
        return(
            
            <Button
            overrides={{ Root: { style: {marginLeft:"5%", borderRadius:"5px" } } }}
             onClick={handleClick} startEnhancer={()=><ArrowLeft size={24}/>}>Back</Button>
        )

    }
    const PersonCard = useMemo(()=>{
        return(
            <Card
            overrides={{ Root: { style: { width: "500px", margin: '10px' } } }}
            title={data?.person?.name}
          >
              <StyledBody>
                    <p> Height: {data?.person?.height + ' meters'} </p>
                    <p>Gender: {data?.person?.gender}</p>
                    <p>Mass: {data?.person?.mass}</p>
                    <p>Homeworld: {data?.person?.homeworld}</p>
            </StyledBody>

            </Card>
        )
    },[data])
    return(
    <Container>
        <BackButton/>
        {error && (
        <Notification
          overrides={{
            Body: { style: { width: "auto" } },
          }}
          kind={KIND.negative}
          closeable
        >
          {() => error?.message || "Something went wrong there"}
        </Notification>
      )}
        <CenterEl>

        {loading ? <Spinner size={96}/> : PersonCard}
       
        </CenterEl>
    </Container>)

}

export default PersonPage
