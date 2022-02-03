import React, { useMemo } from "react";
import { ApolloError } from "@apollo/client";
import { styled } from "baseui";
import { Notification, KIND } from "baseui/notification";
import { Pagination } from "baseui/pagination";
import { StyledLink } from "baseui/link";
import { Card, StyledBody, StyledAction } from "baseui/card";
import {Spinner} from 'baseui/spinner';
import { Input, SIZE as InputSize } from "baseui/input";
import { Search } from "baseui/icon";
import { Link } from "react-router-dom";

export interface Props {
  loading: boolean;
  data: PeopleResult | undefined;
  page: number;
  setPage(page: number): void;
  error: ApolloError | undefined;
  name: string;
  setName(text: string): void;
}

export const ContentDiv = styled("div", {
  width: "80%",
  margin: "10px",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "center",
});

export const Container = styled("div", () => {
  return {

    marginTop: "10px",
  };
});

export const CenterEl = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
});

const PeoplePage: React.FunctionComponent<Props> = ({
  data,
  page,
  loading,
  setPage = () => {},
  error,
  name,
  setName = () => {},
}) => {
  

  const peopleCardsRender = useMemo(()=>{
    const getId = (index: number) => {
        return 10 * page - 10 + (index + 1);
      };
      return data?.fetchPeople?.results?.map((person, index) => (
        <div key={index}>
          <Card
            overrides={{ Root: { style: { width: "328px", margin: '10px' } } }}
            title={person.name}
          >
            <StyledAction>
              <Link to={`/${getId(index)}`}>
                <StyledLink>Details</StyledLink>
              </Link>
            </StyledAction>
          </Card>
        </div>
      ))
  },[data?.fetchPeople?.results, page])

  return (
    <Container>
      <CenterEl>
        <Input
          value={name}
          onChange={({
            target: { value },
          }: React.ChangeEvent<HTMLInputElement>) => setName(value)}
          startEnhancer={<Search size="18px" />}
          placeholder="Search For A Character"
          overrides={{
            Root: {
              style: { width: "35%", marginTop: "10px", marginBottom: "10px" },
            },
          }}
          size={InputSize.default}
          clearable
          clearOnEscape
        />
      </CenterEl>

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

      {loading && <CenterEl><Spinner size={96}/></CenterEl>}
      {!loading && (
        <CenterEl>
            <ContentDiv>
          {peopleCardsRender}
        </ContentDiv>

        </CenterEl>
        
      )}
      <CenterEl>
      <Pagination
                numPages={Math.ceil((data?.fetchPeople?.count || 82) / 10)}
                currentPage={page}
                onPageChange={({ nextPage }) => {
                    setPage(
                        Math.min(Math.max(nextPage, 1), data?.fetchPeople?.count || 0)
                    );
                }}
            />
      </CenterEl>
      
    </Container>
  );
};

export default PeoplePage;
