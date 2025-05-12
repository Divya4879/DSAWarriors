/**
 * Main application entry point
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the router
  Router.init();
  
  // Initialize API with configuration
  API.init();
  
  // Check if user has completed onboarding
  const userProfile = Storage.get(Storage.KEYS.USER_PROFILE);
  
  // If no user profile, redirect to assessment
  if (!userProfile && window.location.hash !== '#/assessment') {
    window.location.hash = '#/assessment';
  }
});
