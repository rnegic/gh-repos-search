import React from 'react';
import { 
  Box, 
  IconButton, 
  Typography, 
  FormControl, 
  Select, 
  MenuItem,
  Paper 
} from '@mui/material';
import { 
  NavigateBefore, 
  NavigateNext 
} from '@mui/icons-material';
import styles from './Pagination.module.scss';

/**
 * Пропсы для компонента пагинации
 */
interface PaginationProps {
  /** Есть ли следующая страница */
  hasNextPage: boolean;
  /** Есть ли предыдущая страница */
  hasPreviousPage: boolean;
  /** Текущий размер страницы */
  pageSize: number;
  /** Общее количество результатов */
  totalCount?: number;
  /** Текущая страница (для отображения) */
  currentPage?: number;
  /** Обработчик перехода на следующую страницу */
  onNextPage: () => void;
  /** Обработчик перехода на предыдущую страницу */
  onPreviousPage: () => void;
  /** Обработчик изменения размера страницы */
  onPageSizeChange: (size: number) => void;
  /** Флаг загрузки */
  loading?: boolean;
}

/**
 * Доступные размеры страниц
 */
const PAGE_SIZE_OPTIONS = [10, 20, 50];

/**
 * Компонент пагинации для списка репозиториев
 */
export function Pagination({
  hasNextPage,
  hasPreviousPage,
  pageSize,
  totalCount,
  currentPage = 1,
  onNextPage,
  onPreviousPage,
  onPageSizeChange,
  loading = false,
}: PaginationProps) {
  /**
   * Обработчик изменения размера страницы
   */
  const handlePageSizeChange = (event: any) => {
    onPageSizeChange(Number(event.target.value));
  };

  /**
   * Формирует текст с информацией о страницах
   */
  const getPageInfo = () => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount || 0);
    return `${start}-${end} of ${totalCount || 0}`;
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.info}>
        <Typography variant="body2" className={styles.label}>
          Rows per page:
        </Typography>
        <FormControl size="small" className={styles.select}>
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            disabled={loading}
            className={styles.selectInput}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="body2" className={styles.pageInfo}>
        {getPageInfo()}
      </Typography>

      <Box className={styles.controls}>
        <IconButton
          onClick={onPreviousPage}
          disabled={!hasPreviousPage || loading}
          className={styles.navButton}
          size="small"
        >
          <NavigateBefore />
        </IconButton>

        <IconButton
          onClick={onNextPage}
          disabled={!hasNextPage || loading}
          className={styles.navButton}
          size="small"
        >
          <NavigateNext />
        </IconButton>
      </Box>
    </Box>
  );
}
