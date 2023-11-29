# mev-share-deploy

# Setup
```bash
for file in mev-share-node/sql/*.sql; do psql "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable" -f $file; done

docker compose up -d
```