# Split-It Backend API

A NestJS-based backend for an expense splitting app similar to Splitwise. Allows users to create groups, add expenses, and split costs fairly.

## Features
- User authentication with JWT
- Group management
- Expense creation and splitting
- Rate limiting and security

## Technologies
- NestJS
- MongoDB with Mongoose
- JWT for auth
- Throttler for rate limiting

## Setup
1. Install dependencies: `pnpm install`
2. Set up MongoDB and update `.env` with `MONGODB_URI`
3. Run: `pnpm run start:dev`

## Authentication
Use JWT tokens. Obtain via `POST /auth/login` with `{email, password}`. Include `Authorization: Bearer <token>` in headers for protected routes.

## Base URL
`http://localhost:3000/api/v1` (adjust for production)

## Endpoints

### Authentication
- **POST /auth/login**
  - Description: Authenticate user
  - Request: `{ "email": "string", "password": "string" }`
  - Response: `{ "access_token": "string" }`
  - Status: 200 OK, 401 Unauthorized

### Users
- **GET /users/me**
  - Description: Get current user profile
  - Response: User object
  - Auth: Required

- **GET /users**
  - Description: Get all users
  - Response: Array of users
  - Auth: Required

- **POST /users**
  - Description: Create new user
  - Request: `{ "name": "string", "email": "string", "password": "string" }`
  - Response: Created user
  - Auth: Required

### Groups
- **GET /groups**
  - Description: Get all groups
  - Response: Array of groups
  - Auth: Required

- **POST /groups**
  - Description: Create new group
  - Request: `{ "name": "string", "members": ["user_id"] }`
  - Response: Created group
  - Auth: Required

### Expenses
- **GET /expenses**
  - Description: Get all expenses
  - Response: Array of expenses
  - Auth: Required

- **POST /expenses**
  - Description: Create new expense
  - Request: `{ "description": "string", "amount": 100, "payer": "user_id", "splits": [{"user": "user_id", "amount": 50}] }`
  - Response: Created expense
  - Auth: Required

## Schemas
- **User**: `{ _id, name, email, password, currency, createdAt, updatedAt }`
- **Group**: `{ _id, name, members: [ObjectId], expenses: [ObjectId], createdAt, updatedAt }`
- **Expense**: `{ _id, description, amount, payer: ObjectId, group?: ObjectId, splits: [{user: ObjectId, amount}], date, createdAt, updatedAt }`

## Error Handling
- 400 Bad Request: Invalid input
- 401 Unauthorized: Invalid token
- 403 Forbidden: Insufficient permissions
- 404 Not Found: Resource not found
- 429 Too Many Requests: Rate limit exceeded

## Testing
Run `pnpm test` for unit tests.
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
