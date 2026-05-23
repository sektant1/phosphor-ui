# Branching and Deploy

This repo uses two long-lived release branches:

- `dev`: integration branch. Every push runs CI and publishes a prerelease npm
  package with the `next` dist-tag.
- `prod`: production branch. Every push runs CI, publishes the stable npm package
  with the `latest` dist-tag, and deploys Storybook to GitHub Pages.

Short-lived branches should target `dev`:

- `feature/*`
- `fix/*`
- `chore/*`
- `release/*`

## Flow

1. Open feature/fix PRs into `dev`.
2. Merge `dev` into `prod` when ready to release.
3. The `prod` push publishes the npm package and deploys Storybook.

Enable the tracked release hook once per clone:

```bash
git config core.hooksPath .githooks
```

Before a push to `prod`, the hook runs the same package validation used by CI,
checks that the next prod patch version is still available on npm, and runs an
`npm publish --dry-run`. Non-`prod` pushes skip this preflight.

## Automatic Versioning

The publish workflow updates `package.json` and `package-lock.json` before
publishing:

- `dev` runs `npm version prerelease --preid dev --no-git-tag-version`, then
  publishes with `--tag next`.
- `prod` runs `npm version patch --no-git-tag-version`, then publishes with
  `--tag latest`.

The version bump is committed back to the source branch with
`[skip ci] [skip publish]` to avoid workflow loops. The workflow publishes before
committing that bump, so a package that npm refuses to publish does not advance
the branch version.

Manual dispatch supports production and development channels plus a custom
version bump strategy.

## Required GitHub Setup

Create these branches on GitHub:

```bash
git push origin master:dev
git push origin master:prod
```

Set `dev` as the default branch if you want all PR work to start there.

Configure repository secrets, or environment secrets on both npm environments:

- `NPM_TOKEN`: npm automation token with publish access for
  `phosphor-ui`. Do not use a read-only token. If 2FA is enabled on npm, use an
  automation token.

Use `.npmrc.example` as the local template if you need to publish from your
machine. Keep the real token in your shell environment as `NPM_TOKEN`; do not
commit a real `.npmrc`.

Configure environments:

- `npm-development`: used by prerelease publishes from `dev`.
- `npm-production`: used by stable publishes from `prod`.
- `github-pages`: used by Storybook production deploy.

If GitHub Actions fails at `npm whoami` with `E401`, the selected environment
does not have a valid `NPM_TOKEN` available, or the npm token no longer has
publish access. Regenerate the token in npm and update the GitHub secret.

Recommended branch protection:

- Require `CI / Validate package` on `dev` and `prod`.
- Require PR review before merging into `prod`.
- Restrict direct pushes to `prod` except for the release bot/version bump.
