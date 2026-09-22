# What's Out Persona BizCard

A mobile-first sales presentation for in-person What’s Out demonstrations. Choose a persona, show the matching QR card, and let the customer continue on their own phone.

## Persona routes

- **Free User:** opens the live free web experience at `https://whatsout-fcc29.web.app/`.
- **User+:** opens a focused benefits page before continuing to What’s Out.
- **Business Owner:** opens the business presentation covering listings, events, VIP invitations, and admission tools.

## Evidence and expectations

Claims were audited against the canonical project at `C:/Users/OldSk/AndroidStudioProjects/whatsout`. See `data/benefits-audit.json`. Release-gated features are not advertised as universally available.

Searches are current server-backed requests, but “real time” does not mean instant. Load time and completeness vary with network conditions, device performance, listing density, selected area, current data, and service availability.

## Preview

Run `python -m http.server 4173` in this folder, then open `http://localhost:4173/`.

## GitHub Pages

The configured URL is `https://eddydavila.github.io/whatsout-bizcard/`. Publish as `EddyDavila/whatsout-bizcard` and enable GitHub Pages from the `main` branch root. If the account or repository changes, update the configuration, regenerate every QR, and test every scan.

## Reuse

This follows the `recall-bizcard` contract. Replace brand assets and persona content, update `bizcard.config.json`, regenerate QR codes, and repeat the evidence audit for each app.

Created for Eddy Davila and Bitter Softworks.
