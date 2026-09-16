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
    // TODO(Reuben): create a dedicated Zoho WorkDrive "Collect Files" link
    // for this case (WorkDrive → Collect Files → Create Collection →
    // External) and paste the URL here. No link exists yet for this case.
    collectFilesUrl: 'PASTE-COLLECT-FILES-LINK-HERE'
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
