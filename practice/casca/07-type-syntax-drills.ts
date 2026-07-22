// TypeScript syntax drills — muscle memory for types, interfaces, unions, generics.
// Answers are placed directly below each prompt.

// ----------------------------------------------------------------------------
// 1. Basic object type
// Define a type `User` with: id (number), email (string), isActive (boolean).

type User = {
  id: number;
  email: string;
  isActive: boolean;
};

// ----------------------------------------------------------------------------
// 2. Interface vs type
// Redefine `User` from #1 as an interface instead. Then add an optional field
// `lastLoginAt` typed as Date.

interface IUser {
  id: number;
  email: string;
  isActive: boolean;
  lastLoginAt?: Date;
}

// ----------------------------------------------------------------------------
// 3. Union of string literals
// Define a type `Role` that can only be "admin" | "editor" | "viewer".
// Write a function `canEdit(role: Role): boolean` that returns true for
// "admin" and "editor" only.

type Role = "admin" | "editor" | "viewer";
function canEdit(role: Role): boolean {
  return role === "admin" || role === "editor";
}

// ----------------------------------------------------------------------------
// 4. Discriminated union
// Model a `Shape` that is either:
//   { kind: "circle", radius: number }
//   { kind: "rectangle", width: number, height: number }
// Write a function `area(shape: Shape): number` using a switch on `kind`.

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      // const a = shape.width;
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

// ----------------------------------------------------------------------------
// 5. Exhaustiveness check
// Add a `{ kind: "triangle", base: number, height: number }` variant to Shape
// above. Update `area` so TypeScript errors at compile time if a variant is
// left unhandled (use the `never` trick).

type ShapeWithTriangle =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function areaExhaustive(shape: ShapeWithTriangle): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      const _exhaustive: never = shape;
      throw new Error(`Unhandled shape: ${JSON.stringify(shape)}`);
  }
}

// ----------------------------------------------------------------------------
// 6. Intersection types
// Define `Timestamped = { createdAt: Date; updatedAt: Date }`.
// Define `Post = { id: number; title: string }`.
// Create `PostWithMeta` as the intersection of `Post` and `Timestamped`.

type Timestamped = { createdAt: Date; updatedAt: Date };
type Post = { id: number; title: string };
type PostWithMeta = Post & Timestamped & { name: "any" };
function test1(time: PostWithMeta): boolean {
  switch (time.name) {
    case "any":
      return !!time.createdAt;
    default:
      return false;
  }
}

// ----------------------------------------------------------------------------
// 7. Generics — basic function
// Write a generic function `wrapInArray<T>(value: T): T[]` that returns a
// single-element array containing the value.

function wrapInArray<T>(value: T): T[] {
  return [value];
}

// ----------------------------------------------------------------------------
// 8. Generics — constrained
// Write a generic function `getProperty<T, K extends keyof T>(obj: T, key: K)`
// that returns the value at `key`, correctly typed.

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// ----------------------------------------------------------------------------
// 9. Generic interface
// Define an interface `ApiResponse<T>` with fields: `data: T`, `error: string
// | null`, `status: number`. Then declare a variable of type
// `ApiResponse<User>` using the `User` type from #1.

interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}
const userResponse: ApiResponse<User> = {
  data: { id: 1, email: "a@b.com", isActive: true },
  error: null,
  status: 200,
};

// ----------------------------------------------------------------------------
// 10. Utility types — Partial / Pick / Omit
// Given `User` from #1 (id, email, isActive):
//   a) Define `UserUpdate` as a `Partial<User>` (all fields optional).
//   b) Define `UserPreview` using `Pick` to keep only `id` and `email`.
//   c) Define `UserWithoutId` using `Omit` to drop `id`.

type UserUpdate = Partial<User>;
type UserPreview = Pick<User, "id" | "email">;
type UserWithoutId = Omit<User, "id">;

// ----------------------------------------------------------------------------
// 11. Mapped type
// Write your own mapped type `ReadonlyAll<T>` that makes every field of `T`
// readonly (don't use the built-in `Readonly<T>` — reimplement it).

type ReadonlyAll<T> = {
  readonly [K in keyof T]: T[K];
};

// type b = ReadonlyAll<User>;
// ----------------------------------------------------------------------------
// 12. Conditional type
// Write a conditional type `IsString<T>` that resolves to `true` if `T`
// extends `string`, otherwise `false`. Test it with a couple of type aliases.

type IsString<T> = T extends string ? true : false;
type A = IsString<"hello">; // true
type B = IsString<number>; // false

// ----------------------------------------------------------------------------
// 13. Function overloads
// Write overloaded signatures for a function `parseInput` such that:
//   parseInput(value: string): string[]   // splits on comma
//   parseInput(value: number): number[]   // returns [value]
// Then implement it with a single implementation signature.

function parseInput(value: string): string[];
function parseInput(value: number): number[];
function parseInput(value: string | number): string[] | number[] {
  if (typeof value === "string") return value.split(",");
  return [value];
}

// ----------------------------------------------------------------------------
// 14. Tuple types
// Define a tuple type `KeyValuePair` representing [string, number].
// Write a function `swapToRecord(pairs: KeyValuePair[]): Record<string, number>`
// that converts an array of pairs into an object.

type KeyValuePair = [string, number];
function swapToRecord(pairs: KeyValuePair[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const [key, value] of pairs) {
    result[key] = value;
  }
  return result;
}

// ----------------------------------------------------------------------------
// 15. Enums vs literal unions
// Define a `Status` union as literal strings: "pending" | "active" | "closed".
// Then define the same thing as a TS `enum StatusEnum`. Write one sentence
// (as a comment) on when you'd prefer the union over the enum.

type StatusUnion = "pending" | "active" | "closed";
enum StatusEnum {
  Pending = "pending",
  Active = "active",
  Closed = "closed",
}
// Prefer the literal union for plain data modeling (no runtime object, better
// structural typing); prefer enum when you want a namespaced, iterable set of
// named constants used across the codebase.
