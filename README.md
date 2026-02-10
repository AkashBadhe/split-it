# Project Coding & Naming Conventions Guide

This document defines **mandatory best practices** for naming conventions, folder structure, and coding standards across the project.

Its purpose is to ensure:

* Consistency across the codebase
* High readability and maintainability
* Easier onboarding for new developers
* Predictable patterns for AI tools (Copilots, ChatGPT, etc.)

These guidelines apply to **Angular (Frontend)**, **NestJS / Node.js (Backend)**, and **shared development practices**.

---

## 1. General Principles (Applies Everywhere)

### 1.1 Naming Philosophy

* Names must be **descriptive, not clever**
* Avoid abbreviations unless industry-standard (`id`, `url`, `api`)
* Prefer **longer, clear names** over short ambiguous ones
* One name = one responsibility

### 1.2 Case Conventions

| Item                | Convention           | Example                     |
| ------------------- | -------------------- | --------------------------- |
| Files & folders     | kebab-case           | `user-profile.component.ts` |
| Variables           | camelCase            | `totalExpenseAmount`        |
| Functions / Methods | camelCase            | `calculateBalance()`        |
| Classes             | PascalCase           | `ExpenseService`            |
| Interfaces          | PascalCase           | `UserDto`                   |
| Enums               | PascalCase           | `PaymentStatus`             |
| Constants           | SCREAMING_SNAKE_CASE | `MAX_RETRY_COUNT`           |

---

## 2. Folder Structure Best Practices

### 2.1 General Rules

* Feature-based structure over type-based structure
* Each folder should represent a **domain or feature**
* Avoid deep nesting (max 4–5 levels)
* Do not mix unrelated features in the same folder

### 2.2 Example (High-Level)

```
apps/
  frontend/
  backend/
libs/
  shared/
```

---

## 3. Angular Best Practices

### 3.1 Angular Folder Structure

```
src/app/
  core/
    services/
    guards/
    interceptors/
  shared/
    components/
    pipes/
    directives/
  features/
    expenses/
      components/
      store/
      expenses.module.ts
      expenses-routing.module.ts
```

### 3.2 Angular File Naming

| File Type      | Pattern               | Example                      |
| -------------- | --------------------- | ---------------------------- |
| Component      | `*.component.ts`      | `expense-list.component.ts`  |
| Service        | `*.service.ts`        | `expense.service.ts`         |
| Module         | `*.module.ts`         | `expenses.module.ts`         |
| Routing Module | `*-routing.module.ts` | `expenses-routing.module.ts` |
| NgRx Actions   | `*.actions.ts`        | `expenses.actions.ts`        |
| NgRx Reducer   | `*.reducer.ts`        | `expenses.reducer.ts`        |
| NgRx Effects   | `*.effects.ts`        | `expenses.effects.ts`        |
| Selector       | `*.selectors.ts`      | `expenses.selectors.ts`      |

### 3.3 Angular Coding Rules

* One component per file
* Components should be **presentation-focused**
* Business logic must live in services or NgRx effects
* Avoid logic inside templates
* Use `OnPush` change detection wherever possible

### 3.4 NgRx Best Practices

* Feature-level stores only
* Keep actions small and explicit
* Avoid complex logic in reducers
* Effects handle side effects only (API calls, storage)

---

## 4. NestJS / Node.js Best Practices

### 4.1 NestJS Folder Structure

```
src/
  modules/
    users/
      users.controller.ts
      users.service.ts
      users.module.ts
      dto/
      schemas/
  common/
    decorators/
    filters/
    guards/
    interceptors/
  config/
  main.ts
```

### 4.2 Backend File Naming

| File Type  | Pattern           | Example               |
| ---------- | ----------------- | --------------------- |
| Controller | `*.controller.ts` | `users.controller.ts` |
| Service    | `*.service.ts`    | `users.service.ts`    |
| Module     | `*.module.ts`     | `users.module.ts`     |
| DTO        | `*.dto.ts`        | `create-user.dto.ts`  |
| Schema     | `*.schema.ts`     | `user.schema.ts`      |

### 4.3 Backend Naming Rules

* Controllers: plural nouns (`UsersController`)
* Services: singular (`UserService`)
* DTOs must end with `Dto`
* Mongo schemas must end with `Schema`

### 4.4 API Design Rules

* RESTful endpoints only
* Use nouns, not verbs in URLs

```
GET    /users
POST   /expenses
PUT    /groups/:id
DELETE /expenses/:id
```

### 4.5 Error Handling

* No raw errors thrown from services
* Use global exception filters
* Always return consistent error response shape

---

## 5. Variable & Function Naming Rules

### 5.1 Variables

* Use nouns for variables
* Avoid generic names (`data`, `temp`, `value`)

✅ Good:

```ts
const totalGroupExpense = 1200;
```

❌ Bad:

```ts
const x = 1200;
```

### 5.2 Functions

* Use verb + noun format
* Functions must do one thing

✅ Good:

```ts
calculateUserBalance()
fetchGroupExpenses()
```

❌ Bad:

```ts
processData()
handleStuff()
```

---

## 6. TypeScript Best Practices

* Avoid `any`
* Prefer `unknown` over `any` when unavoidable
* Use interfaces for public contracts
* Use types for unions and utility shapes

---

## 7. Code Quality & Formatting

### 7.1 Linting & Formatting

* ESLint must be enabled and enforced
* Prettier for formatting
* No disabled lint rules without justification

### 7.2 Comments

* Avoid obvious comments
* Comment **why**, not **what**

---

## 8. Git & Commit Standards

### 8.1 Branch Naming

```
feature/expense-split
bugfix/balance-calculation
```

### 8.2 Commit Messages (Conventional Commits)

```
feat: add expense split calculation
fix: resolve rounding issue in balances
refactor: simplify expense service logic
```

---

## 9. AI Copilot & Automation Guidelines

To ensure AI-generated code matches project standards:

* Always follow folder and naming conventions
* Prefer existing patterns over new ones
* Avoid introducing new abstractions without need
* Match existing file structure exactly

---

## 10. Final Notes

These rules are **not optional**. All contributors (human or AI) must follow this guide to maintain long-term consistency, scalability, and developer happiness.

When in doubt:

* Follow existing patterns
* Choose clarity over brevity
* Ask before introducing new conventions

---

Happy coding 🚀
