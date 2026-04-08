/**
 * REVIVE INTERVIEW PREP — "The Sustainable Cataloger"
 *
 * ═══════════════════════════════════════════════════
 * THE PROBLEM
 * ═══════════════════════════════════════════════════
 *
 * You are given a CSV string of incoming clothing donations/trade-ins.
 * Parse and convert this data into structured "Product" objects for
 * Revive's application. The exercise has 3 parts — pace yourself to
 * finish all three.
 *
 * PART 1 — Basic Conversion
 *   Parse the CSV string into an array of objects.
 *   CSV headers: style_name, category, material, condition_score
 *
 * PART 2 — Validation & Categorization
 *   - Filter out any items with condition_score < 7
 *   - Add a region_tag based on category:
 *       "Tops" or "Knitwear"  → "Upper Body"
 *       "Jeans" or "Skirts"   → "Lower Body"
 *       anything else         → your call (ask the interviewer)
 *
 * PART 3 — Sustainability & API Push
 *   - Add is_sustainable: true if material is "Organic Cotton",
 *     "Recycled Wool", or "Hemp"
 *   - Push the final array to a mock API endpoint
 *
 * ═══════════════════════════════════════════════════
 * HOW TO USE THIS FILE:
 *   1. Read the SCORING RUBRIC section to internalize what Bryan is measuring.
 *   2. Read the OPENING SCRIPT and practice saying it out loud.
 *   3. Delete everything below the "START CODING HERE" marker and rebuild it.
 *   4. Run your solution against the EDGE CASE TEST INPUTS at the bottom.
 *
 * WHAT SEPARATED A 3 FROM A 4 (actual reviewer notes):
 *   - Technical: "Initial solution has quite a bit of conditional statements
 *     and duplicate code. They really should be using helper methods rather
 *     than doing everything in a single function."
 *     → Don't write a monolith and refactor later. Start with helpers.
 *
 *   - Problem solving: "I had to provide some (minimal) guidance to get them
 *     on the right track so they weren't 100% independent."
 *     → Ask clarifying questions upfront. Don't wait to be corrected.
 *
 *   - Communication: "Kind of just jumped in and started coding without
 *     explaining their high level approach for part 1."
 *     → Explain your plan BEFORE typing. Every part, not just Part 2.
 */

// ─────────────────────────────────────────────
// SCORING RUBRIC (internalize this)
// ─────────────────────────────────────────────
//
// Communication/Collaboration — score 4 if you:
//   ✓ State your high-level plan before writing any code (all 3 parts)
//   ✓ Narrate what each function does as you write it
//   ✓ Ask at least 1–2 clarifying questions per part before coding
//
// Problem Solving — score 4 if you:
//   ✓ Identify edge cases yourself (don't wait for Bryan to point them out)
//   ✓ Figure out ambiguities by asking, not by guessing
//   ✓ Never need Bryan to redirect you
//
// Technical Ability — score 4 if you:
//   ✓ Write helper functions from Part 1 — NOT as a refactor in Part 2
//   ✓ Use lookup maps / Sets instead of if/else chains
//   ✓ Main pipeline reads like English (each line delegates to a helper)
//   ✓ No duplicate logic anywhere

// ─────────────────────────────────────────────
// WHAT SCORES A 1 OR 2 — avoid these at all costs
// ─────────────────────────────────────────────
//
// SCORE 1 — "Did not complete / fundamentally off track"
//   ✗ Can't parse the CSV at all and gets stuck on Part 1 for the whole hour
//   ✗ Writes code that doesn't run (syntax errors left unchecked)
//   ✗ Needs the interviewer to essentially write the solution for them
//   ✗ Silent the entire time — Bryan has no idea what you're thinking
//   ✗ Argues with or ignores clarifications the interviewer provides
//
// SCORE 2 — "Completed partially, poor quality or collaboration"
//   ✗ One giant function with everything inside — parse + validate +
//     categorize + enrich all in one block
//   ✗ Long if/else chains instead of a map:
//       BAD:  if (cat === "Tops") { tag = "Upper Body" }
//             else if (cat === "Knitwear") { tag = "Upper Body" }
//             else if ...
//       GOOD: CATEGORY_TO_REGION[cat] ?? "Uncategorized"
//   ✗ Copy-pasted logic (same condition check written 3 different places)
//   ✗ Never explains what they're doing — just codes in silence
//   ✗ Waits for Bryan to point out bugs instead of testing their own output
//   ✗ Uses magic numbers/strings inline:
//       BAD:  if (score >= 7)          GOOD: if (score >= MIN_CONDITION_SCORE)
//       BAD:  if (mat === "Hemp")      GOOD: SUSTAINABLE_MATERIALS.has(mat)
//   ✗ Rewrites Part 1 completely when Part 2 requirements are added —
//     signals the original design wasn't extensible
//   ✗ Doesn't ask any clarifying questions — codes assumptions silently
//     and gets redirected by Bryan mid-solution

// ─────────────────────────────────────────────
// OPENING SCRIPT — say this before touching the keyboard
// ─────────────────────────────────────────────
//
// "Before I start coding I want to make sure I understand the full shape
//  of the problem. A few quick clarifying questions:
//
//   - For the CSV: should I assume headers are always in this exact order,
//     or should I parse them dynamically from the first row?
//   - For condition_score: is 7 inclusive or exclusive as the cutoff?
//   - For categories not in the mapping (e.g. Outerwear): should I default
//     to 'Uncategorized', drop the item, or ask you?
//   - For the API push in Part 3: are you looking for a real fetch call or
//     a mock is fine?
//
//  My plan: I'll start by defining TypeScript interfaces so we agree on the
//  data shape. Then I'll build small helper functions — one for parsing,
//  one for validation, one for categorization — before I wire them into
//  a main pipeline. That way Part 2 and 3 are just adding new helpers,
//  not rewriting anything."

// ─────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────

const RAW_CSV = `style_name,category,material,condition_score
Vintage Denim Jacket,Outerwear,Cotton,8
Recycled Wool Sweater,Knitwear,Recycled Wool,9
Organic Cotton Tee,Tops,Organic Cotton,10
Worn Out Jeans,Jeans,Denim,4
Hemp Blend Skirt,Skirts,Hemp,7
Synthetic Puffer,Outerwear,Polyester,6`;

// ─────────────────────────────────────────────
// ↓↓↓ START CODING HERE — delete everything below and rebuild ↓↓↓
// ─────────────────────────────────────────────

// ── STEP 0: Interfaces (do this first, before any logic) ─────────────────────
// Narrate: "I'll define the data shapes upfront so that every function
// signature is self-documenting and TypeScript catches mistakes early."

interface RawProduct {
  style_name: string;
  category: string;
  material: string;
  condition_score: number;
}

interface ProcessedProduct extends RawProduct {
  region_tag: string;
  is_sustainable: boolean;
}

// ── PART 1 PLAN (say out loud before writing): ────────────────────────────────
// "I'll write a parseCSV helper that splits on newlines, treats the first
//  row as dynamic headers, and maps every subsequent row into a RawProduct.
//  I'll keep it pure — no validation yet, that's Part 2's job."

// TRANSITION SCRIPT (between Part 1 and 2):
// "Now that I have clean structured data, I want to add two responsibilities:
//  filtering by condition and tagging by region. I'll pull each into its own
//  helper rather than adding conditionals inside the parser — that keeps each
//  function doing exactly one thing."

// ── PART 1 — Parse ────────────────────────────────────────────────────────────

function parseRow(_headers: string[], _values: string[]): RawProduct {
  // TODO: zip _headers + _values into an object, cast condition_score to number
  return {} as RawProduct;
}

function parseCSV(csv: string): RawProduct[] {
  // TODO: split on "\n", extract headers from row 0, map rows 1-N via parseRow
  // Narrate: "Splitting the parsing into parseRow keeps parseCSV easy to read."
  return [];
}

// ── PART 2 — Validate & Categorize ───────────────────────────────────────────

const MIN_CONDITION_SCORE = 7; // named constant so the rule is obvious

function isValidCondition(product: RawProduct): boolean {
  // TODO: return product.condition_score >= MIN_CONDITION_SCORE
  return false;
}

// Lookup map = zero conditionals, trivially extensible.
// Narrate: "If Bryan adds 'Shorts → Lower Body' tomorrow, it's one line here."
const CATEGORY_TO_REGION: Record<string, string> = {
  Tops: "Upper Body",
  Knitwear: "Upper Body",
  Jeans: "Lower Body",
  Skirts: "Lower Body",
  // Ask Bryan: "Where should Outerwear land? I'll default to Uncategorized
  // for now and we can add it to the map when the requirement is clearer."
};

function getRegionTag(category: string): string {
  // TODO: return CATEGORY_TO_REGION[category] ?? "Uncategorized"
  return "";
}

// ── PART 3 — Sustainability & API ────────────────────────────────────────────

// PART 3 PLAN (say out loud before writing):
// "I'll add an isSustainable helper that checks against a Set of approved
//  materials. Sets give us O(1) lookup and make it easy to add materials
//  without touching any conditional logic. Then I'll wire a mock API call
//  at the end of the pipeline."

const SUSTAINABLE_MATERIALS = new Set(["Organic Cotton", "Recycled Wool", "Hemp"]);

function isSustainable(material: string): boolean {
  // TODO: return SUSTAINABLE_MATERIALS.has(material)
  return false;
}

function enrichProduct(_product: RawProduct): ProcessedProduct {
  // TODO: spread _product and add region_tag + is_sustainable
  // Narrate: "Pulling enrichment into its own function means the pipeline
  // stays one line per concern."
  return {} as ProcessedProduct;
}

// Mock API — treat as a black box, just call it.
async function mockApiPush(products: ProcessedProduct[]): Promise<void> {
  console.log(`[Mock API] Pushing ${products.length} products...`);
  await new Promise((resolve) => setTimeout(resolve, 300));
  console.log("[Mock API] Success:", JSON.stringify(products, null, 2));
}

// ── MAIN PIPELINE ─────────────────────────────────────────────────────────────
// Narrate: "The pipeline itself has no logic — it just orchestrates helpers.
// If requirements change, I add or swap a helper, not rewrite this function."

async function processDonations(csv: string): Promise<void> {
  const rawProducts = parseCSV(csv);
  const validProducts = rawProducts.filter(isValidCondition);
  const processedProducts = validProducts.map(enrichProduct);
  await mockApiPush(processedProducts);
}
console.log("1231231231", 111);
// console.log(processDonations(RAW_CSV));
processDonations(RAW_CSV);

// ─────────────────────────────────────────────
// EDGE CASE TEST INPUTS — run these against your solution
// ─────────────────────────────────────────────
// The reviewer noted: "Was able to come up with a decently comprehensive
// set of additional test cases to cover edge cases I didn't provide examples
// for." — proactively raising these yourself earns problem-solving points.
//
// Mention to Bryan: "Before I call this done, let me think about edge cases..."
//
// 1. SCORE EXACTLY AT THE BOUNDARY
//    "Borderline Fleece,Tops,Recycled Wool,7"   → should PASS (7 is inclusive)
//    "Just Below,Tops,Organic Cotton,6"          → should FAIL
//
// 2. UNKNOWN CATEGORY
//    "Mystery Jacket,Outerwear,Cotton,8"         → region_tag: "Uncategorized"
//    (ask Bryan if Outerwear should be mapped — don't silently drop it)
//
// 3. MIXED SUSTAINABILITY IN SAME CATEGORY
//    "Poly Tee,Tops,Polyester,9"                → is_sustainable: false, region_tag: "Upper Body"
//    "Organic Tee,Tops,Organic Cotton,9"         → is_sustainable: true,  region_tag: "Upper Body"
//
// 4. EMPTY CSV / ONLY HEADERS
//    "style_name,category,material,condition_score\n"  → should return []
//
// 5. ALL ITEMS FILTERED OUT
//    Every item has score < 7                    → mockApiPush receives []
//    (ask Bryan: should we skip the API call or push an empty array?)
//
// 6. EXTRA WHITESPACE IN CSV
//    " Vintage Denim , Outerwear , Cotton , 8 "  → should still parse correctly

// ─────────────────────────────────────────────
// EXPECTED OUTPUT (happy path)
// ─────────────────────────────────────────────
// 4 items pass condition_score >= 7:
//
// { style_name: "Vintage Denim Jacket",  category: "Outerwear", material: "Cotton",         condition_score: 8,  region_tag: "Uncategorized", is_sustainable: false }
// { style_name: "Recycled Wool Sweater", category: "Knitwear",  material: "Recycled Wool",  condition_score: 9,  region_tag: "Upper Body",    is_sustainable: true  }
// { style_name: "Organic Cotton Tee",    category: "Tops",      material: "Organic Cotton", condition_score: 10, region_tag: "Upper Body",    is_sustainable: true  }
// { style_name: "Hemp Blend Skirt",      category: "Skirts",    material: "Hemp",           condition_score: 7,  region_tag: "Lower Body",    is_sustainable: true  }
//
// Filtered out: "Worn Out Jeans" (4), "Synthetic Puffer" (6)
