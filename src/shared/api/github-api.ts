import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { 
  GitHubRepository, 
  GitHubSearchResponse, 
  SearchParams 
} from '../types/github';

/**
 * GraphQL запрос для поиска репозиториев
 */
const SEARCH_REPOSITORIES_QUERY = `
  query SearchRepositories(
    $query: String!
    $first: Int
    $after: String
    $orderBy: SearchResultItemOrder
  ) {
    search(
      query: $query
      type: REPOSITORY
      first: $first
      after: $after
      orderBy: $orderBy
    ) {
      repositoryCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      nodes {
        ... on Repository {
          id
          name
          nameWithOwner
          description
          primaryLanguage {
            name
            color
          }
          stargazerCount
          forkCount
          updatedAt
          license {
            name
            key
          }
          url
        }
      }
    }
  }
`;

/**
 * API для работы с GitHub GraphQL API с использованием RTK Query
 */
export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/graphql',
    prepareHeaders: (headers) => {
      // GitHub токен должен быть установлен через переменные окружения
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('content-type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Repository'],
  endpoints: (builder) => ({
    /**
     * Поиск репозиториев GitHub
     * @param params - параметры поиска
     * @returns результаты поиска репозиториев
     */
    searchRepositories: builder.query<GitHubSearchResponse, SearchParams>({
      query: (params) => ({
        url: '',
        method: 'POST',
        body: {
          query: SEARCH_REPOSITORIES_QUERY,
          variables: {
            query: params.query,
            first: params.first || 10,
            after: params.after,
            orderBy: params.orderBy ? {
              field: params.orderBy.field,
              direction: params.orderBy.direction,
            } : undefined,
          },
        },
      }),
      transformResponse: (response: { data: GitHubSearchResponse }) => response.data,
      providesTags: ['Repository'],
    }),
  }),
});

/**
 * Хук для поиска репозиториев
 */
export const { useSearchRepositoriesQuery } = githubApi;
