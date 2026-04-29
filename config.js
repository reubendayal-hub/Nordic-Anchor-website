/**
 * NORDIC ANCHOR — SIRI Government Fee Configuration
 * ──────────────────────────────────────────────────
 * SIRI updates government fees annually (typically 1 January).
 * To update fees across the entire site, edit the values below
 * and redeploy. All fee labels referencing these values will
 * update automatically.
 *
 * Last updated: January 2026
 * Source: SIRI / nyidanmark.dk
 */

const SIRI_FEES = {
  year: 2026,

  // Work & residence permits (main applicant)
  workPermit: 6810,           // Fast-Track, Pay Limit, Job Change

  // Family / accompanying members
  familyMember: 3080,         // Per accompanying family member

  // Job-seeking permit
  jobSeeking: 0,              // No government fee

  // EU residence certificate
  euNational: 0,              // Free for EU/EEA nationals
  euFamilyNonEU: 3080,        // Non-EU family members of EU nationals

  // Permanent residence
  permanentResidence: 6810,   // Same as work permit

  // Fast-Track certification (company)
  fastTrackCertification: 0,  // No government fee for certification itself

  // Currency
  currency: 'DKK',

  // Note shown next to all government fees
  disclaimer: 'Government fee paid directly to SIRI — separate from Nordic Anchor\'s assistance fee. Fees are set by SIRI and subject to change annually.'
};

// Make available globally
window.SIRI_FEES = SIRI_FEES;
