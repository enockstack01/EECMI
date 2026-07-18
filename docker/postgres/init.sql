-- EECMI database initialisation
-- Runs once when the postgres container is first created.
-- The Docker entrypoint already connects to POSTGRES_DB, so no \c needed.
-- Sequelize sync() creates all application tables.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
