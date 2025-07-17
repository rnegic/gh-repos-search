/**
 * Интерфейс для репозитория GitHub
 */
export interface GitHubRepository {
  /** Уникальный идентификатор репозитория */
  id: string;
  /** Название репозитория */
  name: string;
  /** Полное название репозитория (включает владельца) */
  nameWithOwner: string;
  /** Описание репозитория */
  description?: string;
  /** Основной язык программирования */
  primaryLanguage?: {
    name: string;
    color: string;
  };
  /** Количество звезд */
  stargazerCount: number;
  /** Количество форков */
  forkCount: number;
  /** Дата последнего обновления */
  updatedAt: string;
  /** Информация о лицензии */
  license?: {
    name: string;
    key: string;
  };
  /** URL репозитория */
  url: string;
}

/**
 * Интерфейс для ответа поиска репозиториев GitHub
 */
export interface GitHubSearchResponse {
  /** Поисковый запрос */
  search: {
    /** Общее количество найденных репозиториев */
    repositoryCount: number;
    /** Список найденных репозиториев */
    nodes: GitHubRepository[];
    /** Информация о пагинации */
    pageInfo: {
      /** Есть ли следующая страница */
      hasNextPage: boolean;
      /** Есть ли предыдущая страница */
      hasPreviousPage: boolean;
      /** Курсор для следующей страницы */
      endCursor?: string;
      /** Курсор для предыдущей страницы */
      startCursor?: string;
    };
  };
}

/**
 * Параметры поиска репозиториев
 */
export interface SearchParams {
  /** Поисковый запрос */
  query: string;
  /** Количество результатов на странице */
  first?: number;
  /** Курсор для пагинации */
  after?: string;
  /** Поле для сортировки */
  orderBy?: {
    field: 'STARS' | 'FORKS' | 'UPDATED_AT';
    direction: 'ASC' | 'DESC';
  };
}

/**
 * Возможные поля для сортировки
 */
export type SortField = 'STARS' | 'FORKS' | 'UPDATED_AT';

/**
 * Направление сортировки
 */
export type SortDirection = 'ASC' | 'DESC';
