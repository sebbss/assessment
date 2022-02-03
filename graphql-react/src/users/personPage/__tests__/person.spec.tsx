import React from 'react';
import TestRenderer from 'react-test-renderer'
import { BrowserRouter as Router} from 'react-router-dom'
import PersonPage from '../component';
import { ApolloError } from '@apollo/client';
import { Spinner } from 'baseui/icon';

describe("PersonPage should render correctly",()=>{
    it("should render without crushing", ()=>{
        const component = TestRenderer.create(
            <Router>
                <PersonPage
                data={undefined}
                error={new ApolloError({networkError: new Error("error message")})}
                loading={false}
                />
            </Router>
        )
        expect(component.toJSON()).toMatchSnapshot()
        expect(component.toJSON()).toBeDefined()
    })

    it("should show loader", async ()=>{
        const component = TestRenderer.create(
            <Router>
                <PersonPage
                data={undefined}
                error={new ApolloError({networkError: new Error("error message")})}
                loading={true}
                />
            </Router>
        )
        const loader = await component.root.findByType(Spinner)
        expect(loader).toBeDefined()
    })
})
