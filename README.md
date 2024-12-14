# Dealls Case Study

## Recommended System Requirements

- Node v20 or higher
- PostgreSQL v14 or higher

## Project Setup (Development Environment)

- Copy and setup environment variables (.env file)

```
cp .env.example .env
```

or manually create .env file and insert these setup:

```
DATABASE_URL=
JWT_SECRET_KEY=
JWT_EXPIRES_IN=
```

- Configure the .env file based on your system & preferences, following the examples (at .env.example)

- Install dependencies

```
npm i
```

- Migrate the database

```
npx prisma migrate dev
```

- (Optional) Generate prisma client manually if not automatically generated on migration above

```
npx prisma generate
```

- Seed the database

```
# Dummy user and user profiles for testing views & swaps
npx tsx prisma/seeders/001_users.ts
```

## Start Development Server

```
npm run dev
```

## API Documentation & Playground for Manual Testing (Swagger)

After the development server running, we can access the Swagger API Documentation (Postman-like documentation) at:

http://localhost:3000/api-docs

## Tech Stacks

**Programming Language**: TypeScript (with Node.js runtime)
**Backend Framework**: NestJS
**Database**: PostgreSQL
**ORM**: Prisma ORM

## Additional Setups

- Eslint & Prettier
- Dockerfile
