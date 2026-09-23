# StepOut shared sales dashboard

Reads the same `sales_leads` collection as Android's SalesTeamScreen. Uses the existing Firebase Auth session and App Check. No duplicate database, new payment processor, write endpoint, or commission calculation is introduced.

Agent queries include `where('salesAgentId', '==', user.uid)`. Production rules were inspected on 2026-09-23: God can read all leads; active accounts can read their assigned leads; all client writes are denied. UI additionally requires active sales staff status for non-administrators. Staff suspension is checked at sign-in, not continuously; the existing rules do not check staff status on each lead read.

The owner view is enabled only after an authorized read of sales_invites succeeds. Records render as text, not HTML. Listeners stop and records clear on sign-out. Snapshot errors clear the displayed records. No records are written to localStorage.

Loads 50 documents at a time, expanding on request. No date ordering is requested from Firestore to avoid introducing an undeployed composite index. Loaded records are sorted by submission time; counts are explicitly partial. Unknown currency is shown as unknown rather than assumed. No lifetime earnings total is inferred.

Verified with mock browser tests: agent ownership constraint, inactive-staff UI denial, owner overview, snapshot update, hostile-text rendering, sign-out cleanup, and 390px layout. Production ownership rules inspected read-only. No customer sale or commission was created or changed, and no real authenticated agent session was available for end-to-end testing.

Existing purchase verification and admin commission review remain authoritative. This dashboard does not establish that a real Play purchase-to-commission journey has been validated.
