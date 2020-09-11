import { gql } from 'graphql.macro';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Endpoint = {
  __typename?: 'Endpoint';
  host: Scalars['String'];
  port: Scalars['Int'];
};

export type Lab = {
  __typename?: 'Lab';
  name: Scalars['String'];
  resource: Scalars['String'];
  endpoints: Array<Endpoint>;
};

export type LabCategory = {
  __typename?: 'LabCategory';
  name: Scalars['String'];
  labs: Array<Lab>;
};

export type Practice = {
  __typename?: 'Practice';
  labCategories: Array<LabCategory>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  practice: Practice;
};

export type EndpointFragment = (
  { __typename?: 'Endpoint' }
  & Pick<Endpoint, 'host' | 'port'>
);

export type LabFragment = (
  { __typename?: 'Lab' }
  & Pick<Lab, 'name' | 'resource'>
  & { endpoints: Array<(
    { __typename?: 'Endpoint' }
    & EndpointFragment
  )> }
);

export type LabCategoryFragment = (
  { __typename?: 'LabCategory' }
  & Pick<LabCategory, 'name'>
  & { labs: Array<(
    { __typename?: 'Lab' }
    & LabFragment
  )> }
);

export type PracticeFragment = (
  { __typename?: 'Practice' }
  & { labCategories: Array<(
    { __typename?: 'LabCategory' }
    & LabCategoryFragment
  )> }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type PracticesQueryVariables = Exact<{ [key: string]: never; }>;


export type PracticesQuery = (
  { __typename?: 'Query' }
  & { practice: (
    { __typename?: 'Practice' }
    & PracticeFragment
  ) }
);

export const EndpointFragmentDoc = gql`
    fragment Endpoint on Endpoint {
  host
  port
}
    `;
export const LabFragmentDoc = gql`
    fragment Lab on Lab {
  name
  resource
  endpoints {
    ...Endpoint
  }
}
    ${EndpointFragmentDoc}`;
export const LabCategoryFragmentDoc = gql`
    fragment LabCategory on LabCategory {
  name
  labs {
    ...Lab
  }
}
    ${LabFragmentDoc}`;
export const PracticeFragmentDoc = gql`
    fragment Practice on Practice {
  labCategories {
    ...LabCategory
  }
}
    ${LabCategoryFragmentDoc}`;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const PracticesDocument = gql`
    query Practices {
  practice {
    ...Practice
  }
}
    ${PracticeFragmentDoc}`;

/**
 * __usePracticesQuery__
 *
 * To run a query within a React component, call `usePracticesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePracticesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePracticesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePracticesQuery(baseOptions?: Apollo.QueryHookOptions<PracticesQuery, PracticesQueryVariables>) {
        return Apollo.useQuery<PracticesQuery, PracticesQueryVariables>(PracticesDocument, baseOptions);
      }
export function usePracticesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PracticesQuery, PracticesQueryVariables>) {
          return Apollo.useLazyQuery<PracticesQuery, PracticesQueryVariables>(PracticesDocument, baseOptions);
        }
export type PracticesQueryHookResult = ReturnType<typeof usePracticesQuery>;
export type PracticesLazyQueryHookResult = ReturnType<typeof usePracticesLazyQuery>;
export type PracticesQueryResult = Apollo.QueryResult<PracticesQuery, PracticesQueryVariables>;