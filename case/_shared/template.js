/* Nordic Anchor — shared case-intake template engine.
   A case's index.html only loads schemes.js + summary.js + its own
   config.js + this file. Everything else is built here from
   window.NA_CASE_CONFIG. New case = new config, never a template edit.
   New scheme module = edit schemes.js only. */

(function(){
  const config = window.NA_CASE_CONFIG;
  if (!config){
    document.body.innerHTML = '<p style="padding:40px;font-family:sans-serif;color:#a33;">Missing case configuration (NA_CASE_CONFIG) — check that config.js loaded before template.js.</p>';
    return;
  }

  const STORAGE_KEY = 'na_intake_' + config.caseId;
  const FORM_VERSION = config.formVersion;
  console.log('Nordic Anchor intake form —', config.caseId, FORM_VERSION);

  function esc(v){
    return (v === undefined || v === null) ? '' : String(v);
  }

  // Disabled file input + link out to this case's dedicated WorkDrive
  // shared-folder link (Collect Files needs a paid Team/Business plan, so
  // each case gets its own plain shared folder instead — never reuse one
  // case's folder link for another). File selections cannot be restored
  // on save/resume (browser security limitation) so uploads are
  // intentionally routed off-form.
  function fileField(name, cfg, opts){
    opts = opts || {};
    const multiple = opts.multiple ? ' multiple' : '';
    const url = cfg.workdrive && cfg.workdrive.uploadFolderUrl;
    return `
      <input type="file" name="${name}"${multiple} disabled>
      ${opts.hint ? `<div class="filehint">${opts.hint}</div>` : ''}
      <div class="upload-paused">Please upload this file via our <a href="${esc(url)}" target="_blank">secure upload folder</a>.</div>`;
  }

  function renderSchemeSections(panel){
    const keys = config.schemes || [];
    return keys.map(function(key){
      const mod = window.NA_SCHEME_MODULES[key];
      if (!mod) { console.warn('Unknown scheme module:', key); return ''; }
      const fn = panel === 'employer' ? mod.renderEmployer : mod.renderApplicant;
      return fn ? fn(config, fileField) : '';
    }).join('');
  }

  const appPrefill = (config.applicant && config.applicant.prefill) || {};
  const empPrefill = (config.employer && config.employer.prefill) || {};
  const applicantTabLabel = (config.applicant && config.applicant.tabLabel) || 'For the Applicant';
  const employerTabLabel = (config.employer && config.employer.tabLabel) || 'For the Employer';

  const APP_HTML = `
<div class="gate-screen" id="gateScreen">
  <div class="site-bar">
    <div class="logo-pill">
      <img src="https://www.nordicanchor.dk/logo-transparent.png" alt="Nordic Anchor">
    </div>
  </div>
  <div id="gate">
    <div class="gate-card">
      <div class="eyebrow">NORDIC ANCHOR</div>
      <h1>Case Access</h1>
      <p style="font-size:14px;color:var(--muted);margin-bottom:20px;">Enter the access code provided by Nordic Anchor to continue.</p>
      <input type="text" id="codeInput" placeholder="Access code">
      <div class="gate-error" id="gateError">Incorrect code — please check and try again.</div>
      <button class="submit-btn" id="gateSubmit">Continue</button>
      <div class="gate-version" id="gateVersion">Form version: ${esc(FORM_VERSION)}</div>
    </div>
  </div>
</div>

<div id="mainSiteBar" class="site-bar" style="display:none;">
  <div class="logo-pill">
    <img src="https://www.nordicanchor.dk/logo-transparent.png" alt="Nordic Anchor">
  </div>
</div>

<div class="wrap" id="mainForm" style="display:none;">
  <header>
    <div class="eyebrow">Nordic Anchor · Case Intake</div>
    <h1>${esc(config.title && config.title.line1)} <em>${esc(config.title && config.title.line2)}</em></h1>
    <div class="subtitle">${esc(config.subtitle)}</div>
    <div class="rule"></div>
  </header>

  <div class="intro">
    This page collects the documents and information needed to prepare the application.
    Please complete <strong>only the section that applies to you</strong> — Employer or Applicant.
    A <strong>power of attorney</strong> will be sent separately, prefilled and ready to sign — no action needed on that here.
    <br><br>
    <strong>Upload your documents here:</strong>
    <a href="${esc(config.workdrive && config.workdrive.uploadFolderUrl)}" target="_blank" style="color:var(--gold-dk);font-weight:600;">Nordic Anchor secure upload folder →</a>
    <br><br>
    <strong>You can save your progress and come back later</strong> — see the button at the bottom of the form.
  </div>

  <div class="tabs">
    <button class="tab-btn active" data-panel="employer">${esc(employerTabLabel)}</button>
    <button class="tab-btn" data-panel="applicant">${esc(applicantTabLabel)}</button>
  </div>

  <form id="intakeForm" action="${esc(config.formspreeEndpoint)}" method="POST" enctype="multipart/form-data">

    <!-- ============ EMPLOYER PANEL ============ -->
    <div class="panel active" id="panel-employer">

      <div class="section">
        <h2>What is the applicant applying for?</h2>
        <div class="radio-group">
          <label><input type="radio" name="case_permit_type" value="A residence permit as well as a work permit (applicant will live in Denmark)"> A residence permit as well as a work permit — the applicant will live in Denmark</label>
          <label><input type="radio" name="case_permit_type" value="Only a work permit (applicant will live abroad and commute)"> Only a work permit — the applicant will live abroad and commute to Denmark</label>
        </div>
      </div>

      <div class="section">
        <h2>Company details</h2>
        <div class="field">
          <label>Company name</label>
          <input type="text" name="employer_company_name" value="${esc(empPrefill.companyName)}">
        </div>
        <div class="field">
          <label>CVR number</label>
          <input type="text" name="employer_cvr" value="${esc(empPrefill.cvr)}">
        </div>
        <div class="field">
          <label>Company address</label>
          <input type="text" name="employer_address" value="${esc(empPrefill.address)}">
        </div>
        <div class="field">
          <label>Workplace address (if different from above — needed if there's a separate P-number)</label>
          <input type="text" name="employer_workplace_address">
        </div>
        <div class="field">
          <label>Contact person — name</label>
          <input type="text" name="employer_contact_name">
        </div>
        <div class="field">
          <label>Contact person — email</label>
          <input type="email" name="employer_contact_email">
        </div>
        <div class="field">
          <label>Contact person — phone</label>
          <input type="tel" name="employer_contact_phone">
        </div>
      </div>

      <div class="section">
        <h2>Job function &amp; DISCO classification</h2>
        <p class="hint">SIRI checks every scheme's salary and terms against Danish standards using the job's six-digit DISCO-08 code — asked regardless of which scheme applies.</p>
        <div class="field">
          <label>DISCO-08 code</label>
          <input type="text" name="employer_disco_code" placeholder="e.g. 751200">
        </div>
        <div class="field">
          <label>Job function related to the DISCO code</label>
          <input type="text" name="employer_job_function">
        </div>
      </div>

      ${renderSchemeSections('employer')}

      <div class="section">
        <h2>The offered employment</h2>
        <p class="hint">Terms stated here must match the signed contract you attach.</p>
        <div class="field">
          <label>Job position / title</label>
          <input type="text" name="employer_job_title">
        </div>
        <div class="field">
          <label>Job description (work tasks and roles)</label>
          <textarea name="employer_job_duties"></textarea>
        </div>
        <div class="field">
          <label>Does the job require a Danish authorisation?</label>
          <div class="radio-group">
            <label><input type="radio" name="employer_requires_authorisation" value="Yes"> Yes</label>
            <label><input type="radio" name="employer_requires_authorisation" value="No"> No</label>
          </div>
        </div>
        <div class="field">
          <label>Weekly working hours</label>
          <input type="number" step="0.5" name="employer_weekly_hours">
        </div>
        <div class="field">
          <label>When does employment start?</label>
          <div class="radio-group">
            <label><input type="radio" name="employer_start_type" value="As soon as possible"> As soon as possible</label>
            <label><input type="radio" name="employer_start_type" value="Specific start date"> Specific start date</label>
          </div>
          <input type="date" name="employer_start_date" placeholder="Only if a specific date was selected">
        </div>
        <div class="field">
          <label>When does employment end?</label>
          <div class="radio-group">
            <label><input type="radio" name="employer_end_type" value="Indefinite"> Indefinite</label>
            <label><input type="radio" name="employer_end_type" value="Specific end date"> Specific end date</label>
          </div>
          <input type="date" name="employer_end_date" placeholder="Only if a specific date was selected">
        </div>
        <div class="field">
          <label>Is the employment covered by a collective agreement?</label>
          <div class="radio-group">
            <label><input type="radio" name="employer_collective_agreement_status" value="Yes"> Yes</label>
            <label><input type="radio" name="employer_collective_agreement_status" value="No"> No</label>
          </div>
        </div>
        <div class="field">
          <label>Which collective agreement (if yes)</label>
          <input type="text" name="employer_collective_agreement_name">
        </div>
        <div class="field">
          <label>Upload signed employment contract (all pages)</label>
          ${fileField('employer_contract_upload', config, {multiple:true, hint:'PDF or clear photos of every page, please.'})}
        </div>
        <div class="field">
          <label>Holiday terms (days/year, holiday pay arrangement)</label>
          <input type="text" name="employer_holiday_terms">
        </div>
        <div class="field">
          <label>Termination terms (notice period)</label>
          <input type="text" name="employer_termination_terms">
        </div>
        <div class="field">
          <label>Does the applicant need a residence permit valid 1 month before employment starts?</label>
          <div class="radio-group">
            <label><input type="radio" name="employer_pre_employment_permit" value="Yes"> Yes</label>
            <label><input type="radio" name="employer_pre_employment_permit" value="No"> No</label>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Salary</h2>
        <p class="hint">Amounts should be actual payroll costs before tax, in DKK, monthly, rounded.</p>
        <div class="field">
          <label>Base salary (DKK/month)</label>
          <input type="number" name="employer_salary">
        </div>
        <div class="field">
          <label>Fixed allowances (DKK/month)</label>
          <input type="number" name="employer_fixed_allowances">
        </div>
        <div class="field">
          <label>Employer-paid share of pension (DKK/month)</label>
          <input type="number" name="employer_pension_contribution">
        </div>
        <div class="field">
          <label>Holiday pay allowance (DKK/month or %)</label>
          <input type="text" name="employer_holiday_pay_allowance">
        </div>
        <div class="field">
          <label>Does the applicant receive other employer-paid benefits?</label>
          <div class="radio-group">
            <label><input type="radio" name="employer_other_benefits" value="Yes"> Yes</label>
            <label><input type="radio" name="employer_other_benefits" value="No"> No</label>
          </div>
        </div>
        <div class="field">
          <label>If yes, describe the other benefits</label>
          <input type="text" name="employer_other_benefits_desc">
        </div>
      </div>

      <div class="section">
        <h2>SIRI processing fee</h2>
        <p class="hint">The government fee is DKK 6,810 — separate from Nordic Anchor's own fee.</p>
        <div class="field">
          <label>Have you paid the SIRI fee on the government portal?</label>
          <div class="radio-group">
            <label><input type="radio" name="fee_paid_status" value="We have paid the fee"> We have paid the fee</label>
            <label><input type="radio" name="fee_paid_status" value="We are exempt from paying the fee"> We are exempt from paying the fee</label>
          </div>
        </div>
        <div class="field">
          <label>Case order ID (from the payment)</label>
          <input type="text" name="fee_case_order_id" placeholder="e.g. CS-3211-CQ">
        </div>
        <div class="field">
          <label>Who is covering the fee internally?</label>
          <div class="radio-group">
            <label><input type="radio" name="fee_payer" value="Employer"> Employer will pay</label>
            <label><input type="radio" name="fee_payer" value="Applicant"> Applicant will pay</label>
            <label><input type="radio" name="fee_payer" value="Split"> Split between both</label>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Anything else we should know?</h2>
        <div class="field">
          <label>Additional comments (optional)</label>
          <textarea name="employer_additional_comments"></textarea>
        </div>
      </div>

      <div class="checkbox-line">
        <input type="checkbox" name="employer_confirm" id="employer_confirm">
        <span>I confirm the information above is accurate to the best of my knowledge.</span>
      </div>
    </div>

    <!-- ============ APPLICANT PANEL ============ -->
    <div class="panel" id="panel-applicant">

      <div class="section">
        <h2>Personal details</h2>
        <div class="field">
          <label>Full name</label>
          <input type="text" name="applicant_name" value="${esc(appPrefill.name)}">
        </div>
        <div class="field">
          <label>Date of birth</label>
          <input type="date" name="applicant_dob">
        </div>
        <div class="field">
          <label>Sex</label>
          <select name="applicant_sex">
            <option value="">— Select —</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div class="field">
          <label>Country of birth</label>
          <input type="text" name="applicant_country_of_birth">
        </div>
        <div class="field">
          <label>Citizenship / nationality</label>
          <input type="text" name="applicant_nationality" value="${esc(appPrefill.nationality)}">
        </div>
        <div class="field">
          <label>Marital status</label>
          <select name="applicant_marital_status">
            <option value="">— Select —</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Registered partnership">Registered partnership</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>
        <div class="field">
          <label>Does the applicant have children?</label>
          <div class="radio-group">
            <label><input type="radio" name="applicant_has_children" value="Yes"> Yes</label>
            <label><input type="radio" name="applicant_has_children" value="No"> No</label>
          </div>
        </div>
        <div class="field">
          <label>Danish CPR number</label>
          <input type="text" name="applicant_cpr" placeholder="250699-XXXX">
        </div>
        <div class="field">
          <label>Passport number</label>
          <input type="text" name="applicant_passport_number">
        </div>
        <div class="field">
          <label>Passport expiry date</label>
          <input type="date" name="applicant_passport_expiry">
        </div>
        <div class="field">
          <label>Email</label>
          <input type="email" name="applicant_email">
        </div>
        <div class="field">
          <label>Phone (WhatsApp preferred)</label>
          <input type="tel" name="applicant_phone">
        </div>
      </div>

      <div class="section">
        <h2>Family</h2>
        <p class="hint">This affects whether separate applications are needed — please answer even if the answer is no.</p>
        <div class="radio-group">
          <label><input type="radio" name="applicant_family_accompanying" value="Yes"> Yes — I have a spouse/partner and/or children who will also apply to join me in Denmark</label>
          <label><input type="radio" name="applicant_family_accompanying" value="No"> No — I am applying alone for now</label>
        </div>
      </div>

      <div class="section">
        <h2>The applicant's current address</h2>
        <div class="field">
          <label>Is the applicant already in Denmark?</label>
          <div class="radio-group">
            <label><input type="radio" name="applicant_already_in_dk" value="Yes"> Yes</label>
            <label><input type="radio" name="applicant_already_in_dk" value="No"> No</label>
          </div>
        </div>
        <div class="field">
          <label>Does the applicant expect to stay in Denmark until the case is processed?</label>
          <div class="radio-group">
            <label><input type="radio" name="applicant_stay_during_processing" value="Yes"> Yes</label>
            <label><input type="radio" name="applicant_stay_during_processing" value="No"> No</label>
          </div>
        </div>
        <div class="field">
          <label>Date of entry into Denmark (if applicable)</label>
          <input type="date" name="applicant_dk_entry_date">
        </div>
        <div class="field">
          <label>Current residential address in Denmark</label>
          <input type="text" name="applicant_dk_address" placeholder="Street, house number, postcode, city">
        </div>
        <div class="field">
          <label>Living with (c/o) — optional</label>
          <input type="text" name="applicant_dk_address_co">
        </div>
      </div>

      <div class="section">
        <h2>Passport</h2>
        <div class="field">
          <label>Upload passport — every page, including blank pages, front and back cover</label>
          ${fileField('applicant_passport_upload', config, {multiple:true})}
        </div>
      </div>

      <div class="section">
        <h2>Education</h2>
        <div class="field">
          <label>Highest level of education completed</label>
          <input type="text" name="applicant_education_level" placeholder="e.g. Vocational education at skilled level">
        </div>
        <div class="field">
          <label>Institution name &amp; country</label>
          <input type="text" name="applicant_education_institution">
        </div>
        <div class="field">
          <label>Programme name</label>
          <input type="text" name="applicant_education_programme">
        </div>
        <div class="field">
          <label>Completed in year</label>
          <input type="text" name="applicant_education_year" placeholder="e.g. 2018">
        </div>
        <div class="field">
          <label>Length of education</label>
          <input type="text" name="applicant_education_length" placeholder="e.g. 3 years">
        </div>
        <div class="field">
          <label>Upload any vocational, trade, or education certificates</label>
          ${fileField('applicant_education_upload', config, {multiple:true})}
        </div>
      </div>

      <div class="section">
        <h2>Most recent relevant employment</h2>
        <p class="hint">SIRI needs this to assess whether salary and terms correspond to Danish standards. If there's more than one past employer worth mentioning, use the notes field below for the rest.</p>
        <div class="field">
          <label>Employer's name</label>
          <input type="text" name="applicant_prev_employer_name">
        </div>
        <div class="field">
          <label>Employer's address or website</label>
          <input type="text" name="applicant_prev_employer_address">
        </div>
        <div class="field">
          <label>From</label>
          <input type="date" name="applicant_prev_employment_from">
        </div>
        <div class="field">
          <label>To</label>
          <input type="date" name="applicant_prev_employment_to">
        </div>
        <div class="field">
          <label>Job title</label>
          <input type="text" name="applicant_prev_job_title">
        </div>
        <div class="field">
          <label>Work tasks</label>
          <textarea name="applicant_prev_work_tasks"></textarea>
        </div>
        <div class="field">
          <label>Additional / other experience notes (if more than one past employer, or more detail is useful)</label>
          <textarea name="applicant_experience_description"></textarea>
        </div>
        <div class="field">
          <label>Total years of relevant work experience</label>
          <input type="text" name="applicant_total_experience_years" placeholder="e.g. 1.7">
        </div>
        <div class="field">
          <label>Upload supporting documents (reference letters, employment certificates)</label>
          ${fileField('applicant_experience_upload', config, {multiple:true, hint:'If documents are not in Danish/English, please also upload the original — we will arrange translation.'})}
        </div>
      </div>

      ${renderSchemeSections('applicant')}

      <div class="section">
        <h2>SIRI ruling letter</h2>
        <p class="hint">This is the official decision letter SIRI sent when your current permit was granted — different from your residence card. We already have your residence card copies; we need this to double-check the exact terms of your current permit. Skip if this is your first Danish permit.</p>
        <div class="field">
          <label>Upload your SIRI ruling letter (afgørelse) — if applicable</label>
          ${fileField('applicant_ruling_letter_upload', config, {multiple:true})}
        </div>
      </div>

      <div class="section">
        <h2>Danish bank account</h2>
        <div class="radio-group">
          <label><input type="radio" name="applicant_bank_status" value="Already have one"> I already have a Danish bank account</label>
          <label><input type="radio" name="applicant_bank_status" value="Do not have one yet"> I do not have one yet</label>
        </div>
      </div>

      <div class="checkbox-line">
        <input type="checkbox" name="applicant_confirm" id="applicant_confirm">
        <span>I confirm the information above is accurate to the best of my knowledge.</span>
      </div>
    </div>

    <div class="save-bar">
      <div>
        <div class="save-status" id="saveStatus">Not saved yet.</div>
        <div class="save-status">Note: file uploads aren't saved — only text answers. You'll need to re-attach files when you return.</div>
      </div>
      <div class="save-actions">
        <button type="button" class="save-btn" id="saveProgressBtn">Save progress</button>
        <button type="button" class="clear-btn" id="clearProgressBtn">Clear saved data</button>
      </div>
    </div>

    <button type="submit" class="submit-btn">Submit to Nordic Anchor</button>
  </form>

  <footer>
    Nordic Anchor · Reuben Geoffrey Dayal · CVR 46215540<br>
    <a href="mailto:rd@nordicanchor.dk">rd@nordicanchor.dk</a> · +45 7139 6509
    <div style="margin-top:14px;font-size:11px;color:#c4c4c4;">Form version: ${esc(FORM_VERSION)}</div>
  </footer>
</div>

<div id="successMsg">
  <div class="eyebrow">Nordic Anchor</div>
  <h2>Received — thank you.</h2>
  <p style="color:var(--muted);">We'll review everything and be in touch shortly.</p>
  <p style="color:var(--muted);font-size:14px;margin-top:18px;">Have more to add — a missing document, an answer that's changed? You can go back in and submit an update any time.</p>
  <button type="button" class="submit-btn" style="max-width:320px;margin-top:16px;" id="returnToFormBtn">I have more to add</button>
</div>
`;

  document.getElementById('na-app').innerHTML = APP_HTML;

  // ---- Gate ----
  function checkCode(){
    const val = document.getElementById('codeInput').value.trim();
    if (val === config.accessCode){
      document.getElementById('gateScreen').style.display = 'none';
      document.getElementById('mainSiteBar').style.display = 'flex';
      document.getElementById('mainForm').style.display = 'block';
      restoreProgress();
    } else {
      document.getElementById('gateError').style.display = 'block';
    }
  }
  document.getElementById('gateSubmit').addEventListener('click', checkCode);
  document.getElementById('codeInput').addEventListener('keydown', function(e){
    if (e.key === 'Enter') checkCode();
  });

  // ---- Tabs ----
  document.querySelectorAll('.tab-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      const which = btn.getAttribute('data-panel');
      document.getElementById('panel-employer').classList.toggle('active', which === 'employer');
      document.getElementById('panel-applicant').classList.toggle('active', which === 'applicant');
      document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  // ---- Field extraction shared by save/resume and the submission summary ----
  function collectFieldData(form){
    const data = {};
    Array.from(form.elements).forEach(function(el){
      if (!el.name || el.type === 'file' || el.type === 'submit' || el.type === 'button') return;
      if (el.type === 'checkbox'){
        data[el.name] = el.checked;
      } else if (el.type === 'radio'){
        if (el.checked) data[el.name] = el.value;
      } else {
        data[el.name] = el.value;
      }
    });
    return data;
  }

  // ---- Save / resume (text fields only — file inputs cannot be restored
  // programmatically for security reasons, so they're excluded and the
  // person is told to re-attach files on return) ----
  function saveProgress(manual){
    const form = document.getElementById('intakeForm');
    const data = collectFieldData(form);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: data, savedAt: new Date().toISOString() }));
    if (manual) updateSaveStatus();
  }

  function restoreProgress(){
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      const data = parsed.data;
      const form = document.getElementById('intakeForm');
      Array.from(form.elements).forEach(function(el){
        if (!el.name || !(el.name in data) || el.type === 'file') return;
        if (el.type === 'checkbox'){
          el.checked = !!data[el.name];
        } else if (el.type === 'radio'){
          el.checked = (el.value === data[el.name]);
        } else {
          el.value = data[el.name];
        }
      });
      updateSaveStatus(parsed.savedAt);
    } catch(e){ /* ignore corrupt saved data */ }
  }

  function updateSaveStatus(savedAt){
    const raw = localStorage.getItem(STORAGE_KEY);
    const el = document.getElementById('saveStatus');
    if (!raw){ el.textContent = 'Not saved yet.'; return; }
    const ts = savedAt || JSON.parse(raw).savedAt;
    const d = new Date(ts);
    el.textContent = 'Progress saved — ' + d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) + ' (this browser only).';
  }

  function clearProgress(){
    if (!confirm('Clear all saved progress on this form? This cannot be undone.')) return;
    localStorage.removeItem(STORAGE_KEY);
    document.getElementById('intakeForm').reset();
    updateSaveStatus();
  }

  document.getElementById('saveProgressBtn').addEventListener('click', function(){ saveProgress(true); });
  document.getElementById('clearProgressBtn').addEventListener('click', clearProgress);

  // ---- Submit ----
  document.getElementById('intakeForm').addEventListener('submit', function(e){
    e.preventDefault();
    const form = e.target;

    // Explicit check on whichever panel is actually active — replaces the
    // native `required` attribute, which could silently block submission
    // when the confirmation checkbox sat in a hidden (display:none) panel.
    const employerActive = document.getElementById('panel-employer').classList.contains('active');
    const activeCheckbox = employerActive
      ? document.getElementById('employer_confirm')
      : document.getElementById('applicant_confirm');
    if (!activeCheckbox.checked){
      alert('Please tick the confirmation checkbox at the bottom of your section before submitting.');
      activeCheckbox.scrollIntoView({ behavior:'smooth', block:'center' });
      return;
    }

    const fieldData = collectFieldData(form);
    const data = new FormData(form);
    if (window.NA_buildSummary){
      data.append('application_summary_readable', window.NA_buildSummary(fieldData, config));
    }

    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(async function(response){
      if (response.ok){
        saveProgress(false);
        document.getElementById('mainForm').style.display = 'none';
        document.getElementById('successMsg').style.display = 'block';
      } else {
        let detail = 'HTTP ' + response.status;
        try {
          const json = await response.json();
          if (json && json.errors && json.errors.length){
            detail = json.errors.map(function(er){ return er.message || JSON.stringify(er); }).join('; ');
          } else if (json && json.error){
            detail = json.error;
          }
        } catch(parseErr){ /* response wasn't JSON — keep the HTTP status */ }
        alert('Submission failed: ' + detail + '\n\nPlease screenshot this and send it to rd@nordicanchor.dk, or try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit to Nordic Anchor';
      }
    }).catch(function(err){
      alert('Network error submitting the form: ' + err.message + '\n\nPlease check your connection and try again, or contact rd@nordicanchor.dk directly.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit to Nordic Anchor';
    });
  });

  document.getElementById('returnToFormBtn').addEventListener('click', function(){
    document.getElementById('successMsg').style.display = 'none';
    document.getElementById('mainForm').style.display = 'block';
    restoreProgress();
  });

  // Autosave (debounced) on any field change, so progress isn't lost even
  // if the person forgets to click "Save progress" manually.
  let autosaveTimer;
  document.getElementById('intakeForm').addEventListener('input', function(){
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(function(){ saveProgress(true); }, 800);
  });

})();
