import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema, GraphQLInt } from 'graphql';
import axios from 'axios';  
  
  const BASE_URL = 'https://swapi.dev/api';

 async function fetchResponseByURL(relativeURL) {
    return axios.get(`${BASE_URL}${relativeURL}`)
   
  }
  
  
  function fetchPersonByURL(relativeURL) {
    return fetchResponseByURL(relativeURL)
    .then(json => json.data)
    .catch(error=>console.log(error))
  }
  

  function fetchPeople(name="", page=1){
    return fetchResponseByURL(`/people/?search=${name}&page=${page}`)
    .then(json => json.data)
    .catch(error=>console.log(error))
  }

  const PersonType = new GraphQLObjectType({
    name :'Person',
    fields: () => ({
     
    name :{
        type: GraphQLString
    },
    height: {
    type: GraphQLString
    },
    mass :{
    type: GraphQLString
    },
    gender :{
        type: GraphQLString
    },
    homeworld :{
        type: GraphQLString
    },
    }),
  });

  const PeopleType = new GraphQLObjectType({
    name: 'People',
    fields: ()=>({
      count:{
        type: GraphQLString
      },
      results:{
        type: new GraphQLList(PersonType),
      }
    })
  })
  
  const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      
      person: {
        type: PersonType,
        args: {
          id: { type: GraphQLString },
        },
        resolve: (root, args) => fetchPersonByURL(`/people/${args.id}/`),
      },
  
      fetchPeople: {
        type: PeopleType,
        args: {
          name: { type: GraphQLString },
          page: {type: GraphQLInt}
        },
        resolve: (root, args) => fetchPeople(args.name, args.page),
      }

    }),
  });
  
  export default new GraphQLSchema({
    query: QueryType,
  });
