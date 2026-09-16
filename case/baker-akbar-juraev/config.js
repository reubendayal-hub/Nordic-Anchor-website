/* Nordic Anchor — case config for Baker permit (Akbarjon Juraev / Konditorbager Haarby).
   New case = copy this file's shape into a new case folder + point index.html
   at it. Never edit the shared template to add a case. */
window.NA_CASE_CONFIG = {
  caseId: 'baker-akbar-juraev',
  accessCode: 'NA-2026-AJ83',
  formVersion: 'v3.0 — 16 Sep 2026',

  title: { line1: 'Positive List', line2: 'Application' },
  subtitle: 'Baker permit — Akbarjon Juraev & Konditorbager Haarby',

  schemes: ['positive-list-skilled'],

  workdrive: {
    // TODO(Reuben): replace with this case's dedicated Zoho WorkDrive
    // "Collect Files" link (WorkDrive → Collect Files → Create Collection →
    // External). Currently still the old shared public folder link.
    collectFilesUrl: 'https://workdrive.zohopublic.eu/folder/mialt0978c3049b764a508ce163b0d963eb71'
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
