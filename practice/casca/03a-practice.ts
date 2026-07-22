// // "Model a payment submission pipeline that records a payment attempt and an immutable ledger entry for each financial event. The system must handle retries, partial network failures, and eventual settlement status updates. The key requirement is that payment intent must be idempotent, but the ledger is append-only."

// type PaymentSubmission = {
//   id: number;
//   timestamp: Date;
//   retryCount: number;
//   amountInCents: number;
//   idempotency: string;
//   account: number;
// };

// type Status = "settled" | "failed" | "pending";

// // sql settings must prevent any DELETE actions

// type LedgerEntry = {
//   id: number;
//   timestamp: Date;
//   status: Status;
//   type: "debit" | "credit";
//   amountInCents: number;
//   account: number;
// };

// "Model a KYC onboarding workflow where a customer uploads an identity document, a processing service extracts metadata, and the document can either pass automated validation, require manual review, or be rejected. The system must tolerate retries, duplicate uploads, and partial OCR or classifier failure."

type PaymentSubmissionStatus =
  | { type: "pending"; attemptNumber: number }
  | { type: "authorized"; authCode: string; attemptNumber: number }
  | { type: "settled"; settlementReference: string; attemptNumber: number }
  | { type: "failed"; reason: string; attemptNumber: number }
  | { type: "reversed"; reversalReference: string; attemptNumber: number };

function renderPending(a) {}
function renderAuthorized(a) {}
function renderFailed(a) {}
function renderReversed(a) {}

function handlePaymentStatus(status: PaymentSubmissionStatus) {
  switch (status.type) {
    case "pending":
      return renderPending(status);
    case "authorized":
      return renderAuthorized(status); // status is narrowed to the 'authorized' variant here
    case "settled":
      return renderSettled(status); // narrowed to 'settled' here — settlementReference is non-optional
    case "failed":
      return renderFailed(status);
    case "reversed":
      return renderReversed(status);
    default:
      const _exhaustive: never = status; // compile error if a variant is ever added and not handled here
      throw new Error(`Unhandled status: ${JSON.stringify(status)}`);
  }
}

function renderSettled(status: Extract<PaymentSubmissionStatus, { type: "settled" }>) {
  return status.settlementReference; // no error, no optional chaining — TS knows it exists
}
