/* Nordic Anchor — case config for Pay Limit permit
   (William Felipe Dos Santos Moura / WII Group).
   New case = copy this file's shape into a new case folder + point index.html
   at it. Never edit the shared template to add a case. */
window.NA_CASE_CONFIG = {
  caseId: 'wii-william-moura',
  accessCode: 'NA-2026-WM47',
  formVersion: 'v1.0 — 16 Sep 2026',

  title: { line1: 'Pay Limit', line2: 'Application' },
  subtitle: 'Pay Limit permit — William Felipe Dos Santos Moura & WII Group',

  schemes: ['pay-limit'],

  workdrive: {
    // TODO(Reuben): create a new folder for this case in WorkDrive
    // (My Folders → New → Folder), share it with "Anyone with the link
    // can upload" permission, and paste that link here. (Collect Files
    // needs a paid Team/Business plan — not available on the current
    // Starter plan — so we use a plain per-case shared folder instead,
    // same as the Baker case. Never reuse Baker's folder link here.)
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
    // CVR and full registered address intentionally left blank — please
    // confirm WII Group's exact legal name, CVR, and address before this
    // case goes live so the prefill matches the AR6 filing exactly.
    prefill: { companyName: 'WII Group', address: '' },
    tabLabel: 'For the Employer'
  }
};
