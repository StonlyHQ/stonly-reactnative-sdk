# om-open-pr: Stonly repo-local extension

Applies on top of the installed `om-open-pr` skill. Everything there still holds; this file changes
the commit (step 3) and the PR title so they follow the format `.githooks/commit-msg` enforces.

## Step 3: commit

- Clean tree with unpushed commits: do not commit and do not amend. Continue with step 4.
- Uncommitted changes: stage only the files this change touched, by explicit path. Never run
  `git add -A` or `git add .`. Leave unrelated files out and list them in the report.
- Header: `type(scope): [STON-XXXX] message`, one line, without the `(#id)` suffix.
  - `type`: `bug` and `security` → `fix`, `feature` → `feat`, `documentation` → `docs`,
    `dependencies` → `chore`, `refactor` → `refactor`.
  - `scope`: the area the change touches, using a scope from this repo's `git log`.
  - Ticket: `{issueId}` when it matches `STON-[0-9]+`, otherwise the first `STON-[0-9]+` in the
    branch name. With neither, write `Status: blocked` with the reason, release the lock as step 1
    does, and stop. Never invent a ticket.

## PR title

Use the same header format as the caller-supplied title, unless `--title` was passed.
