import { ApolloError } from '@apollo/client'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from "react-test-renderer"
import PeoplePage, { ContentDiv } from '../component'
import { GET_ALL_PEOPLE } from '../../graphql-tasks';
import { Notification } from 'baseui/notification';

describe("PeoplePage should render correctly", ()=>{
    it("should render without crushing", ()=>{
        const component = TestRenderer.create(
            <Router>
                <MockedProvider mocks={[]} addTypename={false}>
                    <PeoplePage 
                    data = {{fetchPeople: {results: [{name: "test", gender: "male", height:"20", mass: "90", homeworld: "http://google.com"}], count: 1}}}
                    loading={false}
                    error={new ApolloError({ networkError: new Error("error message") })}
                    page={1}
                    setName={()=>{}}
                    name={"test"}
                    setPage={()=>{}}
                    />

                 </MockedProvider>
            </Router>
            
        )
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
        expect(tree).toBeDefined()
    })

    it("should display error notification", async ()=>{
        const mock = {
            request: {
              query: GET_ALL_PEOPLE,
              variables: { name: 'test' },
            },
            error: new Error('An error occurred'),
          };
        const component = TestRenderer.create(
            <Router>
                <MockedProvider mocks={[mock]} addTypename={false}>
                    <PeoplePage 
                    data = {undefined}
                    loading={false}
                    error={new ApolloError({ networkError: new Error("error message") })}
                    page={1}
                    setName={()=>{}}
                    name={"test"}
                    setPage={()=>{}}
                    />

                 </MockedProvider>
            </Router>
            )
        
        const [notification] =await component.root.findAllByType(Notification);
        expect(notification).toBeDefined();
        expect(notification.props.children()).toBe("error message")
    })

    it("should render people content", async()=>{
        const mock = {
            request: {
              query: GET_ALL_PEOPLE,
              variables: {  },
            },
            result:{
                data: {fetchPeople: {results: [{name: "test", gender: "male", height:"10", mass: "90", homeworld: "http://google.com"}], count: 1}}
            }
          }; 
        
        const component = TestRenderer.create(
            <Router>
                <MockedProvider mocks={[mock]} addTypename={false}>
                    <PeoplePage 
                    data = {undefined}
                    loading={false}
                    error={new ApolloError({ networkError: new Error("error message") })}
                    page={1}
                    setName={()=>{}}
                    name={"test"}
                    setPage={()=>{}}
                    />

                 </MockedProvider>
            </Router>
        )
        const [card] = await component.root.findAllByType(ContentDiv)
        expect(card.children.length).toBe(1)
    })
})