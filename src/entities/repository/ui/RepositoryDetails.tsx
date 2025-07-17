import React from 'react';
import { 
  Typography, 
  Chip, 
  Box, 
  Link as MuiLink 
} from '@mui/material';
import { 
  Star, 
  OpenInNew 
} from '@mui/icons-material';
import { formatNumber } from '@/shared/lib';
import type { GitHubRepository } from '@/shared/types';
import styles from './RepositoryDetails.module.scss';

/**
 * Пропсы для компонента деталей репозитория
 */
interface RepositoryDetailsProps {
  /** Данные репозитория */
  repository?: GitHubRepository | null;
}

/**
 * Компонент с детальной информацией о репозитории
 * @param repository - данные репозитория
 */
export function RepositoryDetails({ repository }: RepositoryDetailsProps) {
  if (!repository) {
    return (
      <Box className={styles.emptyState}>
        <Typography className={styles.emptyText}>
          Выберите репозиторий
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.content}>
      <Box className={styles.header}>
        <Typography className={styles.title}>
          {repository.name}
        </Typography>
        
        <MuiLink
          href={repository.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <OpenInNew fontSize="small" />
        </MuiLink>
      </Box>

      <Box className={styles.statsRow}>
        {repository.primaryLanguage && (
          <Chip
            label={repository.primaryLanguage.name}
            size="small"
            sx={{
              backgroundColor: repository.primaryLanguage.color,
              color: 'white',
              fontSize: '0.75rem',
            }}
          />
        )}
        
        <Box className={styles.stars}>
          <Star fontSize="small" />
          <Typography variant="body2">
            {formatNumber(repository.stargazerCount)}
          </Typography>
        </Box>
      </Box>

      {repository.license && (
        <Typography className={styles.license}>
          {repository.license.name}
        </Typography>
      )}
    </Box>
  );
}
