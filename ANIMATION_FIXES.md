# Animation And Control Polish Fixes

## Cursor Fixes

- Normalized terminal cursor timing with `--pho-caret-blink-duration`.
- Changed global `.pho-blink::after`, `Input` fake caret, `TerminalPrompt`, footer prompt, `LessonRow`, and `ProgressBar` current indicators to a steadier phosphor block blink.
- Reduced cursor glow through `--pho-caret-glow` so carets stay crisp and avoid blurry halos.
- Added or preserved `prefers-reduced-motion` handling for cursor animations.

## Placeholder Fixes

- Added reusable placeholder tokens: `--pho-placeholder-color` and `--pho-placeholder-opacity`.
- Removed inherited text-shadow from placeholders in `Input`, `Textarea`, and admin content editor controls.
- Kept placeholder text readable but secondary by using a muted phosphor value instead of the darkest faint green.

## Switch Removal

- Removed `src/components/atoms/Switch/Switch.stories.tsx` so Storybook no longer renders Switch-based examples.
- Added `DropdownMenu` boolean-setting examples for Enabled / Disabled, On / Off, and Default / Reduced / Disabled.
- Removed `Switch`, `SwitchControl`, `SwitchField`, and the `SwitchField` molecule alias from source exports.
- Updated README and audit docs to prefer `DropdownMenu` or `Select` for boolean settings.

## Retro Effects Added

- Added tokenized scanline, focus glow, active glow, caret glow, and flicker opacity controls.
- Added a subtle scanline overlay inside open dropdown menus.
- Added terminal-style focus glow to inputs, textareas, selects, dropdown triggers, and admin controls.
- Added restrained hover/focus transitions for buttons, selects, dropdowns, and admin inputs without applying glow to long-form prose.

## Removed Components

- `Switch`
- `SwitchControl`
- `SwitchField`

Use explicit `Select` or `DropdownMenu` options in new UI.
