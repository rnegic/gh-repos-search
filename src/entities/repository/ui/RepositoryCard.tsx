import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { Star, ForkRight, Update } from '@mui/icons-material';
import { formatDate, formatNumber } from '@/shared/lib';
import type { GitHubRepository } from '@/shared/types';
import styles from './RepositoryCard.module.scss';

/**
 * Пропсы для компонента карточки репозитория
 */
interface RepositoryCardProps {
  /** Данные репозитория */
  repository: GitHubRepository;
  /** Обработчик клика по карточке */
  onClick?: () => void;
  /** Выбрана ли карточка */
  selected?: boolean;
}

/**
 * Компонент карточки репозитория
 * @param repository - данные репозитория
 * @param onClick - обработчик клика
 * @param selected - флаг выбранности
 */
export function RepositoryCard({ 
  repository, 
  onClick, 
  selected = false 
}: RepositoryCardProps) {
  return (
    <Card 
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={onClick}
      sx={{ 
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { backgroundColor: 'action.hover' } : {},
      }}
    >
      <CardContent>
        <Typography variant="h6" component="h3" className={styles.title}>
          {repository.nameWithOwner}
        </Typography>
        
        <Box className={styles.metadata}>
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
          
          <Box className={styles.stats}>
            <Box className={styles.stat}>
              <Star fontSize="small" />
              <Typography variant="body2">
                {formatNumber(repository.stargazerCount)}
              </Typography>
            </Box>
            
            <Box className={styles.stat}>
              <ForkRight fontSize="small" />
              <Typography variant="body2">
                {formatNumber(repository.forkCount)}
              </Typography>
            </Box>
            
            <Box className={styles.stat}>
              <Update fontSize="small" />
              <Typography variant="body2">
                {formatDate(repository.updatedAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
