/* Nordic Anchor — builds a single, human-readable, copy-paste-ready
   summary of a submission, ordered to match SIRI's own AR6 online
   application (newtodenmark.dk) section-for-section, instead of leaving
   Reuben to reconstruct it from a scattered field-by-field Formspree email.
   This text is appended as one extra field on submit — the raw individual
   fields are still sent too, as a backup/audit trail. */

(function(){

  function v(data, name){
    return (data[name] || '').toString().trim();
  }

  function line(label, value){
    return label + ': ' + (value || '—');
  }

  window.NA_buildSummary = function(data, config){
    const schemes = config.schemes || [];
    const hasScheme = function(key){ return schemes.indexOf(key) !== -1; };
    const schemeLabels = schemes.map(function(key){
      const mod = window.NA_SCHEME_MODULES[key];
      return mod ? mod.label : key;
    }).join(', ');

    const out = [];
    const section = function(title){ out.push('', '=== ' + title + ' ==='); };

    out.push('NORDIC ANCHOR — APPLICATION SUMMARY (copy-paste into SIRI\'s AR6 application)');
    out.push('Case: ' + (config.subtitle || config.caseId));
    out.push('Generated: ' + new Date().toLocaleString());

    section('ABOUT THE EMPLOYER IN DENMARK');
    out.push(line('CVR', v(data,'employer_cvr')));
    out.push(line('Name of company', v(data,'employer_company_name')));
    out.push(line('Address', v(data,'employer_address')));
    out.push(line('Workplace / production site address (if different)', v(data,'employer_workplace_address')));
    out.push(line('Contact person', v(data,'employer_contact_name')));
    out.push(line('Contact email', v(data,'employer_contact_email')));
    out.push(line('Contact phone', v(data,'employer_contact_phone')));
    out.push('');
    out.push('-- Third party (fixed — Nordic Anchor, pre-fill on the portal) --');
    out.push('CVR number: 46215540');
    out.push('Name: Nordic Anchor');
    out.push('Address: Holmevænget 53, 2970 Hørsholm');
    out.push('Main phone: +45 7139 6509');
    out.push('Email: rd@nordicanchor.dk');
    out.push('Contact person: Reuben Dayal (+45 7139 6509)');
    out.push('Who is completing the application: A third party on behalf of the employer');

    section('WHAT ARE YOU APPLYING FOR?');
    out.push(v(data,'case_permit_type') || '—');

    section('CHOOSE SCHEME');
    out.push(schemeLabels || '—');
    out.push('');
    out.push(line('DISCO-08 code', v(data,'employer_disco_code')));
    out.push(line('Job function related to the DISCO code', v(data,'employer_job_function')));

    if (hasScheme('positive-list-skilled')){
      out.push('');
      out.push(line('Targeted number of trained apprentices (måluddannelsesratio)?', v(data,'scheme_aub_maluddannelsesratio')));
      out.push(line('Paid additional contribution (merbidrag)?', v(data,'scheme_aub_merbidrag')));
    }
    if (hasScheme('pay-limit')){
      out.push('');
      out.push(line('Pay Limit tier', v(data,'scheme_pay_limit_tier')));
    }
    if (hasScheme('fast-track')){
      out.push('');
      out.push(line('Fast-Track certification status', v(data,'scheme_fasttrack_status')));
      out.push(line('Certification expiry', v(data,'scheme_fasttrack_expiry')));
      out.push(line('Underlying track', v(data,'scheme_fasttrack_track')));
    }
    if (hasScheme('positive-list-highered')){
      out.push('');
      out.push('Note: assessed via sædvanlig løn (customary wage) — see Salary section below.');
      out.push(line('Credential assessment status', v(data,'scheme_credential_status')));
    }

    section('THE OFFERED EMPLOYMENT');
    out.push(line('Job position/title', v(data,'employer_job_title')));
    out.push(line('Job description / work tasks', v(data,'employer_job_duties')));
    out.push(line('Does the job require a Danish authorisation?', v(data,'employer_requires_authorisation')));
    out.push(line('Weekly working hours', v(data,'employer_weekly_hours')));
    const startType = v(data,'employer_start_type');
    out.push(line('Employment start', startType === 'Specific start date' ? ('Specific date: ' + v(data,'employer_start_date')) : (startType || '—')));
    const endType = v(data,'employer_end_type');
    out.push(line('Employment end', endType === 'Specific end date' ? ('Specific date: ' + v(data,'employer_end_date')) : (endType || '—')));
    out.push(line('Covered by a collective agreement?', v(data,'employer_collective_agreement_status')));
    out.push(line('Which collective agreement', v(data,'employer_collective_agreement_name')));
    out.push(line('Needs a residence permit valid 1 month before employment starts?', v(data,'employer_pre_employment_permit')));

    section('SALARY');
    out.push(line('Base salary (DKK/month)', v(data,'employer_salary')));
    out.push(line('Fixed allowances (DKK/month)', v(data,'employer_fixed_allowances')));
    out.push(line('Employer-paid pension (DKK/month)', v(data,'employer_pension_contribution')));
    out.push(line('Holiday pay allowance', v(data,'employer_holiday_pay_allowance')));
    out.push(line('Other employer-paid benefits?', v(data,'employer_other_benefits')));
    out.push(line('Other benefits detail', v(data,'employer_other_benefits_desc')));

    section('SIRI PROCESSING FEE');
    out.push(line('Have you paid the fee?', v(data,'fee_paid_status')));
    out.push(line('Case order ID', v(data,'fee_case_order_id')));
    out.push(line('Who is covering the fee (internal, employer/applicant split)', v(data,'fee_payer')));

    section('ABOUT THE APPLICANT');
    out.push(line('Full name', v(data,'applicant_name') + '  (split into first/last name on the portal)'));
    out.push(line('Date of birth', v(data,'applicant_dob')));
    out.push(line('Sex', v(data,'applicant_sex')));
    out.push(line('Country of birth', v(data,'applicant_country_of_birth')));
    out.push(line('Citizenship', v(data,'applicant_nationality')));
    out.push(line('Marital status', v(data,'applicant_marital_status')));
    out.push(line('Does the applicant have children?', v(data,'applicant_has_children')));
    out.push(line('CPR number', v(data,'applicant_cpr')));
    out.push(line('Passport number', v(data,'applicant_passport_number')));
    out.push(line('Passport valid until', v(data,'applicant_passport_expiry')));
    out.push(line('Phone', v(data,'applicant_phone')));
    out.push(line('Email', v(data,'applicant_email')));

    section("THE APPLICANT'S CURRENT ADDRESS");
    out.push(line('Already in Denmark?', v(data,'applicant_already_in_dk')));
    out.push(line('Expects to stay in Denmark until the case is processed?', v(data,'applicant_stay_during_processing')));
    out.push(line('Date of entry into Denmark', v(data,'applicant_dk_entry_date')));
    out.push(line('Address in Denmark', v(data,'applicant_dk_address')));
    out.push(line('Living with (c/o)', v(data,'applicant_dk_address_co')));

    section('EDUCATION AND EMPLOYMENTS');
    out.push(line('Highest level of education', v(data,'applicant_education_level')));
    out.push(line('Institution (name & country)', v(data,'applicant_education_institution')));
    out.push(line('Programme name', v(data,'applicant_education_programme')));
    out.push(line('Completed in year', v(data,'applicant_education_year')));
    out.push(line('Length of education', v(data,'applicant_education_length')));
    out.push('');
    out.push('Most recent relevant employment —');
    out.push('  ' + line('Employer\'s name', v(data,'applicant_prev_employer_name')));
    out.push('  ' + line('Employer\'s address', v(data,'applicant_prev_employer_address')));
    out.push('  ' + line('From', v(data,'applicant_prev_employment_from')) + '   ' + line('To', v(data,'applicant_prev_employment_to')));
    out.push('  ' + line('Job title', v(data,'applicant_prev_job_title')));
    out.push('  ' + line('Work tasks', v(data,'applicant_prev_work_tasks')));
    out.push('');
    out.push(line('Additional / other experience notes (if more than one past employer)', v(data,'applicant_experience_description')));
    const totalYears = v(data,'applicant_total_experience_years');
    out.push(line('Total years of relevant work experience', totalYears));
    if (hasScheme('positive-list-skilled') && totalYears){
      const rounded = Math.floor(parseFloat(totalYears.replace(',', '.')) || 0);
      out.push('  (rounded down for the wage-statistics bracket: ' + rounded + ' completed years)');
    }

    section('FAMILY & BANK');
    out.push(line('Family accompanying to Denmark?', v(data,'applicant_family_accompanying')));
    out.push(line('Danish bank account status', v(data,'applicant_bank_status')));

    const comments = v(data,'employer_additional_comments');
    if (comments){
      section('ADDITIONAL COMMENTS');
      out.push(comments);
    }

    return out.join('\n');
  };

})();
