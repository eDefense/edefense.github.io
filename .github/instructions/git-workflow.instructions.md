---
description: Enforces the Git branching strategy, commit conventions, agent-driven documentation updates, and PR lifecycle for every code change
applyTo:
  - "**/*"
---
# Git Workflow Agent

## Purpose
Enforce a consistent Git workflow for every code change: feature branch creation, agent-driven documentation updates, atomic commits with detailed messages, and pull request lifecycle management.

## 🚨 CRITICAL: Protected Main Branch

**The `main` branch is PROTECTED and READ-ONLY for direct commits.**

### Absolute Rules

❌ **NEVER** run `git commit` while on `main` branch
❌ **NEVER** run `git push origin main` with local commits
❌ ❌ **NEVER** merge feature branches locally into `main`

✅ **ALWAYS** create a feature or hotfix branch
✅ **ALWAYS** open a pull request to merge into `main`
✅ **ALWAYS** get code review before merging
✅ **ALWAYS** ensure CI/CD passes before merging

### Why This Matters

- **Code Review**: All changes reviewed before reaching `main`
- **CI/CD**: Automated tests run on PRs before merge
- **Traceability**: Every change has a PR with description
- **Rollback**: Easy to identify and revert bad changes
- **Quality**: Security scans and agent reviews before merge

### If You Accidentally Commit to Main

```bash
# 1. DON'T PANIC - DON'T PUSH
git log -1  # Note the commit SHA

# 2. Undo the commit (keep changes)
git reset --soft HEAD~1

# 3. Create proper feature branch
git checkout -b feature/your-feature

# 4. Re-commit on correct branch
git add .
git commit -m "your message"

# 5. Push and create PR
git push -u origin feature/your-feature
gh pr create --base main --head feature/your-feature
```

## Workflow: Step-by-Step

### 1. Before Making Any Change

**Always start from `main` (up to date):**
```bash
git checkout main
git pull origin main
```

**Create a feature branch:**
```bash
git checkout -b <type>/<short-description>
```

**Branch naming convention:**

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<name>` | `feature/add-geo-ip-lookup` |
| Bug fix | `fix/<issue-or-description>` | `fix/null-pointer-in-detection` |
| Docs | `docs/<what>` | `docs/update-api-docs` |
| Refactor | `refactor/<component>` | `refactor/extract-rule-engine` |
| Config | `config/<what>` | `config/add-monthly-publish` |
| CI/CD | `ci/<what>` | `ci/add-build-pipeline` |
| Dependency | `deps/<what>` | `deps/upgrade-spring-boot-3.5` |

### 2. Make the Change

Implement the required code, configuration, or documentation change.

### 3. Run All Relevant Agents

After **every** code change, invoke the following agents before committing. Documentation must be in the same commit as the code.

#### Always Run:
- **`doc-maintainer`** — Update README, Javadoc, CHANGELOG, architecture docs
- **`code-reviewer`** — Review changed files for quality issues
- **`best-practice-advisor`** — Verify adherence to Java and Spring Boot standards

#### Run When Applicable:
- **`security-reviewer`** — Whenever changing security code, configs, authentication, or dependencies
- **`quality-engineer`** — Whenever adding/modifying tests, business logic, or pom.xml

#### Invocation Order:
1. `quality-engineer` (ensure tests pass and cover the change)
2. `security-reviewer` (check for vulnerabilities introduced)
3. `best-practice-advisor` (verify patterns and idioms)
4. `code-reviewer` (final code quality pass)
5. `doc-maintainer` (update all documentation — last, so it captures everything)

### 4. Stage All Changes

```bash
git add -A
```

Include documentation updates (README, CHANGELOG, Javadoc, etc.) in the same commit as the code change.

### 5. Commit with a Detailed Message

**Commit message format (Conventional Commits):**
```
<type>(<scope>): <short summary (≤72 chars)>

<body — what changed and why, not how>

<footer — breaking changes, issue refs>
```

**Types:** `feat`, `fix`, `docs`, `refactor`, `test`, `ci`, `chore`, `perf`, `build`

**Examples:**

```
feat(detection): add geo-IP enrichment to intrusion events

Enriches all detected intrusion events with geographic location data
using the MaxMind GeoIP2 database. Adds country, city, ASN, and
organization fields to the IntrusionEvent entity.

- Introduces GeoIPService for database lookups
- Adds GeoIPConfig for database path configuration
- Updates IntrusionEvent entity with new geo fields
- Adds Flyway migration V5__add_geo_ip_fields.sql
- 87% test coverage on GeoIPService

Closes #42
```

```
ci(workflow): add build pipeline triggered on push to main

Creates build.yml to compile and run all tests on every push to main,
ensuring regressions are caught before merge. Separate from the monthly
publish workflow (publish.yml).

- Configures Maven verify goal (compile + test + integration tests)
- Authenticates with GitHub Packages for internal dependency resolution
- Uses JDK 25 Temurin with Maven cache for incremental build speed
- Adds git-workflow agent documenting branching and PR standards
- Updates doc-maintainer agent with post-change commit workflow
```

```
fix(auth): prevent NPE in JwtTokenFilter when Authorization header absent

JwtTokenFilter threw a NullPointerException when requests arrived
without an Authorization header, causing 500 responses instead of 401.

- Adds null check before parsing Authorization header
- Adds unit test reproducing the NPE scenario
- Verified fix using in-memory H2 integration test

Fixes #17
```

### 6. Push to Feature Branch

```bash
git push origin <your-branch-name>
```

### 7. Create a Pull Request

When the feature/fix is complete and all agents have been run:

**PR title:** same as the commit message first line.

**PR description template:**
```markdown
## Summary
Short description of what this PR does and why.

## Changes
- Bullet list of specific changes

## Agents Run
- [x] quality-engineer
- [x] security-reviewer
- [x] best-practice-advisor
- [x] code-reviewer
- [x] doc-maintainer

## Testing
- Describe tests added or updated
- Test results: X passing, 0 failing

## Documentation Updated
- [ ] README.md
- [ ] CHANGELOG.md
- [ ] Javadoc / API docs
- [ ] Architecture docs (if applicable)

## Breaking Changes
None / List any breaking changes here

## Related Issues
Closes #XX
```

**Create PR via GitHub CLI:**
```bash
gh pr create \
  --title "feat(scope): short description" \
  --body-file .github/pr-template.md \
  --base main \
  --head feature/my-branch
```

**Or via GitHub UI:** push the branch, then click "Compare & pull request".

### 8. After PR is Merged

```bash
git checkout main
git pull origin main
git branch -d <your-branch-name>
```

---

## Rules

1. **Never commit directly to `main`** — all changes must go through a feature branch and PR.
2. **One concern per branch** — each branch addresses a single feature, fix, or task.
3. **Always run agents before committing** — documentation must be updated in the same commit as the code change.
4. **Commit messages must be descriptive** — future developers must understand what changed and why from the commit message alone.
5. **Keep branches short-lived** — merge or close within the sprint; avoid long-lived branches.
6. **All CI checks must pass** — the build pipeline on main must stay green.

---

## CHANGELOG Maintenance

Maintain `CHANGELOG.md` at the project root following [Keep a Changelog](https://keepachangelog.com/):

```markdown
# Changelog

## [Unreleased]
### Added
- New feature description

### Changed
- Changed behaviour description

### Fixed
- Bug fix description

### Security
- Security fix description

## [1.0.1] - 2026-03-01
### Fixed
- Previous release fixes...
```

The `doc-maintainer` agent is responsible for adding to the `[Unreleased]` section on every commit.

---

## Quick Reference

```bash
# Start a new change
git checkout main && git pull && git checkout -b feature/my-change

# After changes, run agents, then:
git add -A
git commit -m "feat(scope): short description

Detailed explanation of what changed and why.
- Documentation updated by doc-maintainer agent
- Tests added/updated by quality-engineer agent"

git push origin feature/my-change

# Create PR
gh pr create --title "feat(scope): short description" --base main

# After merge
git checkout main && git pull && git branch -d feature/my-change
```
