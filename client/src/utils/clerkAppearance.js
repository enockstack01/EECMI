// Shared Clerk <SignIn/>/<SignUp/>/<UserProfile/> theming to match the EECMI brand system.
export const clerkAppearance = {
  layout: {
    logoImageUrl: `${process.env.PUBLIC_URL}/logo.png`,
    logoPlacement: 'inside',
  },
  variables: {
    colorPrimary: '#2D6A4F',
    colorText: '#111827',
    colorTextSecondary: '#6B7280',
    colorBackground: '#FFFFFF',
    colorInputBackground: '#FFFFFF',
    colorInputText: '#111827',
    borderRadius: '10px',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  elements: {
    rootBox: { width: '100%' },
    card: { boxShadow: 'none', padding: 0, width: '100%' },
    headerTitle: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 },
    formButtonPrimary: {
      backgroundColor: '#2D6A4F',
      fontSize: '0.95rem',
      textTransform: 'none',
      '&:hover': { backgroundColor: '#1B4332' },
    },
    footerActionLink: { color: '#2D6A4F', fontWeight: 600 },
    formFieldInput: { borderColor: '#E5E7EB' },
    dividerLine: { backgroundColor: '#E5E7EB' },
    socialButtonsBlockButton: { borderColor: '#E5E7EB' },
  },
};
