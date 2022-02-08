# Next.js + Prisma + Supabase Blog Project

## About the Project

- Prisma connects the PostgreSQL Database provided by Supabase by using postgres connection string.
- Write the Database Schemas in `prisma/schema.prisma`
- `lib/prisma.ts` contains prisma client config
- Use prisma client APIs on `getStaticProps` and `getServerSideProps` in the Next.js project. Also you can use them in `pages/api/` as well to perform Database Operations.
- Prisma Client APIs cannot be used in the Frontend application.
- This App performs basic CRUD Operations with Prisma + Supabase DB + Next FE and Server

## Get Started

- Create a `.env` as below

```
DATABASE_URL=<YOUR_SUPABASE-CONNECION-STRING-HERE>
```

- npm install
- npm run dev

Also, you can visualize the database on local with:

```
npx prisma studio
```

If you are using `prisma migrate dev`, please refer [this](https://stackoverflow.com/questions/67551593/supabase-client-permission-denied-for-schema-public) without fail. 
