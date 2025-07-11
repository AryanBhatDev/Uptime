docker compose up -d
echo '🟡 - Waiting for database to be ready...'
./scripts/wait-for-it.sh "postgresql://postgres:mysecret@localhost:5432/postgres" -- echo '🟢 - Database is ready!'
bunx prisma migrate dev --name init
bun test
docker compose down