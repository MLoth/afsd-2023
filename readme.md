# how to seed 
- Do first a seeding of the birds, 
- The observations rely on the birds,
```bash
npx nestjs-command seed:database:birds
npx nestjs-command seed:database:observations
```
- Reset all the seeds
```bash
npx nestjs-command seed:reset
```

- Reset a specific seed
```bash
npx nestjs-command seed:reset:birds
npx nestjs-command seed:reset:observations
npx nestjs-command seed:reset:locations
```
