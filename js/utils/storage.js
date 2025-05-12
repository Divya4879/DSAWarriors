/**
 * Storage utility for managing localStorage operations
 */
const Storage = {
  /**
   * Save data to localStorage
   * @param {string} key - The key to store data under
   * @param {any} data - The data to store
   */
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  /**
   * Get data from localStorage
   * @param {string} key - The key to retrieve data from
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} The retrieved data or defaultValue
   */
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return defaultValue;
    }
  },

  /**
   * Remove data from localStorage
   * @param {string} key - The key to remove
   */
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  /**
   * Clear all app data from localStorage
   */
  clearAll: () => {
    try {
      // Only clear items with our app prefix to avoid clearing other site data
      const appPrefix = 'dsa_roadmap_';
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(appPrefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  // Keys used throughout the application
  KEYS: {
    USER_PROFILE: 'dsa_roadmap_user_profile',
    ASSESSMENT_QUESTIONS: 'dsa_roadmap_assessment_questions',
    ASSESSMENT_RESULTS: 'dsa_roadmap_assessment_results',
    ROADMAP_PROGRESS: 'dsa_roadmap_progress',
    BOOKMARKED_RESOURCES: 'dsa_roadmap_bookmarks',
    COMPLETED_RESOURCES: 'dsa_roadmap_completed',
    PROJECT_PROGRESS: 'dsa_roadmap_projects',
    BOOKMARKED_BLOGS: 'dsa_roadmap_bookmarked_blogs',
    BOOKMARKED_BOOKS: 'dsa_roadmap_bookmarked_books',
    ALGORITHM_NOTES: 'dsa_roadmap_algorithm_notes',
    THEME_PREFERENCE: 'dsa_roadmap_theme'
  }
};
