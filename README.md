# Library Management API

**Express + TypeScript + MongoDB** – Full CRUD, Borrow Logic, Aggregation

## Features
- Book CRUD with **schema validation** (genre enum, unique ISBN)
- Borrow with **availability control** (`updateAvailability()` instance method)
- **Pre-save middleware** auto-updates `available`
- **Aggregation pipeline** for borrowed summary
- Filtering, sorting, limit: `?filter=SCIENCE&sortBy=title&sort=asc&limit=5`
- Exact response format + generic errors

## Setup
```bash
git clone https://github.com/shofiq18/Library-Management-API.git
cd library-api
npm install
