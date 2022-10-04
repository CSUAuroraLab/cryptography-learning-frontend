import { gql } from 'graphql.macro';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  id: Scalars['String'];
  wsEndpoints: Array<Endpoint>;
  tcpEndpoints: Array<Endpoint>;
  resources: Array<ResourceWithTranslation>;
};

export type LabCategory = {
  __typename?: 'LabCategory';
  id: Scalars['String'];
  name: Array<Translation>;
  labs: Array<Lab>;
};

export type LabInstance = {
  __typename?: 'LabInstance';
  lang: Scalars['String'];
  name: Scalars['String'];
  content: Scalars['String'];
  wsEndpoints: Array<Endpoint>;
  tcpEndpoints: Array<Endpoint>;
};

export type Practice = {
  __typename?: 'Practice';
  labCategories: Array<LabCategory>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  practice: Practice;
  lab: LabInstance;
};


export type QueryLabArgs = {
  categoryId: Scalars['String'];
  labId: Scalars['String'];
  language?: Maybe<Scalars['String']>;
};

export type ResourceWithTranslation = {
  __typename?: 'ResourceWithTranslation';
  lang: Scalars['String'];
  name: Scalars['String'];
};

export type Translation = {
  __typename?: 'Translation';
  lang: Scalars['String'];
  text: Scalars['String'];
};

export type EndpointFragment = (
  { __typename?: 'Endpoint' }
  & Pick<Endpoint, 'host' | 'port'>
);

export type LabWithEndpointFragment = (
  { __typename?: 'Lab' }
  & Pick<Lab, 'id'>
  & { wsEndpoints: Array<(
    { __typename?: 'Endpoint' }
    & EndpointFragment
  )>, tcpEndpoints: Array<(
    { __typename?: 'Endpoint' }
    & EndpointFragment
  )>, resources: Array<(
    { __typename?: 'ResourceWithTranslation' }
    & ResourceWithTranslationFragment
  )> }
);

export type LabCategoryFragment = (
  { __typename?: 'LabCategory' }
  & Pick<LabCategory, 'id'>
  & { name: Array<(
    { __typename?: 'Translation' }
    & TranslationFragment
  )>, labs: Array<(
    { __typename?: 'Lab' }
    & LabWithEndpointFragment
  )> }
);

export type PracticeFragment = (
  { __typename?: 'Practice' }
  & { labCategories: Array<(
    { __typename?: 'LabCategory' }
    & LabCategoryFragment
  )> }
);

export type LabInstanceFragment = (
  { __typename?: 'LabInstance' }
  & Pick<LabInstance, 'lang' | 'name' | 'content'>
  & { wsEndpoints: Array<(
    { __typename?: 'Endpoint' }
    & EndpointFragment
  )>, tcpEndpoints: Array<(
    { __typename?: 'Endpoint' }
    & EndpointFragment
  )> }
);

export type ResourceWithTranslationFragment = (
  { __typename?: 'ResourceWithTranslation' }
  & Pick<ResourceWithTranslation, 'lang' | 'name'>
);

export type TranslationFragment = (
  { __typename?: 'Translation' }
  & Pick<Translation, 'lang' | 'text'>
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

export type LabQueryVariables = Exact<{
  categoryId: Scalars['String'];
  labId: Scalars['String'];
  language?: Maybe<Scalars['String']>;
}>;


export type LabQuery = (
  { __typename?: 'Query' }
  & { lab: (
    { __typename?: 'LabInstance' }
    & LabInstanceFragment
  ) }
);

export const TranslationFragmentDoc = gql`
    fragment Translation on Translation {
  lang
  text
}
    `;
export const EndpointFragmentDoc = gql`
    fragment Endpoint on Endpoint {
  host
  port
}
    `;
export const ResourceWithTranslationFragmentDoc = gql`
    fragment ResourceWithTranslation on ResourceWithTranslation {
  lang
  name
}
    `;
export const LabWithEndpointFragmentDoc = gql`
    fragment LabWithEndpoint on Lab {
  id
  wsEndpoints {
    ...Endpoint
  }
  tcpEndpoints {
    ...Endpoint
  }
  resources {
    ...ResourceWithTranslation
  }
}
    ${EndpointFragmentDoc}
${ResourceWithTranslationFragmentDoc}`;
export const LabCategoryFragmentDoc = gql`
    fragment LabCategory on LabCategory {
  id
  name {
    ...Translation
  }
  labs {
    ...LabWithEndpoint
  }
}
    ${TranslationFragmentDoc}
${LabWithEndpointFragmentDoc}`;
export const PracticeFragmentDoc = gql`
    fragment Practice on Practice {
  labCategories {
    ...LabCategory
  }
}
    ${LabCategoryFragmentDoc}`;
export const LabInstanceFragmentDoc = gql`
    fragment LabInstance on LabInstance {
  lang
  name
  content
  wsEndpoints {
    ...Endpoint
  }
  tcpEndpoints {
    ...Endpoint
  }
}
    ${EndpointFragmentDoc}`;
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
export function useHelloQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = ApolloReactCommon.QueryResult<HelloQuery, HelloQueryVariables>;
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
export function usePracticesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PracticesQuery, PracticesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PracticesQuery, PracticesQueryVariables>(PracticesDocument, options);
      }
export function usePracticesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PracticesQuery, PracticesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PracticesQuery, PracticesQueryVariables>(PracticesDocument, options);
        }
export type PracticesQueryHookResult = ReturnType<typeof usePracticesQuery>;
export type PracticesLazyQueryHookResult = ReturnType<typeof usePracticesLazyQuery>;
export type PracticesQueryResult = ApolloReactCommon.QueryResult<PracticesQuery, PracticesQueryVariables>;
export const LabDocument = gql`
    query Lab($categoryId: String!, $labId: String!, $language: String) {
  lab(categoryId: $categoryId, labId: $labId, language: $language) {
    ...LabInstance
  }
}
    ${LabInstanceFragmentDoc}`;

/**
 * __useLabQuery__
 *
 * To run a query within a React component, call `useLabQuery` and pass it any options that fit your needs.
 * When your component renders, `useLabQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLabQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      labId: // value for 'labId'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useLabQuery(baseOptions: ApolloReactHooks.QueryHookOptions<LabQuery, LabQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LabQuery, LabQueryVariables>(LabDocument, options);
      }
export function useLabLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LabQuery, LabQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LabQuery, LabQueryVariables>(LabDocument, options);
        }
export type LabQueryHookResult = ReturnType<typeof useLabQuery>;
export type LabLazyQueryHookResult = ReturnType<typeof useLabLazyQuery>;
export type LabQueryResult = ApolloReactCommon.QueryResult<LabQuery, LabQueryVariables>;