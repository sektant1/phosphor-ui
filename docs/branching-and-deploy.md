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
version bump strategy. Production dispatches may use `patch`, `minor`, or
`major`; prerelease bumps are reserved for the development channel so a `-dev`
build cannot be published with the `latest` dist-tag.

Before publishing, the workflow verifies the target version is not already on
npm and checks that `GITHUB_TOKEN` can push the post-publish version commit back
to the source branch. This prevents publishing a package that the repository
cannot record afterward.

## Required GitHub Setup

Create these branches on GitHub:

```bash
git push origin master:dev
git push origin master:prod
```

Set `dev` as the default branch if you want all PR work to start there.

Create an npm automation token with publish access for `phosphor-ui`, then add
it as `NPM_TOKEN` to both GitHub environments:

- `npm-production`
- `npm-development`

The publish workflow passes that secret to npm as `NODE_AUTH_TOKEN` for
`npm whoami`, `npm publish --dry-run`, and `npm publish --provenance`.

Use `.npmrc.example` as the local template only if you need to publish from your
machine with a token. Keep the real token in your shell environment as
`NODE_AUTH_TOKEN`; do not commit a real token in `.npmrc`.

Configure environments:

- `npm-development`: used by prerelease publishes from `dev`.
- `npm-production`: used by stable publishes from `prod`.
- `github-pages`: used by Storybook production deploy.

Allow the workflow bot to push version commits to `dev` and `prod`, or the
publish workflow will fail before npm publish. If branch protection blocks that,
grant `github-actions[bot]` bypass rights or use a dedicated release token.

If GitHub Actions fails at `npm whoami` with `E401` or `E403`, regenerate the
npm automation token and update `NPM_TOKEN` in both GitHub environments. If it
fails during `npm publish --provenance`, keep `id-token: write` enabled in the
workflow permissions.

Recommended branch protection:

- Require `CI / Validate package` on `dev` and `prod`.
- Require PR review before merging into `prod`.
- Restrict direct pushes to `prod` except for the release bot/version bump.
