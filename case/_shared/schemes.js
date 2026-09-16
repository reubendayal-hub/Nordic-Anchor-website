/* Nordic Anchor — scheme modules
   Each module contributes optional extra HTML sections to the employer
   and/or applicant panel, based on which scheme keys a case config lists.
   To add a fifth scheme: add a new key here. Never edit template.js for this.

   DISCO code, job function, and salary breakdown are common fields (asked
   for every scheme on SIRI's own AR6 application) — they live in
   template.js, not here. Only genuinely scheme-specific questions belong
   in a module. */

window.NA_SCHEME_MODULES = {

  'positive-list-skilled': {
    label: 'The Positive List for Skilled Work',
    renderEmployer: function(config, fileField){
      return `
        <div class="section">
          <h2>Apprentice training obligation (Læreplads-AUB)</h2>
          <p class="hint">Please check your status on your Læreplads-AUB self-service (via Virk.dk) before answering — this is a hard requirement with no exceptions. These are the exact two questions SIRI asks on the application.</p>
          <div class="field">
            <label>As an employer, do you have a targeted number of trained apprentices (måluddannelsesratio)?</label>
            <div class="radio-group">
              <label><input type="radio" name="scheme_aub_maluddannelsesratio" value="Yes"> Yes</label>
              <label><input type="radio" name="scheme_aub_maluddannelsesratio" value="No"> No</label>
            </div>
          </div>
          <div class="field">
            <label>As an employer, have you paid additional contribution (merbidrag)?</label>
            <div class="radio-group">
              <label><input type="radio" name="scheme_aub_merbidrag" value="Yes"> Yes</label>
              <label><input type="radio" name="scheme_aub_merbidrag" value="No"> No</label>
            </div>
          </div>
          <div class="field">
            <label>Optional — upload a screenshot of your AUB self-service status</label>
            ${fileField('scheme_aub_evidence', config)}
          </div>
        </div>`;
    }
  },

  'positive-list-highered': {
    label: 'The Positive List for People with a Higher Education',
    renderEmployer: function(config, fileField){
      return `
        <div class="section">
          <h2>Salary assessment note</h2>
          <p class="hint">This scheme has no DISCO wage-bracket table. SIRI instead compares against the customary wage (sædvanlig løn) for the role using cash salary, pension, and holiday pay from the Salary section below — benefits in kind (housing, phone, meals) do not count.</p>
        </div>`;
    },
    renderApplicant: function(config, fileField){
      return `
        <div class="section">
          <h2>Education credential assessment</h2>
          <p class="hint">Your degree needs a Danish equivalency assessment as part of this scheme.</p>
          <div class="field">
            <label>Upload your degree certificate(s) and transcripts</label>
            ${fileField('scheme_degree_upload', config, {multiple:true})}
          </div>
          <div class="field">
            <label>Have you already applied for or received a credential assessment?</label>
            <div class="radio-group">
              <label><input type="radio" name="scheme_credential_status" value="Already assessed"> Already assessed</label>
              <label><input type="radio" name="scheme_credential_status" value="Applied, awaiting result"> Applied, awaiting result</label>
              <label><input type="radio" name="scheme_credential_status" value="Not yet applied"> Not yet applied</label>
            </div>
          </div>
        </div>`;
    }
  },

  'pay-limit': {
    label: 'The Pay Limit scheme',
    renderEmployer: function(config, fileField){
      return `
        <div class="section">
          <h2>Pay Limit tier</h2>
          <p class="hint">No DISCO wage-bracket applies to this scheme — only a flat salary threshold, checked against the Salary section below.</p>
          <div class="radio-group">
            <label><input type="radio" name="scheme_pay_limit_tier" value="Standard (552,000 DKK/year)"> Standard Pay Limit scheme — 552,000 DKK/year</label>
            <label><input type="radio" name="scheme_pay_limit_tier" value="Supplementary (446,000 DKK/year)"> Supplementary Pay Limit scheme — 446,000 DKK/year</label>
          </div>
        </div>`;
    }
  },

  'fast-track': {
    label: 'The Fast-Track scheme',
    renderEmployer: function(config, fileField){
      return `
        <div class="section">
          <h2>Fast-Track certification</h2>
          <div class="radio-group">
            <label><input type="radio" name="scheme_fasttrack_status" value="Certified"> Currently certified</label>
            <label><input type="radio" name="scheme_fasttrack_status" value="Certification pending"> Certification applied for, pending</label>
            <label><input type="radio" name="scheme_fasttrack_status" value="Not certified"> Not yet certified</label>
          </div>
          <div class="field">
            <label>Certification expiry date (if known)</label>
            <input type="date" name="scheme_fasttrack_expiry">
          </div>
          <div class="field">
            <label>Underlying track</label>
            <select name="scheme_fasttrack_track">
              <option value="">— Select —</option>
              <option value="Pay Limit">Pay Limit track</option>
              <option value="Supplementary Pay Limit">Supplementary Pay Limit track</option>
              <option value="Short-Term">Short-Term track (max 90 days)</option>
              <option value="Researcher">Researcher track</option>
              <option value="Educational">Educational track</option>
            </select>
          </div>
        </div>`;
    }
  }

};
