# Security

## Reporting

If you find a security issue in this repository (for example credential leakage in
docs or scripts), open a private report via GitHub Security Advisories on the
repo, or contact the maintainer listed in `CODEOWNERS`.

## Secrets

- Long-lived Home Assistant tokens and `.env` files must never be committed.
- Do not paste tokens, VIN, or plate numbers into issues, PRs, or logs.

## Vehicle controls

Remote commands (lock, climate, trunk, etc.) act on a real vehicle through
ha-carlinko. Use only with cars and accounts you own. This project does not
bypass CarLinko authentication.

## Scope

This card package only talks to **your** Home Assistant instance. It does not
call CarLinko cloud APIs directly.
