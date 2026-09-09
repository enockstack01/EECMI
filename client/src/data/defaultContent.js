// Client-side fallback for admin-editable platform content. Kept in sync with
// server/data/defaultContent.js — the website renders from GET /api/content and
// drops back to this when the API is unreachable or a section is unset.

export const DEFAULT_CONTENT = {
  org: {
    name: 'Ecclessia Eden Commission Ministries International',
    shortName: 'EECMI',
    tagline: 'Restoring Lives. Rebuilding Families. Transforming Communities Through Christ.',
    location: 'Kampala, Uganda',
    email: 'admin@eecmi.org',
    phone: '+250 722 439 327',
    phoneDial: '+250722439327',
    whatsapp: 'https://wa.me/250722439327',
    website: 'https://eecmi-platform.onrender.com',
    intro:
      'A Christ centered ministry restoring lives, rebuilding families, and transforming communities across Uganda through discipleship, compassion, and sustainable development.',
    socials: { facebook: '', twitter: '', instagram: '', youtube: '' },
  },
  vision: {
    vision:
      "A society where lives are transformed through Christ, families are restored, and communities reflect God's design of wholeness.",
    mission:
      'To transform lives and restore communities through Christ centered outreach, discipleship, and holistic empowerment.',
    tagline: 'Restoring Lives. Rebuilding Families. Transforming Communities Through Christ.',
  },
  values: [
    { name: 'Christ Centeredness', desc: 'Jesus is the foundation of all we do.', color: '#2D6A4F' },
    { name: 'Restoration', desc: "Every life can be made new through God's grace.", color: '#D4A017' },
    { name: 'Compassion', desc: 'We serve with the heart of Christ.', color: '#8B5E3C' },
    { name: 'Empowerment', desc: 'We equip people to lead sustainable change.', color: '#1A3A5C' },
    { name: 'Holistic Transformation', desc: 'Spiritual, social, and economic renewal together.', color: '#7C3AED' },
    { name: 'Integrity', desc: 'Transparent and accountable in all we do.', color: '#0891B2' },
    { name: 'Partnership', desc: 'We achieve more together through collaboration.', color: '#40916C' },
    { name: 'Dignity', desc: 'Every person bears the image of God.', color: '#C49A6C' },
  ],
  programs: [
    {
      id: 'prison', icon: 'prison', title: 'Prison Outreach & Restoration',
      tagline: 'Bringing hope behind prison walls', color: '#2D6A4F',
      bg: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
      description: 'Evangelism, discipleship, counseling, and reintegration support for incarcerated people and those returning to their communities.',
      activities: ['Evangelism and Bible discipleship', 'Professional counseling and trauma therapy', 'Pre release life skills preparation', 'Post release reintegration support', 'Family reconciliation and mentorship'],
      impact: 'Thousands of lives transformed behind bars',
    },
    {
      id: 'women', icon: 'women', title: 'Women Empowerment',
      tagline: 'Building strong, self sufficient women', color: '#8B5E3C',
      bg: 'linear-gradient(135deg, #6B3E26, #8B5E3C)',
      description: 'Vocational skills, entrepreneurship, mentorship, and savings groups for single mothers and vulnerable women.',
      activities: ['Vocational skills training and certification', 'Entrepreneurship and business development', 'Parenting support and family coaching', 'Savings groups and micro finance linkages', 'Mentorship and spiritual formation'],
      impact: 'Hundreds of women running sustainable businesses',
    },
    {
      id: 'children', icon: 'children', title: 'Children Support',
      tagline: 'Every child deserves a future', color: '#1A3A5C',
      bg: 'linear-gradient(135deg, #0D2137, #1A3A5C)',
      description: 'Education assistance, child protection, mentoring, and spiritual nurture for vulnerable children and those born in prison.',
      activities: ['Education assistance and school fees support', 'Child protection and safety programs', 'After school mentoring and holiday programs', 'Nutritional support and healthcare access', 'Trauma informed counseling'],
      impact: 'Hundreds of children supported in education',
    },
    {
      id: 'youth', icon: 'youth', title: 'Youth Empowerment',
      tagline: 'Equipping the leaders of tomorrow', color: '#7C3AED',
      bg: 'linear-gradient(135deg, #4C1D95, #7C3AED)',
      description: 'Skills training, entrepreneurship, leadership development, and career guidance for unemployed and at risk youth.',
      activities: ['Practical vocational skills training', 'Entrepreneurship incubation and mentorship', 'Leadership development programs', 'Career guidance and professional coaching', 'Christian character and values formation'],
      impact: 'Youth transformed into leaders and entrepreneurs',
    },
    {
      id: 'family', icon: 'family', title: 'Family Strengthening',
      tagline: 'Strong families build strong communities', color: '#0891B2',
      bg: 'linear-gradient(135deg, #0E7490, #0891B2)',
      description: 'Marriage enrichment, parenting workshops, reconciliation, and counseling for families seeking restoration.',
      activities: ['Marriage enrichment retreats and workshops', 'Parenting skills development programs', 'Family conflict resolution and mediation', 'Pre marital preparation programs', 'Single parent household support'],
      impact: 'Families restored and marriages saved',
    },
    {
      id: 'community', icon: 'community', title: 'Community Outreach',
      tagline: 'Transforming entire neighborhoods for God', color: '#B45309',
      bg: 'linear-gradient(135deg, #92400E, #D97706)',
      description: 'Evangelism, relief assistance, health awareness, and development initiatives reaching underserved neighborhoods across Uganda.',
      activities: ['Community evangelism and crusades', 'Relief assistance for crisis situations', 'Health awareness and hygiene programs', 'Community development projects', 'Neighborhood prayer networks'],
      impact: 'Communities transformed across Uganda',
    },
  ],
  aboutFacts: [
    { label: 'Founded', value: 'Kampala, Uganda' },
    { label: 'Focus', value: 'Prison Ministry & Community Development' },
    { label: 'Status', value: 'Non Profit Christian Ministry' },
    { label: 'Programs', value: '6 Core Ministry Programs' },
    { label: 'Beneficiaries', value: 'Prisoners, Youth, Women, Children' },
  ],
  impactStats: [
    { value: 5000, suffix: '+', label: 'Lives Transformed', desc: 'People reached through our ministry' },
    { value: 12, suffix: '+', label: 'Prison Facilities', desc: 'Facilities receiving regular outreach' },
    { value: 800, suffix: '+', label: 'Women Empowered', desc: 'Mothers and women in our programs' },
    { value: 1200, suffix: '+', label: 'Children Supported', desc: 'Children receiving education and care' },
    { value: 500, suffix: '+', label: 'Youth Trained', desc: 'Young people equipped with skills' },
    { value: 200, suffix: '+', label: 'Families Restored', desc: 'Families reconciled and strengthened' },
    { value: 800, suffix: '+', label: 'Volunteers', desc: 'Servants giving their time and skills' },
    { value: 15, suffix: '+', label: 'Years of Ministry', desc: 'Years of faithful service' },
  ],
  leadership: {
    founder: {
      name: 'Founder & Executive Director',
      title: 'Ecclessia Eden Commission Ministries International',
      role: 'Founder', initials: 'FD',
      bio: 'Visionary leader and founder of EECMI, called by God to serve the marginalized and forgotten. With a deep passion for prison ministry and community transformation, the Founder has built an organization that touches thousands of lives across Uganda.',
      responsibilities: ['Strategic vision and ministry direction', 'Prison ministry leadership', 'Partnership development', 'Community engagement', 'Organizational governance'],
    },
    advisory: [
      { name: 'Advisory Board Member', role: 'Spiritual Oversight', initials: 'AB' },
      { name: 'Advisory Board Member', role: 'Financial Stewardship', initials: 'AB' },
      { name: 'Advisory Board Member', role: 'Community Development', initials: 'AB' },
      { name: 'Advisory Board Member', role: 'Legal & Governance', initials: 'AB' },
    ],
  },
  stories: [
    { name: 'David M.', role: 'Former Prisoner, Kampala', program: 'Prison Outreach', story: 'I entered prison a broken man. The EECMI team brought the Gospel to my cell. Three years after release I run a carpentry business, my family is restored, and I volunteer in the same prison that once held me.' },
    { name: 'Grace N.', role: "Women's Empowerment Graduate", program: 'Women Empowerment', story: 'As a single mother of four I had no income and no hope. EECMI gave me tailoring skills, business training, and a savings group. Today I employ five other women in my community.' },
    { name: 'James O.', role: 'Youth Skills Program Graduate', program: 'Youth Empowerment', story: 'I was an unemployed school dropout heading toward gang life. EECMI trained me in IT skills and helped me launch a tech repair business. Now I mentor twelve other youth.' },
    { name: 'Sarah & Peter K.', role: 'Family Strengthening Program', program: 'Family Strengthening', story: "Our marriage was on the verge of collapse. Through EECMI's retreats and counseling we found forgiveness and rebuilt trust. Our family is now a testimony of God's restoring power." },
  ],
  scripture: {
    text: 'Arise, shine, for your light has come, and the glory of the LORD rises upon you.',
    reference: 'Isaiah 60:1',
  },
};
