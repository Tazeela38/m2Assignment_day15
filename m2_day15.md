# Day 15: Mongoose Validation and Schema Rules — Report

**Name:** Shifa Anjum Shauqui Zafar Aqueel  
**Internship:** Web Team Pvt. Ltd.  
**Date:**

## 1) Why validation is important in databases

Validation ensures only correct, complete, and consistent data is stored. It prevents bad data from entering the system, reduces bugs, protects downstream logic/analytics, and improves user experience with clear, early feedback.

## 2) Types of schema validation rules available in Mongoose

Common built-in validators:
- `required`: Field must be present.
- `minlength` / `maxlength`: Limit string length.
- `min` / `max`: Numeric boundaries.
- `enum`: Restrict values to a list.
- `match`: Regex check, e.g., email format.
- `unique`: Creates a unique index in MongoDB (not a "validator"); duplicate values raise a duplicate key error.
- Custom validators: Provide a function that returns `true/false` or throws an error for complex rules.

## 3) Updated Student schema with validations

See `models/Student.js`. Rules:
- `name`: required, min length 3
- `email`: required, unique, regex match
- `course`: required

## 4) API endpoint

`POST /api/add-student` — creates a new student with validation.

### Sample request
```http
POST /api/add-student
Content-Type: application/json

{
  "name": "Shifa A. Zafar",
  "email": "shifa@example.com",
  "course": "Computer Science"
}
```

### Sample success response (201)
```json
{ "message": "Student created", "data": { /* document */ } }
```

### Sample validation error (400)
```json
{
  "message": "Validation failed",
  "errors": { "name": "name must be at least 3 characters" }
}
```

### Sample duplicate error (409)
```json
{
  "message": "Duplicate key error",
  "errors": { "email": "email must be unique" }
}
```

## 5) How Mongoose validation works (`.validate()`)

- When you call `Model.create()` or `doc.save()`, Mongoose runs validators defined in the schema.
- If any validator fails, it throws a `ValidationError` that includes each field’s error message.
- For uniqueness, MongoDB enforces the constraint at the database level using an index. Violations trigger an `E11000` duplicate key error which should be caught and converted into a user-friendly message.

## 6) Screenshots (to paste below in Word)

- ✅ Successful submission in Postman (status 201)  
- ❌ Missing/short name (status 400)  
- ❌ Duplicate email (status 409)

(Attach screenshots here.)
