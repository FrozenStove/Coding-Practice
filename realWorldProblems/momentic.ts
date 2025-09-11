/**
 * We'll be building a SQL query execution engine to run parsed SQL statements against a set of data, 
 * stored as records of keys and values.
 * 
 * You can assume that the dataset is fixed and available in memory (see the "testData" constant below).
 * 
 * Our engine will support the following functionality, to start:
 * 
 * a) SELECT
 * Support selecting all (*) or any subset of keys per record returned, e.g.
 * - SELECT * from data;
 * - SELECT id, name FROM data;
 * 
 * b) LIMIT
 * - Support a maximum number of records returned
 * - E.g. SELECT id, name FROM data LIMIT 3;
 * 
 * c) WHERE
 * - Support a single clause against boolean and numeric columns, with =, >, < operations. - E.g.
 * - SELECT id, name FROM data WHERE is_robot = FALSE;
 * - SELECT * FROM data WHERE height > 81;
 * 
 * Implement a function called "executeSQL" that takes the output of a SQL parser and executes the operations over the test data. 
 * You can choose your own data structure/syntax for the output of this parser, say some object or struct, that is a
 * structured representation of string SQL statement.

 * Translate the SQL statement examples provided to your format to validate the correctness of the engine.
 * Don't worry about validation of the SQL itself – assume that the parsed SQL is always valid and executable, 
 * e.g. you'll never encounter: SELECT * FROM data WHERE is_robot > 3 (only = and TRUE or FALSE values are valid for boolean field types).
 */

const testData = [
  { id: 1, name: "Alice", eye_color: "brown", is_robot: false, height: 65 },
  { id: 2, name: "Bob", eye_color: "blue", is_robot: false, height: 70 },
  { id: 3, name: "Eve", eye_color: "green", is_robot: false, height: 75 },
  { id: 4, name: "Robot1", eye_color: "red", is_robot: true, height: 80 },
  { id: 5, name: "Robot2", eye_color: "red", is_robot: true, height: 85 },
];

// basic function

// inputs select
/*
{
select : string;
limit? : number;
where? : { operation: ">"| "<" | "="
  property: string;
}
}
*/

type SearchInput = {
  select: string; // includes comma seperated string
  limit?: number;
  where?: {
    operation: ">" | "<" | "=";
    property: string;
    condition: any;
    combinationType: "and" | "or";
  };
};

function search({ select, limit, where }: SearchInput): Record<string, any> {
  let currentSearch = [...testData];
  // start with a where to narrow down options or elements/ rows
  if (where) {
    const filteredArray = currentSearch.filter((e) => {
      if (where.operation === ">") {
        return e[where.property] > where.condition;
      } else if (where.operation === "<") {
        return e[where.property] < where.condition;
      } else if (where.operation === "=") {
        return e[where.property] === where.condition;
      } else {
        throw new Error(`unknown operation`);
      }
    });
  }
  if (limit) {
    while (currentSearch.length > limit) {
      currentSearch.pop();
    }
  }

  if (select === "*") {
    return currentSearch;
  } else {
    const selectSet = new Set(select.split(",").map((e) => e.trim()));
    // iterate through the elements in our search array
    for (const searchResult of currentSearch) {
      for (const prop in searchResult) {
        if (!selectSet.has(prop)) {
          delete searchResult[prop];
        }
      }
    }
    return currentSearch;
  }
}

/**
 * Followup:
 * Add support for AND/OR clauses in the WHERE statement - E.g.
 * - SELECT id, name FROM data WHERE is_robot = FALSE AND height > 81;
 * - SELECT id, eye_color FROM data WHERE is_robot = TRUE OR (height > 73 AND height < 77);
 * You should be able to handle arbitrary nesting of AND/OR clauses.
 */

// console.log(search({
//   select:"*"
// }))

// console.log( search({
//   select:"id, name"
// }))

// console.log(search({
//   select: "*",
//   limit: 2
// }))

// console.log(search({
//   select: "*",
//   where: {operation: "=",
//   property:"is_robot",
//   condition: true}
// }))

// where? : {
//   operation: ">"| "<" | "=";
//   property: string;
//   condition: any;
// }
