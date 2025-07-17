import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Chip,
  Box,
  Typography
} from '@mui/material';
import { Star, ForkRight } from '@mui/icons-material';
import { formatDate, formatNumber } from '@/shared/lib';
import type { GitHubRepository, SortField, SortDirection } from '@/shared/types';
import styles from './RepositoryTable.module.scss';

/**
 * Интерфейс колонки таблицы
 */
interface Column {
  id: SortField | 'name' | 'language';
  label: string;
  sortable: boolean;
  align?: 'left' | 'center' | 'right';
}

/**
 * Колонки таблицы
 */
const columns: Column[] = [
  { id: 'name', label: 'Название', sortable: false },
  { id: 'language', label: 'Язык', sortable: false },
  { id: 'FORKS', label: 'Число форков', sortable: true, align: 'center' },
  { id: 'STARS', label: 'Число звезд', sortable: true, align: 'center' },
  { id: 'UPDATED_AT', label: 'Дата обновления', sortable: true, align: 'center' },
];

/**
 * Пропсы для компонента таблицы репозиториев
 */
interface RepositoryTableProps {
  /** Список репозиториев */
  repositories: GitHubRepository[];
  /** Выбранный репозиторий */
  selectedRepository?: GitHubRepository | null;
  /** Обработчик выбора репозитория */
  onRepositorySelect: (repository: GitHubRepository) => void;
  /** Текущее поле сортировки */
  sortField: SortField;
  /** Текущее направление сортировки */
  sortDirection: SortDirection;
  /** Обработчик изменения сортировки */
  onSortChange: (field: SortField, direction: SortDirection) => void;
}

/**
 * Компонент таблицы репозиториев
 */
export function RepositoryTable({
  repositories,
  selectedRepository,
  onRepositorySelect,
  sortField,
  sortDirection,
  onSortChange,
}: RepositoryTableProps) {
  /**
   * Обработчик клика по заголовку для сортировки
   */
  const handleSortClick = (field: SortField) => {
    const isCurrentField = sortField === field;
    const newDirection = isCurrentField && sortDirection === 'ASC' ? 'DESC' : 'ASC';
    onSortChange(field, newDirection);
  };

  /**
   * Обработчик клика по строке таблицы
   */
  const handleRowClick = (repository: GitHubRepository) => {
    onRepositorySelect(repository);
  };

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table className={styles.table}>
        <TableHead>
          <TableRow className={styles.headerRow}>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || 'left'}
                className={styles.headerCell}
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={sortField === column.id}
                    direction={sortField === column.id ? sortDirection.toLowerCase() as 'asc' | 'desc' : 'asc'}
                    onClick={() => handleSortClick(column.id as SortField)}
                    className={styles.sortLabel}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {repositories.map((repository) => (
            <TableRow
              key={repository.id}
              hover
              onClick={() => handleRowClick(repository)}
              selected={selectedRepository?.id === repository.id}
              className={styles.tableRow}
            >
              <TableCell className={styles.nameCell}>
                <Typography variant="body2" className={styles.repositoryName}>
                  {repository.nameWithOwner}
                </Typography>
              </TableCell>
              
              <TableCell>
                {repository.primaryLanguage ? (
                  <Chip
                    label={repository.primaryLanguage.name}
                    size="small"
                    sx={{
                      backgroundColor: repository.primaryLanguage.color,
                      color: 'white',
                      fontSize: '0.75rem',
                    }}
                  />
                ) : (
                  '—'
                )}
              </TableCell>
              
              <TableCell align="center">
                <Box className={styles.statCell}>
                  <ForkRight fontSize="small" />
                  <Typography variant="body2">
                    {formatNumber(repository.forkCount)}
                  </Typography>
                </Box>
              </TableCell>
              
              <TableCell align="center">
                <Box className={styles.statCell}>
                  <Star fontSize="small" />
                  <Typography variant="body2">
                    {formatNumber(repository.stargazerCount)}
                  </Typography>
                </Box>
              </TableCell>
              
              <TableCell align="center">
                <Typography variant="body2">
                  {formatDate(repository.updatedAt)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
