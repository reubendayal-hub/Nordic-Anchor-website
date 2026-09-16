/* Nordic Anchor — case config for Baker permit (Akbarjon Juraev / Konditorbager Haarby).
   New case = copy this file's shape into a new case folder + point index.html
   at it. Never edit the shared template to add a case. */
window.NA_CASE_CONFIG = {
  caseId: 'baker-akbar-juraev',
  accessCode: 'NA-2026-AJ83',
  formVersion: 'v4.0 — 16 Sep 2026',

  title: { line1: 'Positive List', line2: 'Application' },
  subtitle: 'Baker permit — Akbarjon Juraev & Konditorbager Haarby',

  schemes: ['positive-list-skilled'],

  workdrive: {
    // Dedicated shared folder for this case. NOTE: this account's external
    // permalinks are locked to View-only — no public "anyone can upload"
    // link is possible on this plan. This link only works because Akbar
    // and the employer contact were each individually added as members
    // (Share → "Add members by email address" → Access Level: Edit) —
    // not because the link itself is public. Never reuse this link for
    // another case; anyone new needs the same per-email invite step.
    uploadFolderUrl: 'https://workdrive.zohopublic.eu/folder/mialt0978c3049b764a508ce163b0d963eb71'
  },

  formspreeEndpoint: 'https://formspree.io/f/xoeadnqn',

  applicant: {
    prefill: { name: 'Akbarjon Juraev', nationality: 'Uzbekistan' },
    tabLabel: 'For Akbar'
  },
  employer: {
    prefill: { companyName: 'Konditorbager Haarby', address: 'Algade 28, 5683 Haarby' },
    tabLabel: 'For the Employer'
  }
};
