# 🛡️ Security Specification: Flux Agency Legal Hub

## 1. Data Invariants
- An `Intake` matter MUST belong to a valid `clientId` and `serviceId`.
- Only the `clientId` (owner) or `Admin` can read the `Intake` details.
- Once a matter is set to `closed`, no further edits to `narrative` or `serviceId` are permitted.
- `Incidents` (Breaches) are immutable once reported to authorities.

## 2. The Dirty Dozen (Test Payloads)
The following payloads MUST be rejected with `PERMISSION_DENIED`:

1. **Identity Spoofing**: Attempt to create an `Intake` with a `clientId` that does not match `request.auth.uid`.
2. **PII Leak**: Authenticated user attempts to `get` an `Intake` document belonging to another user.
3. **Ghost Field Injection**: Attempt to `update` a matter while adding a hidden `isVerified: true` field.
4. **State Shortcutting**: Attempt to change matter `status` from `draft` directly to `closed` without attorney review.
5. **ID Poisoning**: Attempt to create a document with a 2MB string as the Document ID.
6. **Timestamp Deception**: Attempt to set `createdAt` to a past date instead of `request.time`.
7. **Privilege Escalation**: Attempt to update `isAdmin` field in a user profile.
8. **Orphaned Record**: Attempt to create a matter for a non-existent `serviceId`.
9. **Bulk Scrape**: Attempt to `list` all matters in the collection without a `where('clientId', '==', uid)` clause.
10. **Shadow Update**: Attempt to change the `ownerId` of an existing matter.
11. **Resource Exhaustion**: Sending a 10MB `narrative` string.
12. **Method Bypass**: Attempting a `delete` on an active litigation matter.

## 3. Test Runner
Verification will be performed via `firestore.rules.test.ts` (drafted in the implementation).
