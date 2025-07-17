'use client';

import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Paper,
  InputAdornment 
} from '@mui/material';
import { Search } from '@mui/icons-material';
import styles from './SearchForm.module.scss';

/**
 * Пропсы для компонента формы поиска
 */
interface SearchFormProps {
  /** Обработчик отправки формы поиска */
  onSearch: (query: string) => void;
  /** Флаг загрузки */
  loading?: boolean;
  /** Начальное значение поиска */
  initialValue?: string;
}

/**
 * Компонент формы поиска репозиториев
 * @param onSearch - обработчик поиска
 * @param loading - флаг загрузки
 * @param initialValue - начальное значение
 */
export function SearchForm({ 
  onSearch, 
  loading = false, 
  initialValue = '' 
}: SearchFormProps) {
  const [query, setQuery] = useState(initialValue);

  /**
   * Обработчик отправки формы
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  /**
   * Обработчик изменения значения поиска
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Paper className={styles.paper} elevation={0}>
      <Box component="form" onSubmit={handleSubmit} className={styles.form}>
        <Box className={styles.inputWrapper}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Поиск репозиториев GitHub..."
            value={query}
            onChange={handleChange}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#666' }} />
                </InputAdornment>
              ),
              className: styles.input,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#F2F2F2',
                borderRadius: '8px',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: '2px solid #fff',
                },
              },
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          disabled={loading || !query.trim()}
          className={styles.button}
          sx={{
            backgroundColor: '#2196F3',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#1976D2',
            },
          }}
        >
          {loading ? 'Поиск...' : 'ИСКАТЬ'}
        </Button>
      </Box>
    </Paper>
  );
}
