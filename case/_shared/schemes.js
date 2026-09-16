/* Nordic Anchor — scheme modules
   Each module contributes optional extra HTML sections to the employer
   and/or applicant panel, based on which scheme keys a case config lists.
   To add a fifth scheme: add a new key here. Never edit template.js for this. */

window.NA_SCHEME_MODULES = {

  'positive-list-skilled': {
    label: 'Positive List — Skilled Work',
    renderEmployer: function(config, fileField){
      return `
        <div class="section">
          <h2>Job function &amp; Positive List match</h2>
          <p class="hint">Confirm the DISCO-08 job code and function this role is matched against on the Positive List for Skilled Work.</p>
          <div class="field">
            <label>DISCO-08 code</label>
            <input type="text" name="scheme_disco_code" placeholder="e.g. 741100">
          </div>
          <div class="field">
            <label>Job function / title as it appears on the Positive List</label>
            <input type="text" name="scheme_job_function">
          </div>
        </div>
        <div class="section">
          <h2>Apprentice training obligation (Læreplads-AUB)</h2>
          <p class="hint">Please check your status on your Læreplads-AUB self-service (via Virk.dk) before answering — this is a hard requirement with no exceptions.</p>
          <div class="radio-group">
            <label><input type="radio" name="scheme_aub_status" value="Met target in latest contribution year, no merbidrag"> Met our apprentice training target in the latest contribution year, and were not charged merbidrag that year</label>
            <label><input type="radio" name="scheme_aub_status" value="Met target in 2 of last 3 years, no merbidrag in those years"> Met our target in 2 of the last 3 contribution years, and were not charged merbidrag in those 2 years</label>
            <label><input type="radio" name="scheme_aub_status" value="Not sure / need to check"> Not sure yet — need to check</label>
            <label><input type="radio" name="scheme_aub_status" value="Do not meet the requirement"> We do not currently meet this requirement</label>
          </div>
          <div class="field">
            <label>Optional — upload a screenshot of your AUB self-service status</label>
            ${fileField('scheme_aub_evidence', config)}
          </div>
        </div>`;
    },
    renderApplicant: function(config, fileField){
      return `
        <div class="section">
          <h2>Wage bracket — years of experience</h2>
          <p class="hint">SIRI benchmarks salary against a wage-statistics bracket based on completed years of relevant experience — rounded down, not interpolated.</p>
          <div class="field">
            <label>Completed years of relevant experience (rounded down)</label>
            <input type="number" min="0" step="1" name="scheme_experience_years">
          </div>
        </div>`;
    }
  },

  'positive-list-highered': {
    label: 'Positive List — Higher Education',
    renderEmployer: function(config, fileField){
      return `
        <div class="section">
          <h2>Salary assessment — sædvanlig løn (customary wage)</h2>
          <p class="hint">This scheme has no wage-bracket table. SIRI compares against the customary wage for the role using cash salary, pension, and holiday pay only — benefits in kind (housing, phone, meals) do not count.</p>
          <div class="field">
            <label>Base cash salary (DKK/month)</label>
            <input type="number" name="scheme_cash_salary">
          </div>
          <div class="field">
            <label>Employer pension contribution (DKK/month or %)</label>
            <input type="text" name="scheme_pension_contribution">
          </div>
          <div class="field">
            <label>Holiday pay allowance (DKK/month or %)</label>
            <input type="text" name="scheme_holiday_pay">
          </div>
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
    label: 'Pay Limit Scheme',
    renderEmployer: function(config, fileField){
      return `
        <div class="section">
          <h2>Pay Limit tier</h2>
          <p class="hint">No DISCO code or experience bracket applies to this scheme — only a flat salary threshold.</p>
          <div class="radio-group">
            <label><input type="radio" name="scheme_pay_limit_tier" value="Standard (552,000 DKK/year)"> Standard Pay Limit Scheme — 552,000 DKK/year</label>
            <label><input type="radio" name="scheme_pay_limit_tier" value="Supplementary (446,000 DKK/year)"> Supplementary Pay Limit Scheme — 446,000 DKK/year</label>
          </div>
          <div class="field">
            <label>Confirmed annual salary (DKK)</label>
            <input type="number" name="scheme_annual_salary">
          </div>
        </div>`;
    }
  },

  'fast-track': {
    label: 'Fast-Track Scheme',
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
