'use client';

import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Alert, 
  CircularProgress, 
  Typography,
  Paper 
} from '@mui/material';
import { RepositoryTable, RepositoryDetails } from '@/entities/repository';
import { SearchForm } from '@/features/search-repositories';
import { Pagination } from '@/features/pagination';
import { useSearchRepositoriesQuery } from '@/shared/api';
import type { GitHubRepository, SortField, SortDirection } from '@/shared/types';
import styles from './RepositoryList.module.scss';

/**
 * Компонент списка репозиториев с поиском, сортировкой и пагинацией
 */
export function RepositoryList() {
  // Состояние поиска и фильтров
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('STARS');
  const [sortDirection, setSortDirection] = useState<SortDirection>('DESC');
  const [pageSize, setPageSize] = useState(10);
  const [afterCursor, setAfterCursor] = useState<string | undefined>();
  const [selectedRepository, setSelectedRepository] = useState<GitHubRepository | null>(null);

  // Запрос к API
  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useSearchRepositoriesQuery({
    query: searchQuery,
    first: pageSize,
    after: afterCursor,
    orderBy: {
      field: sortField,
      direction: sortDirection,
    },
  }, {
    skip: !searchQuery,
  });

  /**
   * Обработчик поиска репозиториев
   */
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setAfterCursor(undefined);
    setSelectedRepository(null);
  }, []);

  /**
   * Обработчик изменения поля сортировки
   */
  const handleSortFieldChange = useCallback((field: SortField) => {
    setSortField(field);
    setAfterCursor(undefined);
  }, []);

  /**
   * Обработчик изменения направления сортировки
   */
  const handleSortDirectionChange = useCallback((direction: SortDirection) => {
    setSortDirection(direction);
    setAfterCursor(undefined);
  }, []);

  /**
   * Обработчик перехода на следующую страницу
   */
  const handleNextPage = useCallback(() => {
    if (data?.search.pageInfo.endCursor) {
      setAfterCursor(data.search.pageInfo.endCursor);
    }
  }, [data?.search.pageInfo.endCursor]);

  /**
   * Обработчик перехода на предыдущую страницу
   */
  const handlePreviousPage = useCallback(() => {
    // В GraphQL API GitHub для возврата назад нужно делать новый запрос
    // Для упрощения реализации просто сбрасываем курсор
    setAfterCursor(undefined);
  }, []);

  /**
   * Обработчик изменения размера страницы
   */
  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setAfterCursor(undefined);
  }, []);

  /**
   * Обработчик выбора репозитория
   */
  const handleRepositorySelect = useCallback((repository: GitHubRepository) => {
    setSelectedRepository(repository);
  }, []);

  const hasResults = !!(data && data.search.nodes.length > 0);

  return (
    <>
      <SearchForm 
        onSearch={handleSearch}
        loading={isLoading}
        initialValue={searchQuery}
      />

      <Box className={styles.container}>
        {!searchQuery && (
          <Box className={styles.welcomeBox}>
            <Typography className={styles.bigTitle}>Добро пожаловать</Typography>
          </Box>
        )}

        {searchQuery && (
          <>
            <Box className={styles.resultsTitleBox}>
              <Typography className={styles.bigTitle}>
                {hasResults ? 'Результаты поиска' : ''}
              </Typography>
            </Box>

            <Box className={styles.fullScreenContent}>
              <Box className={styles.leftPanel}>
                {isError && (
                  <Alert severity="error" className={styles.error}>
                    Ошибка при загрузке данных. Проверьте подключение к интернету и токен GitHub.
                  </Alert>
                )}

                {isLoading && (
                  <Box className={styles.loading}>
                    <CircularProgress />
                    <Typography>Поиск репозиториев...</Typography>
                  </Box>
                )}

                {data && data.search.nodes.length === 0 && (
                  <Paper className={styles.noResults}>
                    <Typography variant="h6">
                      Репозитории не найдены
                    </Typography>
                    <Typography color="textSecondary">
                      Попробуйте изменить поисковый запрос
                    </Typography>
                  </Paper>
                )}

                {hasResults && (
                  <>
                    <RepositoryTable
                      repositories={data.search.nodes}
                      selectedRepository={selectedRepository}
                      onRepositorySelect={handleRepositorySelect}
                      sortField={sortField}
                      sortDirection={sortDirection}
                      onSortChange={(field, direction) => {
                        handleSortFieldChange(field);
                        handleSortDirectionChange(direction);
                      }}
                    />

                    <Pagination
                      hasNextPage={data.search.pageInfo.hasNextPage}
                      hasPreviousPage={!!afterCursor}
                      pageSize={pageSize}
                      totalCount={data.search.repositoryCount}
                      onNextPage={handleNextPage}
                      onPreviousPage={handlePreviousPage}
                      onPageSizeChange={handlePageSizeChange}
                      loading={isLoading}
                    />
                  </>
                )}
              </Box>

              <Box className={styles.rightPanel}>
                <RepositoryDetails repository={selectedRepository} />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
