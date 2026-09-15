# Backend Auth Contract

This document lists the frontend expectations for authentication and authorization against the hosted Crezine API.

## Base URL

Frontend requests are sent to:

```text
https://crezine-api-1057458775492.us-central1.run.app/api
```

If `VITE_API_BASE_URL` is set without `/api`, the frontend appends `/api` automatically.

## Authentication

All protected endpoints must accept a Firebase ID token:

```http
Authorization: Bearer <firebase_id_token>
Content-Type: application/json
```

The backend should verify the token with Firebase Admin SDK and use the decoded `uid` as the trusted user identity. The hosted API currently rejects user identity fields in the request body, so the frontend sends an empty JSON object for signin/signup.

## Signin And Signup

The frontend calls these endpoints after Firebase auth succeeds:

```http
POST /api/users/signin
POST /api/users/signup
```

Observed hosted API request body:

```json
{}
```

Do not require or accept these body properties on the hosted API unless the backend contract changes:

```json
{
  "id": "firebase-uid",
  "email": "user@example.com",
  "displayName": "User Name",
  "avatarUrl": "https://..."
}
```

Expected response:

```json
{
  "id": "backend-or-firebase-user-id",
  "email": "user@example.com",
  "name": "User Name",
  "displayName": "User Name",
  "avatarUrl": "https://...",
  "craft": "Creator",
  "role": "user"
}
```

Recommended behavior:

- `POST /users/signin`: read identity from the verified Firebase token and return `200` with the profile if the user exists.
- `POST /users/signin`: return `404` if the Firebase user is valid but no backend profile exists.
- `POST /users/signup`: create an idempotent user profile from the Firebase token.
- `POST /users/signup`: if the user already exists, return `200` with the existing profile or `409` with a clear message.
- Return validation errors as JSON with a `message` field.

## Current User Profile

The frontend supports either of these profile endpoints:

```http
GET /api/auth/me
PUT /api/auth/me
```

Fallback supported by frontend:

```http
GET /api/users/me
PUT /api/users/me
```

The backend should return `401` when the Firebase token is missing, expired, invalid, or for the wrong Firebase project. It should return `403` only when the user is authenticated but lacks permission.

## Email OTP

The current hosted API returns:

```text
Cannot POST /api/v1/auth/otp/send
```

That means this route is missing or mounted at a different path. The frontend currently expects:

```http
POST /api/v1/auth/otp/send
POST /api/v1/auth/otp/verify
```

Send OTP body:

```json
{
  "email": "user@example.com"
}
```

Verify OTP body:

```json
{
  "email": "user@example.com",
  "code": "12345"
}
```

Recommended responses:

```json
{
  "message": "Verification code sent"
}
```

```json
{
  "verified": true
}
```

Security requirements:

- OTP codes should expire quickly, for example after 5 to 10 minutes.
- Rate limit by email and IP.
- Store only hashed OTP values.
- Return generic errors for invalid or expired OTPs.
- Do not create or authorize a user only because OTP passed; Firebase auth should still be used for account authentication unless the backend intentionally owns the full auth flow.

## Error Shape

Please return JSON errors where possible:

```json
{
  "message": "Human readable error",
  "code": "OPTIONAL_MACHINE_CODE"
}
```

This lets the frontend show useful messages instead of generic `API request failed: 400` errors.
