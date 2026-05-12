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

## Automatic Versioning

The publish workflow updates `package.json` and `package-lock.json` before
publishing:

- `dev` runs `npm version prerelease --preid dev --no-git-tag-version`, then
  publishes with `--tag next`.
- `prod` runs `npm version patch --no-git-tag-version`, then publishes with
  `--tag latest`.

The version bump is committed back to the source branch with
`[skip ci] [skip publish]` to avoid workflow loops.

Manual dispatch supports custom `dist-tag` and version bump strategy.

## Required GitHub Setup

Create these branches on GitHub:

```bash
git push origin master:dev
git push origin master:prod
```

Set `dev` as the default branch if you want all PR work to start there.

Configure repository secrets:

- `NPM_TOKEN`: npm automation token with publish access for
  `@sektant1/phosphor-ui`.

Configure environments:

- `npm-development`: used by prerelease publishes from `dev`.
- `npm-production`: used by stable publishes from `prod`.
- `github-pages`: used by Storybook production deploy.

Recommended branch protection:

- Require `CI / Validate package` on `dev` and `prod`.
- Require PR review before merging into `prod`.
- Restrict direct pushes to `prod` except for the release bot/version bump.
