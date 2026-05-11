# Zero Trust Commerce Backend

## Setup

1. Copy `.env.example` to `.env` and fill in values.
2. Install deps: `npm install`
3. Run dev server: `npm run dev`

## API

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/checkout` (auth)
- `POST /api/admin/products` (admin)
- `PATCH /api/admin/products/:id` (admin)
- `DELETE /api/admin/products/:id` (admin)
- `GET /api/admin/audit` (admin)
