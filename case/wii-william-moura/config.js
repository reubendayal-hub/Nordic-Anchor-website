/* Nordic Anchor — case config for Pay Limit permit
   (William Felipe Dos Santos Moura / WII Group).
   New case = copy this file's shape into a new case folder + point index.html
   at it. Never edit the shared template to add a case. */
window.NA_CASE_CONFIG = {
  caseId: 'wii-william-moura',
  accessCode: 'NA-2026-WM47',
  formVersion: 'v1.0 — 16 Sep 2026',

  title: { line1: 'Pay Limit', line2: 'Application' },
  // Digiproman.dk ApS is WII Group's legal Danish entity (confirmed) — the
  // one that actually appears on the AR6 filing and the POA.
  subtitle: 'Pay Limit permit — William Felipe Dos Santos Moura & WII Group (Digiproman.dk ApS)',

  schemes: ['pay-limit'],

  workdrive: {
    // Folder created ("William Moura - WII Group"). REMAINING STEP: this
    // link only works for people added as members — go to the folder →
    // Share → "Add members by email address" → Access Level: Edit → Share,
    // once William's and the employer contact's emails are known. Until
    // that's done for each of them, they'll hit an access wall here.
    uploadFolderUrl: 'https://workdrive.zohopublic.eu/folder/q49ty3db6ad1d687f4c8ab071'
  },

  // Reuben chose to reuse one standard Formspree form ("Employee &
  // Employer Questionnaire") across cases, rather than a new form per
  // case. This only works because every submission also carries explicit
  // case_id / case_name / case_schemes fields (see template.js's submit
  // handler) — whatever downstream process reads these submissions must
  // split on case_id, not assume one form == one case.
  formspreeEndpoint: 'https://formspree.io/f/xoeadnqn',

  applicant: {
    // Nationality intentionally left blank — not yet confirmed.
    prefill: { name: 'William Felipe Dos Santos Moura', nationality: '' },
    tabLabel: 'For William'
  },
  employer: {
    // Company name and CVR confirmed from the draft POA (Digiproman.dk
    // ApS, CVR 46654765). Registered address still blank — not on the
    // POA — TODO(Reuben): add it.
    prefill: { companyName: 'Digiproman.dk ApS', cvr: '46654765', address: '' },
    tabLabel: 'For the Employer'
  }
};
