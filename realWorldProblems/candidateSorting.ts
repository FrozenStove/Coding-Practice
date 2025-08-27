/**
 * Scoring Rules:

Start with a base score of 100 for each candidate.

Age: If the candidate's age is within the minAge and maxAge range (inclusive), do nothing. If they are outside the range, they are ineligible; set their score to 0 and stop processing them.

Required Conditions: For each condition in the requiredConditions list, if the candidate does not have it in their conditions list, they are ineligible; set their score to 0.

Excluded Conditions: For each condition in the excludedConditions list, if the candidate has it in their conditions list, they are ineligible; set their score to 0.

Biomarker Score: The biomarker criterion has a name (e.g., "PD-L1"), a min value, and a max value.

If the candidate's biomarker value is below the min, subtract 15 points.

If the candidate's biomarker value is above the max, subtract 25 points.

Your function should return a list of the top 3 eligible candidates (score > 0), sorted in descending order of their score. If two candidates have the same score, sort them by their id in ascending order. Each item in the output list should be a string in the format "id:score".
 */
type Biomarker = { name: string; min: number; max: number };

type Criteria = {
  minAge: number;
  maxAge: number;
  requiredConditions: string[];
  excludedConditions: string[];
  biomarker: Biomarker;
};

type Candidate = {
  id: string;
  age: number;
  conditions: string[];
  biomarkers: { [key: string]: number };
};

const input = {
  trialCriteria: {
    minAge: 40,
    maxAge: 65,
    requiredConditions: ["NSCLC", "Metastatic"],
    excludedConditions: ["Heart Failure"],
    biomarker: { name: "GeneX", min: 0.5, max: 0.8 },
  },
  candidates: [
    {
      id: "p001",
      age: 45,
      conditions: ["NSCLC", "Metastatic"],
      biomarkers: { GeneX: 0.6 },
    },
    {
      id: "p002",
      age: 50,
      conditions: ["NSCLC", "Metastatic"],
      biomarkers: { GeneX: 0.9 },
    },
    {
      id: "p003",
      age: 70,
      conditions: ["NSCLC", "Metastatic"],
      biomarkers: { GeneX: 0.7 },
    },
    { id: "p004", age: 55, conditions: ["NSCLC"], biomarkers: { GeneX: 0.75 } },
    {
      id: "p005",
      age: 60,
      conditions: ["NSCLC", "Metastatic", "Heart Failure"],
      biomarkers: { GeneX: 0.8 },
    },
    {
      id: "p005",
      age: 60,
      conditions: ["NSCLC", "Metastatic", "Heart Failure"],
      biomarkers: { GeneX: 0.1 },
    },
    {
      id: "p006",
      age: 48,
      conditions: ["NSCLC", "Metastatic"],
      biomarkers: { GeneX: 0.4 },
    },
  ],
};

export function sortCandidates(
  criteria: Criteria,
  candidates: Candidate[]
): string[] {
  const eligibleCandidates = candidates
    .map((candidate) => {
      const candidateScore = {
        id: candidate.id,
        score: 100,
      };

      const candidateBiomarkerScore =
        candidate.biomarkers[criteria.biomarker.name];

      switch (true) {
        case candidate.age < criteria.minAge || candidate.age > criteria.maxAge:
          candidateScore.score = 0;
          break;
        case !verifyRequiredConditions(
          criteria.requiredConditions,
          candidate.conditions
        ):
          candidateScore.score = 0;
          break;
        case verifyExcludedConditions(
          criteria.excludedConditions,
          candidate.conditions
        ):
          candidateScore.score = 0;
          break;
        case candidateBiomarkerScore < criteria.biomarker.min:
          candidateScore.score -= 15;
          break;
        case candidateBiomarkerScore > criteria.biomarker.max:
          candidateScore.score -= 25;
          break;
        default:
          break;
      }

      return candidateScore;
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.id.localeCompare(b.id);
    });

  const topThreeCandidates = eligibleCandidates.slice(0, 3);

  return topThreeCandidates.map(
    (candidate) => `${candidate.id}:${candidate.score}`
  );
}

function verifyRequiredConditions(
  requirements: string[],
  conditions: string[]
): boolean {
  for (const requirement of requirements) {
    if (conditions.includes(requirement)) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

function verifyExcludedConditions(
  requirements: string[],
  conditions: string[]
): boolean {
  for (const requirement of requirements) {
    if (conditions.includes(requirement)) {
      return false;
    } else {
      continue;
    }
  }
  return true;
}

console.log(sortCandidates(input.trialCriteria, input.candidates));
