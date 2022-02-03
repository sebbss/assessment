import {gql} from '@apollo/client/core'


export const GET_ALL_PEOPLE = gql`
query fetchPeople($page: Int, $name: String!){
    fetchPeople(page: $page, name: $name) {
        count
        results{
            name
            height
            gender
            mass
            homeworld
        }
        
    }
}

`;

export const GET_ONE_PERSON = gql`
query person($id: String){
    person(id: $id) {
        name
        height
        gender
        mass
        homeworld
    }
}

`;

