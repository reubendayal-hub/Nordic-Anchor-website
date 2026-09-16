/* Nordic Anchor — case config for Pay Limit permit
   (William Felipe Dos Santos Moura / WII Group).
   New case = copy this file's shape into a new case folder + point index.html
   at it. Never edit the shared template to add a case. */
window.NA_CASE_CONFIG = {
  caseId: 'wii-william-moura',
  accessCode: 'NA-2026-WM47',
  formVersion: 'v1.0 — 16 Sep 2026',

  title: { line1: 'Pay Limit', line2: 'Application' },
  // TODO(Reuben): confirm "WII Group" vs the legal entity found on the
  // draft POA — "Digiproman.dk ApS", CVR 46654765. Shown here as both
  // until confirmed, since they may not be the same thing to the client.
  subtitle: 'Pay Limit permit — William Felipe Dos Santos Moura & WII Group (Digiproman.dk ApS)',

  schemes: ['pay-limit'],

  workdrive: {
    // TODO(Reuben): create a new folder for this case in WorkDrive, then
    // paste its link here. IMPORTANT — the account's external permalinks
    // are locked to View-only (no plan upgrade fixes this), so a public
    // "anyone can upload" link does NOT work. Instead, replicate the
    // Baker-case process: once you have William's and the employer
    // contact's email addresses (from their form submission), go to the
    // folder → Share → "Add members by email address" → set Access Level
    // to Edit → Share, for EACH of them individually. Only then will this
    // link actually let them upload. Never reuse Baker's folder link here.
    uploadFolderUrl: 'PASTE-SHARED-FOLDER-UPLOAD-LINK-HERE'
  },

  // TODO(Reuben): create a new, dedicated Formspree form for this case
  // (never reuse the Baker case's endpoint — a shared endpoint leaks its
  // original form name into notification subject lines) and paste the
  // endpoint URL here, e.g. https://formspree.io/f/xxxxxxxx
  formspreeEndpoint: 'PASTE-DEDICATED-FORMSPREE-ENDPOINT-HERE',

  applicant: {
    // Nationality intentionally left blank — not yet confirmed.
    prefill: { name: 'William Felipe Dos Santos Moura', nationality: '' },
    tabLabel: 'For William'
  },
  employer: {
    // Company name and CVR taken from the draft POA (Digiproman.dk ApS,
    // CVR 46654765) — TODO(Reuben): confirm this is the correct legal
    // entity for "WII Group" before this case goes live. Registered
    // address still blank — not on the POA, please add it.
    prefill: { companyName: 'Digiproman.dk ApS', cvr: '46654765', address: '' },
    tabLabel: 'For the Employer'
  }
};
