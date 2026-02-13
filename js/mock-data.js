/* ==========================================================================
   Equal Experts Association - Mock Data
   ========================================================================== */

// Email Allowlist - These emails are allowed to register
const EMAIL_ALLOWLIST = [
  'john.smith@equalexperts.com',
  'jane.doe@equalexperts.com',
  'alex.johnson@equalexperts.com',
  'sarah.wilson@equalexperts.com',
  'michael.brown@equalexperts.com',
  'emily.davis@equalexperts.com',
  'david.miller@equalexperts.com',
  'lisa.anderson@equalexperts.com',
  'james.taylor@equalexperts.com',
  'emma.thomas@equalexperts.com',
  // Demo emails for testing
  'demo@equalexperts.com',
  'test@equalexperts.com',
  'admin@equalexperts.com',
  'active@equalexperts.com',
  'pastdue@equalexperts.com',
  'suspended@equalexperts.com',
  'cancelled@equalexperts.com',
];

// Sample Members with different statuses
const SAMPLE_MEMBERS = [
  {
    id: 'EEA-2025-0001',
    email: 'john.smith@equalexperts.com',
    password: 'Password123',
    firstName: 'John',
    lastName: 'Smith',
    relationshipToEE: 'Current Employee',
    status: 'active',
    joinDate: '2025-01-15',
    activationDate: '2025-01-15',
    commitmentEndDate: '2026-01-15',
    nextPaymentDate: '2026-02-15',
    lastPaymentDate: '2026-01-15',
    lastPaymentAmount: 25.00,
    rulesAccepted: true,
    rulesAcceptanceTimestamp: '2025-01-15T14:23:45Z',
    rulesAcceptanceIP: '192.168.1.100',
    cancellationDate: null,
    paymentMethod: {
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expMonth: 12,
      expYear: 2027
    },
    billingAddress: {
      line1: '123 Tech Street',
      line2: 'Suite 100',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom'
    },
    checklist: {
      slack: false,
      benefits: false,
      insurance: false,
      gp: false
    },
    suspensionHistory: [],
    isAdmin: false
  },
  {
    id: 'EEA-2025-0002',
    email: 'jane.doe@equalexperts.com',
    password: 'Password123',
    firstName: 'Jane',
    lastName: 'Doe',
    relationshipToEE: 'Contractor',
    status: 'past_due',
    joinDate: '2025-02-01',
    activationDate: '2025-02-01',
    commitmentEndDate: '2026-02-01',
    nextPaymentDate: '2026-01-01',
    lastPaymentDate: '2025-12-01',
    lastPaymentAmount: 25.00,
    failedPaymentDate: '2026-01-01',
    failedPaymentAmount: 25.00,
    rulesAccepted: true,
    rulesAcceptanceTimestamp: '2025-02-01T10:15:30Z',
    rulesAcceptanceIP: '192.168.1.101',
    cancellationDate: null,
    paymentMethod: {
      type: 'card',
      last4: '1234',
      brand: 'Mastercard',
      expMonth: 6,
      expYear: 2026
    },
    billingAddress: {
      line1: '456 Code Lane',
      line2: '',
      city: 'Manchester',
      postcode: 'M1 1AD',
      country: 'United Kingdom'
    },
    checklist: {
      slack: true,
      benefits: true,
      insurance: false,
      gp: false
    },
    suspensionHistory: [],
    isAdmin: false
  },
  {
    id: 'EEA-2025-0003',
    email: 'alex.johnson@equalexperts.com',
    password: 'Password123',
    firstName: 'Alex',
    lastName: 'Johnson',
    relationshipToEE: 'Former Employee',
    status: 'suspended',
    joinDate: '2025-03-10',
    activationDate: '2025-03-10',
    commitmentEndDate: '2026-03-10',
    nextPaymentDate: '2025-12-10',
    lastPaymentDate: '2025-11-10',
    lastPaymentAmount: 25.00,
    failedPaymentDate: '2025-12-10',
    failedPaymentAmount: 25.00,
    rulesAccepted: true,
    rulesAcceptanceTimestamp: '2025-03-10T09:45:00Z',
    rulesAcceptanceIP: '192.168.1.102',
    cancellationDate: null,
    paymentMethod: {
      type: 'card',
      last4: '5678',
      brand: 'Visa',
      expMonth: 3,
      expYear: 2025 // Expired
    },
    billingAddress: {
      line1: '789 Dev Road',
      line2: 'Floor 2',
      city: 'Birmingham',
      postcode: 'B1 1AA',
      country: 'United Kingdom'
    },
    checklist: {
      slack: true,
      benefits: true,
      insurance: true,
      gp: true
    },
    suspensionHistory: [
      {
        dateSuspended: '2025-12-17',
        dateReactivated: null,
        reason: 'Payment failure',
        duration: null
      }
    ],
    isAdmin: false
  },
  {
    id: 'EEA-2025-0004',
    email: 'sarah.wilson@equalexperts.com',
    password: 'Password123',
    firstName: 'Sarah',
    lastName: 'Wilson',
    relationshipToEE: 'Partner',
    status: 'cancelled',
    joinDate: '2025-04-20',
    activationDate: '2025-04-20',
    commitmentEndDate: '2026-04-20',
    nextPaymentDate: null,
    lastPaymentDate: '2026-01-20',
    lastPaymentAmount: 25.00,
    accessEndsDate: '2026-02-20', // End of current billing period
    rulesAccepted: true,
    rulesAcceptanceTimestamp: '2025-04-20T16:30:00Z',
    rulesAcceptanceIP: '192.168.1.103',
    cancellationDate: '2026-01-25',
    paymentMethod: {
      type: 'card',
      last4: '9012',
      brand: 'Amex',
      expMonth: 8,
      expYear: 2028
    },
    billingAddress: {
      line1: '321 Agile Avenue',
      line2: '',
      city: 'Edinburgh',
      postcode: 'EH1 1AA',
      country: 'United Kingdom'
    },
    checklist: {
      slack: true,
      benefits: true,
      insurance: true,
      gp: false
    },
    suspensionHistory: [],
    isAdmin: false
  },
  {
    id: 'EEA-2025-0005',
    email: 'admin@equalexperts.com',
    password: 'Admin123',
    firstName: 'Admin',
    lastName: 'User',
    relationshipToEE: 'Current Employee',
    status: 'active',
    joinDate: '2025-01-01',
    activationDate: '2025-01-01',
    commitmentEndDate: '2026-01-01',
    nextPaymentDate: '2026-02-01',
    lastPaymentDate: '2026-01-01',
    lastPaymentAmount: 25.00,
    rulesAccepted: true,
    rulesAcceptanceTimestamp: '2025-01-01T08:00:00Z',
    rulesAcceptanceIP: '192.168.1.1',
    cancellationDate: null,
    paymentMethod: {
      type: 'card',
      last4: '0000',
      brand: 'Visa',
      expMonth: 12,
      expYear: 2030
    },
    billingAddress: {
      line1: 'EE HQ',
      line2: '',
      city: 'London',
      postcode: 'EC2A 1AA',
      country: 'United Kingdom'
    },
    checklist: {
      slack: true,
      benefits: true,
      insurance: true,
      gp: true
    },
    suspensionHistory: [],
    isAdmin: true
  }
];

// Benefits Data - Insurance and Wellbeing Benefits
const BENEFITS = [
  // Insurance
  {
    id: 'pi-insurance',
    category: 'insurance',
    categoryName: 'Insurance',
    icon: '🛡️',
    title: 'EE-ready professional indemnity (PI)',
    description: 'Professional indemnity insurance to protect you if a client claims your work caused them a financial loss, including the cost of defending the claim (subject to policy terms).',
    howItWorks: 'If a claim lands, or something happens that could reasonably turn into a claim, you notify the insurer promptly and share the relevant emails, contracts, statements of work, and any supporting evidence. The insurer then manages the defence approach and (where appropriate) settlement discussions under the policy terms. The policy limit is set by your schedule at <strong>£1m</strong>, and any "cover for past work" position is also determined by the schedule\'s retroactive wording and dates.',
    redemption: 'Your PI cover is automatically active with your membership. Contact insurance@ee-association.com for policy documents or to add retroactive cover.',
    provider: 'Insurance Provider',
    value: '£1m cover'
  },
  {
    id: 'retroactive-cover',
    category: 'insurance',
    categoryName: 'Insurance',
    icon: '⏮️',
    title: 'Cover for past work (retroactive cover)',
    description: 'Optional cover designed to protect you against claims that relate to work carried out before the policy start date (subject to eligibility and policy terms).',
    howItWorks: 'Retroactive cover is controlled by the retroactive date and any endorsements shown on your schedule. In practice, it\'s what stops you being exposed when a client raises an issue about work you delivered months or years ago. The key operational behaviour is to keep a clean timeline of when the work was delivered, when the allegation was first made, and when you notified the insurer, because claims-made policies can be sensitive to timing and notification.',
    redemption: 'Contact insurance@ee-association.com to add retroactive cover to your policy.',
    provider: 'Insurance Provider',
    value: 'Optional add-on'
  },
  {
    id: 'tax-legal-helplines',
    category: 'insurance',
    categoryName: 'Insurance',
    icon: '📞',
    title: 'Tax and legal helplines',
    description: 'Access to tax and legal guidance so you can sense-check situations early and avoid expensive mistakes (subject to policy terms).',
    howItWorks: 'You use the helplines when something crops up that needs quick, practical guidance: contract questions, tax uncertainty, or legal questions before they escalate. For some insured sections in the legal protection policy, the wording expects you to seek and follow advice from the Qdos legal advice line and obtain specific authorisation before taking certain steps, so the safest approach is to treat the helpline as the first move whenever you think a matter could become a claim.',
    redemption: 'Call the helpline: 0800 123 4567 (quote your member ID). Available 24/7 for urgent matters.',
    provider: 'Legal Provider',
    value: '24/7 access'
  },
  {
    id: 'legal-expenses',
    category: 'insurance',
    categoryName: 'Insurance',
    icon: '⚖️',
    title: 'Legal cover (legal protection)',
    description: 'Legal expenses support to help you handle certain disputes and legal issues, with limits set by the schedule (subject to policy terms).',
    howItWorks: 'When a dispute starts forming, you notify and follow the insurer\'s process so they can control legal costs and appoint support as needed. Legal expenses policies are not "anything legal, anytime", they are structured around defined insured events, conditions, and exclusions. The practical takeaway is: contact early, don\'t run up costs independently, and keep everything in writing so the insurer can assess cover quickly against the policy wording and schedule. The policy limit is set by your schedule at <strong>£50k</strong>.',
    redemption: 'Call the legal helpline: 0800 123 4567 (quote your member ID). Available 24/7 for urgent matters.',
    provider: 'Legal Provider',
    value: 'Up to £50k'
  },
  {
    id: 'tax-vat-investigation',
    category: 'insurance',
    categoryName: 'Insurance',
    icon: '📋',
    title: 'Tax and VAT investigation cover (including tax pre-dispute)',
    description: 'Cover for professional fees and legal costs to deal with HMRC enquiries and VAT investigations (subject to policy terms).',
    howItWorks: 'If HMRC open an enquiry or the situation starts heading that way, you notify promptly and follow the claims process so specialist support can engage and respond properly. This cover is designed to fund eligible fees and costs involved in dealing with the enquiry, not the underlying tax you may owe. Timing and process matter: you\'ll typically need to provide HMRC correspondence, relevant returns, contracts and supporting evidence, and avoid acting in a way that prejudices the insurer\'s position. The policy limit is set by your schedule at <strong>£50k</strong>.',
    redemption: 'Contact taxcover@ee-association.com immediately if you receive an HMRC enquiry letter. Do not respond to HMRC until you have spoken to our team.',
    provider: 'Tax Insurance Provider',
    value: 'Legal fees up to £50k'
  },
  {
    id: 'msc-enquiries',
    category: 'insurance',
    categoryName: 'Insurance',
    icon: '🔍',
    title: 'Cover for HMRC tax enquiries, including enquiries referencing MSC legislation',
    description: 'Cover for HMRC tax enquiries, including enquiries referencing Managed Service Company (MSC) legislation (subject to policy terms).',
    howItWorks: 'If you receive an HMRC enquiry that references MSC legislation (or it becomes clear MSC is in scope), you notify and let the appointed process handle the response and defence. The purpose of this benefit is to fund eligible professional fees and costs for dealing with the enquiry within the policy limits, and to reduce the risk of costly missteps from replying in the wrong way or too late. It does not guarantee outcomes, and eligibility still depends on the policy terms, conditions, and exclusions.',
    redemption: 'Contact taxcover@ee-association.com if you receive an MSC-related enquiry. Our team will guide you through the process.',
    provider: 'Tax Insurance Provider',
    value: 'Full cover'
  },
  {
    id: 'jury-service',
    category: 'insurance',
    categoryName: 'Insurance',
    icon: '⚖️',
    title: 'Jury service cover',
    description: 'Financial support if you\'re called for jury service and it impacts your ability to earn (subject to policy terms).',
    howItWorks: 'If you\'re summoned for jury service, you claim using the evidence of the summons and attendance dates, plus the information needed to show the earnings impact. Where the claim is eligible, the policy compensates you within the daily cap and overall claim cap, designed to soften the disruption when you can\'t bill your day rate. The policy limits are set by your schedule at <strong>£5,000 per claim</strong> and <strong>£500/day</strong>.',
    redemption: 'Submit your jury service notice to claims@ee-association.com as soon as you receive it. Daily compensation is paid after service completion.',
    provider: 'Insurance Provider',
    value: 'Up to £5,000/claim'
  },
  {
    id: 'public-liability',
    category: 'insurance',
    categoryName: 'Insurance',
    icon: '🏢',
    title: 'Public liability (PL) - ADD-ON',
    description: '<strong>OPTIONAL ADD-ON:</strong> Public liability cover for accidental third-party injury or accidental damage to tangible property arising from your business activities (subject to policy terms).',
    howItWorks: 'This is the "real world" liability cover: if someone is injured or property is damaged because of your business activities and you become legally liable, the insurer handles defence and pays covered damages within the policy terms. The policy limit is set by your schedule at <strong>£1m</strong>. If an incident happens, you notify as soon as possible and forward any correspondence immediately, and you do not admit liability, offer to settle, or make payments without written consent from the insurer, because that can compromise cover.',
    redemption: 'Available as an optional add-on. Contact insurance@ee-association.com to add PL cover to your membership.',
    provider: 'Insurance Provider',
    value: '£1m limit (add-on)',
    isAddOn: true
  },
  {
    id: 'employers-liability',
    category: 'insurance',
    categoryName: 'Insurance',
    icon: '👥',
    title: 'Employers\' liability (EL) - ADD-ON',
    description: '<strong>OPTIONAL ADD-ON:</strong> Employers\' liability cover for claims from employees for workplace injury or illness (subject to policy terms).',
    howItWorks: 'If you employ someone and they allege an injury or illness connected to their employment, EL responds to your legal liability within the policy terms and the schedule limit. Operationally it behaves like PL: notify early, forward claim documents immediately, and avoid admissions or payments without consent so the insurer can manage defence and settlement properly. This is typically added onto a public liability policy rather than sold standalone, which matches how you\'ve positioned it as an add-on. The policy limit is set by your schedule at <strong>£10m</strong>.',
    redemption: 'Available as an optional add-on. Contact insurance@ee-association.com to add EL cover to your membership.',
    provider: 'Insurance Provider',
    value: 'Up to £10m (add-on)',
    isAddOn: true
  },
  {
    id: 'gdpr-data-protection',
    category: 'insurance',
    categoryName: 'Insurance',
    icon: '🔐',
    title: 'GDPR and data protection liability extension',
    description: 'An extension intended to cover certain liabilities connected to data protection claims (subject to policy terms).',
    howItWorks: 'If a written claim is made against you during the policy period alleging damage under data protection law, this extension is designed to respond to covered liability and associated defence within the extension limit set in the schedule. It is not a "GDPR fines" benefit: fines and penalties are excluded, and the wording includes important boundaries around known circumstances, deliberate acts, and certain categories of claim. It also includes a compliance expectation, so you should treat basic data protection hygiene and documentation as part of how you keep the cover effective, not as optional admin. The policy limit is set by your schedule at <strong>£X</strong>.',
    redemption: 'Report incidents immediately to dataprotection@ee-association.com. 24/7 incident response available.',
    provider: 'Insurance Provider',
    value: 'Up to £X (see policy)'
  },
  {
    id: 'court-attendance',
    category: 'insurance',
    categoryName: 'Insurance',
    icon: '🏛️',
    title: 'Court attendance compensation',
    description: 'A contribution towards lost time if you (or your team) must attend court in connection with a covered claim, at the insurer\'s request (subject to policy terms).',
    howItWorks: 'If court attendance is required as a witness at the insurer\'s request and it relates to a claim where you\'re entitled to indemnity, the policy pays a fixed daily amount for each day attendance is required. The wording sets the rates at <strong>£250/day</strong> for a director or partner and <strong>£100/day</strong> for an employee. In practice this is handled as part of the underlying claim process, so you\'ll follow the insurer\'s instructions and provide the evidence they request for the attendance days.',
    redemption: 'Submit court attendance notice to claims@ee-association.com. Compensation paid after attendance is verified.',
    provider: 'Insurance Provider',
    value: '£250/day (director/partner)'
  },
  // Professional Development
  {
    id: 'cloud-accreditation',
    category: 'professional',
    categoryName: 'Professional Development',
    icon: '☁️',
    title: 'Azure/AWS/GCP accreditation (money back)',
    description: 'Money back on selected Azure/AWS/GCP accreditations, helping reduce the cost of staying current with the major cloud platforms (T&Cs apply).',
    howItWorks: 'You take an eligible certification and then claim reimbursement in line with the scheme rules. The saving is typically <strong>$100–$300 per certificate</strong>, depending on the specific accreditation. Eligibility is restricted to selected certifications and will depend on the terms and conditions, including any evidence requirements and claim windows.',
    redemption: 'Submit your certification certificate and receipt to training@ee-association.com for reimbursement. Processing typically takes 2-3 weeks.',
    provider: 'Equal Experts Association',
    value: '$100-$300 per cert'
  },
  {
    id: 'inhouse-training',
    category: 'professional',
    categoryName: 'Professional Development',
    icon: '📚',
    title: 'In-house Equal Experts training',
    description: 'Free access to any Equal Experts-provided in-house training, so you can upskill without paying course fees.',
    howItWorks: 'When Equal Experts run internal training, members can attend without additional charge. Access is subject to availability, scheduling, and any prerequisites set for the specific session, but the intent is straightforward: if EE runs it in-house, you can join it for free.',
    redemption: 'Check the EE training calendar at training.ee-association.com and register for available sessions. You will receive a confirmation email with joining details.',
    provider: 'Equal Experts',
    value: 'Free access'
  },
  // Health & Wellbeing
  {
    id: 'virtual-gp',
    category: 'health',
    categoryName: 'Health & Wellbeing',
    icon: '👨‍⚕️',
    title: 'Unlimited 24/7 on-demand GP service (UK only)',
    description: 'Unlimited access to a UK-registered GP, 24/7, via app-based text, phone, or video (subject to provider terms).',
    howItWorks: 'You access the GP service through the wellbeing app and choose the appropriate channel (message, phone, video). It\'s designed to reduce waiting and friction when you need medical advice quickly, and the provider materials describe support such as prescriptions and referrals where appropriate. Eligibility rules for who in a household can access it should follow your scheme\'s membership rules, but the provider positions access as suitable for employees and families.',
    redemption: 'Download the HealthHero app and register with code EEA2025. First consultation available within 2 hours.',
    provider: 'HealthHero',
    value: 'Unlimited (UK only)'
  },
  {
    id: 'mental-health',
    category: 'health',
    categoryName: 'Health & Wellbeing',
    icon: '🧠',
    title: 'Mental health therapy (UK only)',
    description: 'Therapy support with up to 8 sessions per condition, delivered through the provider\'s pathway (subject to provider terms).',
    howItWorks: 'You access mental health support through the wellbeing app and are matched into the provider\'s pathway. The offer is designed to make support easier to start and stick with, with a defined allowance of up to 8 sessions per condition. Delivery routes include remote options (and sometimes face-to-face depending on availability), and the provider frames it as confidential support, with the operational detail governed by their clinical triage and scheduling process.',
    redemption: 'Book via the EAP portal at wellbeing.ee-association.com or call 0800 987 6543. Confidential service.',
    provider: 'Health Assured',
    value: '8 sessions/condition (UK only)'
  },
  {
    id: 'menopause-support',
    category: 'health',
    categoryName: 'Health & Wellbeing',
    icon: '🌸',
    title: 'Menopause health support (UK only)',
    description: 'Menopause support resources plus a free 15-minute discovery call with a specialist (subject to provider terms).',
    howItWorks: 'You access an online menopause centre through the wellbeing service, which includes information and resources aimed at practical support through perimenopause and menopause. The provider also includes workplace guidance and explicitly references support for colleagues and partners, recognising that menopause impacts more than just the individual. If you want human support, there\'s a free 15-minute specialist discovery call as part of the offer.',
    redemption: 'Visit menopause.ee-association.com to access resources and book your discovery call.',
    provider: 'Menopause Health Provider',
    value: 'Free discovery call (UK only)'
  },
  // Wellness & Life
  {
    id: 'life-coaching',
    category: 'wellness',
    categoryName: 'Wellness & Life Support',
    icon: '🌟',
    title: 'Life coaching (unlimited) (UK only)',
    description: 'Unlimited life coaching to support personal or professional change, goals, confidence, habits and decision-making. Coaching, not counselling (subject to provider terms).',
    howItWorks: 'You access coaching through the wellbeing service when you want structured, practical support to make progress, rather than clinical treatment. The provider positions it as private and confidential, focused on self-awareness, clarifying vision, redefining values and setting intentions. It\'s most useful when you\'re stuck in a loop: you know what you should do, but you\'re not doing it, and you want help turning it into action.',
    redemption: 'Book sessions at coaching.ee-association.com. Available whenever you need support.',
    provider: 'The Career Coach',
    value: 'Unlimited (UK only)'
  },
  {
    id: 'physio',
    category: 'health',
    categoryName: 'Health & Wellbeing',
    icon: '🏃',
    title: 'Personalised virtual physio service (UK only)',
    description: 'Virtual physio support for musculoskeletal issues, with assessment and tailored recommendations (subject to provider terms).',
    howItWorks: 'You access virtual physio through the wellbeing app when you have an MSK issue (neck, back, shoulders, joints, repetitive strain type problems). The service is positioned as rapid clinical assessment plus personalised treatment recommendations and self-care support. The point is to deal with problems early, with a clear plan, rather than waiting for something minor to become chronic.',
    redemption: 'Register at physio.ee-association.com using your member email. Initial assessment within 48 hours.',
    provider: 'Phio',
    value: 'Unlimited (UK only)'
  },
  // Savings & Lifestyle
  {
    id: 'benefits-hub',
    category: 'savings',
    categoryName: 'Lifestyle Savings',
    icon: '🎁',
    title: 'Benefits hub and cash back (UK only)',
    description: 'A benefits hub with over 1,500 savings options, plus cash back, designed to cut everyday costs (subject to provider terms).',
    howItWorks: 'You browse offers through the wellbeing app and redeem them in the format the provider supports (discount codes, links, vouchers, cash back tracking, etc.). It\'s not a single "big perk", it\'s a portfolio of small savings that can add up if you use it routinely. Offers change and refresh, so it works best when you treat it like a habit: check before you buy rather than after.',
    redemption: 'Access the benefits hub at perks.ee-association.com using your member login.',
    provider: 'Perkbox',
    value: '1,500+ offers (UK only)'
  },
  {
    id: 'gym-discount',
    category: 'savings',
    categoryName: 'Lifestyle Savings',
    icon: '🏋️',
    title: 'Nationwide gym discounts (UK only)',
    description: 'Discounted gym access across the UK to make staying active cheaper and easier (subject to provider terms).',
    howItWorks: 'You access the gym discount scheme via the wellbeing service and choose from participating gyms and fitness partners. The value comes from reduced monthly costs and broader access options, especially if you want flexibility rather than locking into one gym contract. Exact savings and network availability depend on the provider\'s current partners.',
    redemption: 'Browse and join gyms at gyms.ee-association.com. Discounted rates applied automatically.',
    provider: 'Hussle',
    value: '3,300+ locations (UK only)'
  },
  {
    id: 'fuel-savings',
    category: 'savings',
    categoryName: 'Lifestyle Savings',
    icon: '⛽',
    title: 'Fuel savings with Shell (UK only)',
    description: 'Fuel savings through a fuel card applied for via the app, with the scheme using Shell (subject to provider terms).',
    howItWorks: 'You apply for a physical fuel card via the wellbeing app and use it when refuelling at Shell. The provider materials state savings of <strong>3p per litre of diesel</strong> and <strong>2p per litre of petrol</strong>, with the mechanics controlled by the fuel card terms. This is a simple "always-on" saving: it\'s useful if you drive regularly, and irrelevant if you don\'t, so it\'s worth presenting as an optional highlight rather than a core reason to join.',
    redemption: 'Apply for your fuel card via the wellbeing app. Use it at Shell stations for automatic savings.',
    provider: 'Shell',
    value: '3p/L diesel, 2p/L petrol (UK only)'
  },
  {
    id: 'legal-helpline-wellbeing',
    category: 'savings',
    categoryName: 'Lifestyle Savings',
    icon: '☎️',
    title: '24/7 legal helpline (wellbeing) (UK only)',
    description: 'A 24/7 legal helpline for everyday-life legal questions, included as part of the wellbeing offering (subject to provider terms).',
    howItWorks: 'You access the helpline through the wellbeing service when something legal is stressing you out but you don\'t yet know whether it\'s a "formal solicitor" situation. It\'s designed for early clarity and next steps on common problems (consumer issues, housing, family admin, basic rights questions), without you paying for an initial appointment just to understand what you\'re dealing with. This is separate from your business insurance helplines and should be described as general legal guidance within the wellbeing bundle.',
    redemption: 'Call the wellbeing legal helpline: 0800 555 7777. Available 24/7.',
    provider: 'Wellbeing Legal Provider',
    value: '24/7 access (UK only)'
  }
];

// FAQ Data
const FAQ_DATA = [
  {
    category: 'Membership',
    questions: [
      {
        question: 'Who can join the Equal Experts Association?',
        answer: 'Membership is currently by invitation only. You must be a current or former Equal Experts employee, contractor, or partner with an email address on our approved list.'
      },
      {
        question: 'What is the membership commitment?',
        answer: 'Membership is described as a 12-month commitment, paid monthly at £25/month. You can cancel at any time; cancellation stops future payments and you\'ll keep access until the end of your current billing period.'
      },
      {
        question: 'What is a Company Limited by Guarantee?',
        answer: 'The Equal Experts Association is a Company Limited by Guarantee. This means it\'s a non-profit company where members guarantee to contribute a small amount (£1) if the company is wound up. There are no shareholders or dividends.'
      },
      {
        question: 'What is the £1 guarantee?',
        answer: 'As a member of a Company Limited by Guarantee, your liability is limited to £1. This means if the Association is ever wound up while you are a member, or within one year after you cease to be a member, the maximum you could be asked to contribute is £1.'
      }
    ]
  },
  {
    category: 'Payments & Billing',
    questions: [
      {
        question: 'When will I be charged?',
        answer: 'Your first payment of £25 is processed when you complete registration. After that, you\'ll be charged on the same day each month.'
      },
      {
        question: 'What happens if my payment fails?',
        answer: 'If a payment fails, we\'ll retry automatically over the following 7 days. You\'ll keep full access during this period. If all retries fail, your account will be suspended until you update your payment method.'
      },
      {
        question: 'How do I update my payment method?',
        answer: 'Go to Account > Billing and click "Update Payment Method". You can change your card details at any time.'
      },
      {
        question: 'Can I get a refund?',
        answer: 'Monthly payments are non-refundable. If you cancel, you\'ll retain access until the end of your current billing period.'
      }
    ]
  },
  {
    category: 'Benefits',
    questions: [
      {
        question: 'How do I access my benefits?',
        answer: 'Each benefit has specific redemption instructions shown on the Benefits page when you\'re logged in. Most benefits require you to use your member email or a unique code.'
      },
      {
        question: 'Can my family use the benefits?',
        answer: 'Some benefits like the Virtual GP and retail discounts can be used by immediate family members. Check individual benefit details for family eligibility.'
      },
      {
        question: 'What if a benefit isn\'t working?',
        answer: 'Contact us in the #ask-ee-association Slack channel and we\'ll help resolve any issues. Most problems are resolved within 24 hours.'
      }
    ]
  },
  {
    category: 'Account & Cancellation',
    questions: [
      {
        question: 'How do I cancel my membership?',
        answer: 'Go to Account > Membership and click "Cancel Membership". Cancellation takes effect at the end of your current billing period - you\'ll keep access until then.'
      },
      {
        question: 'Can I rejoin after cancelling?',
        answer: 'Yes, if your email is still on the approved list, you can register again. Your previous membership history will be linked to your new account.'
      },
      {
        question: 'How do I update my personal details?',
        answer: 'Go to Account > Profile to update your name, email, or password. Some changes may require email verification.'
      }
    ]
  },
  {
    category: 'Support',
    questions: [
      {
        question: 'How do I get help?',
        answer: 'The quickest way to get help is through our Slack channel #ask-ee-association, available Monday-Friday, 9am-5pm GMT. You can also email support@ee-association.com.'
      },
      {
        question: 'Is there a phone number I can call?',
        answer: 'We don\'t currently offer phone support, but our Slack channel typically responds within a few hours during business hours.'
      }
    ]
  }
];

// Changelog Data
const CHANGELOG_DATA = [
  {
    date: 'January 2026',
    title: 'Launch',
    items: [
      'Equal Experts Association membership portal launched',
      '23 benefits available at launch',
      'Stripe payment integration',
      'Member dashboard with quick actions'
    ]
  }
];

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.EEAData = {
    EMAIL_ALLOWLIST,
    SAMPLE_MEMBERS,
    BENEFITS,
    FAQ_DATA,
    CHANGELOG_DATA
  };
}
