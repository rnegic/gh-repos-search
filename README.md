# GH Repository Search

Веб-приложение для поиска репозиториев GitHub с использованием GraphQL GitHub API

## Технологический стек

- **Фреймворк**: Next.js 15 App Router
- **Язык**: TypeScript
- **Стейт менеджмент**: Redux Toolkit + RTK Query
- **UI библиотека**: MUI (Material-UI)
- **Стилизация**: Sass + CSS Modules
- **API**: GitHub GraphQL API
- **Архитектура**: Feature-Sliced Design (FSD)

## Функциональность

- Поиск репозиториев GitHub
- Сортировка по звездам, форкам, дате обновления
- Выбор направления сортировки (возрастание/убывание)
- Пагинация результатов
- Детальная информация о репозитории
- Адаптивный дизайн
- Типизация TypeScript
- JSDoc комментарии

## Установка и запуск

- npm install

нужен токен github для успешной работы, создайте его и закиньте в .env.example
в строку:

NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here

- npm run dev