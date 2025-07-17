import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Box, 
  Link as MuiLink,
  Divider 
} from '@mui/material';
import { 
  Star, 
  ForkRight, 
  Update, 
  Language, 
  Gavel,
  OpenInNew 
} from '@mui/icons-material';
import { formatDate, formatNumber } from '@/shared/lib';
import type { GitHubRepository } from '@/shared/types';
import styles from './RepositoryDetails.module.scss';

/**
 * Пропсы для компонента деталей репозитория
 */
interface RepositoryDetailsProps {
  /** Данные репозитория */
  repository: GitHubRepository;
}

/**
 * Компонент с детальной информацией о репозитории
 * @param repository - данные репозитория
 */
export function RepositoryDetails({ repository }: RepositoryDetailsProps) {
  return (
    <Card className={styles.card}>
      <CardContent>
        <Box className={styles.header}>
          <Typography variant="h5" component="h2" className={styles.title}>
            {repository.nameWithOwner}
          </Typography>
          
          <MuiLink
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <OpenInNew fontSize="small" />
            Открыть на GitHub
          </MuiLink>
        </Box>

        {repository.description && (
          <>
            <Typography variant="body1" className={styles.description}>
              {repository.description}
            </Typography>
            <Divider className={styles.divider} />
          </>
        )}

        <Box className={styles.details}>
          <Box className={styles.detailRow}>
            <Box className={styles.detailItem}>
              <Star className={styles.icon} />
              <Typography variant="body2" className={styles.label}>
                Звезды:
              </Typography>
              <Typography variant="body2" className={styles.value}>
                {formatNumber(repository.stargazerCount)}
              </Typography>
            </Box>

            <Box className={styles.detailItem}>
              <ForkRight className={styles.icon} />
              <Typography variant="body2" className={styles.label}>
                Форки:
              </Typography>
              <Typography variant="body2" className={styles.value}>
                {formatNumber(repository.forkCount)}
              </Typography>
            </Box>
          </Box>

          <Box className={styles.detailRow}>
            <Box className={styles.detailItem}>
              <Update className={styles.icon} />
              <Typography variant="body2" className={styles.label}>
                Обновлено:
              </Typography>
              <Typography variant="body2" className={styles.value}>
                {formatDate(repository.updatedAt)}
              </Typography>
            </Box>

            {repository.primaryLanguage && (
              <Box className={styles.detailItem}>
                <Language className={styles.icon} />
                <Typography variant="body2" className={styles.label}>
                  Язык:
                </Typography>
                <Chip
                  label={repository.primaryLanguage.name}
                  size="small"
                  sx={{
                    backgroundColor: repository.primaryLanguage.color,
                    color: 'white',
                    fontSize: '0.75rem',
                  }}
                />
              </Box>
            )}
          </Box>

          {repository.license && (
            <Box className={styles.detailRow}>
              <Box className={styles.detailItem}>
                <License className={styles.icon} />
                <Typography variant="body2" className={styles.label}>
                  Лицензия:
                </Typography>
                <Typography variant="body2" className={styles.value}>
                  {repository.license.name}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
