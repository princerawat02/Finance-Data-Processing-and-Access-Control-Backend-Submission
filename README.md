# Finance Backend API

A clean, modular Node.js backend for managing financial records with role-based access control (RBAC) and dashboard analytics.

## 🏗️ Architecture

This project follows a **Controller-Service** architecture.

- **Controllers**: Handle HTTP requests, input parsing, and response status codes.
- **Services**: Contain the core business logic, data filtering, and dashboard aggregations.
- **Persistence**: Using a local **JSON-based database** (`src/data/db.json`) with atomic read/write operations to ensure data persists across server restarts.

## 🛠️ Setup & Run

This project uses `pnpm` for faster package management.

1. **Install Dependencies**:

   ```bash
   pnpm install
   ```

2. **Start Server**:
   ```bash
   pnpm start
   ```
   The API will run on: `http://localhost:3000`

## 🔐 Access Control & Roles

Access is managed via a `role` query parameter (e.g., `?role=admin`).

- **Admin**: Full Access (Manage users & records).
- **Analyst**: View records and access Dashboard Summary.
- **Viewer**: View records only.
- **Status Check**: Accounts marked as `inactive` in `db.json` are blocked from all actions.

## 🚀 API Endpoints

### 📊 Records

- `GET /records?role=admin`: List records (supports `type`, `category` filters).
- `POST /records?role=admin`: Add a new entry.
- `PUT /records/:id?role=admin`: Update specific fields.
- `DELETE /records/:id?role=admin`: Remove an entry.

### 📈 Dashboard Stats

- `GET /records/summary?role=analyst`: Returns total income/expense, net balance, category breakdown, monthly trends, and recent activity.

### 👤 Users

- `GET /users?role=admin`: View all users.
- `PUT /users/:id?role=admin`: Update user role or active/inactive status.
