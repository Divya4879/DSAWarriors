/**
 * Navbar component for site navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
});

/**
 * Render the navbar
 */
function renderNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  const userProfile = Storage.get(Storage.KEYS.USER_PROFILE);
  const currentPath = window.location.hash.substring(1) || '/';
  
  navbar.innerHTML = `
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-3">
        <div class="flex items-center">
          <a href="#/" class="flex items-center">
            <svg class="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <span class="ml-2 text-xl font-bold text-white">DSA Roadmap</span>
          </a>
          
          <div class="hidden md:flex ml-10 space-x-4">
            <a href="#/" class="px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">
              Home
            </a>
            <a href="#/assessment" class="px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/assessment' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">
              Assessment
            </a>
            ${userProfile ? `
              <a href="#/roadmap" class="px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/roadmap' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">
                Roadmap
              </a>
              <a href="#/resources" class="px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/resources' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">
                Resources
              </a>
              <a href="#/projects" class="px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/projects' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">
                Projects
              </a>
              <a href="#/algorithms" class="px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/algorithms' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">
                Algorithms
              </a>
            ` : ''}
          </div>
        </div>
        
        <div class="flex items-center">
          ${userProfile ? `
            <div class="flex items-center">
              <span class="text-sm text-gray-300 mr-2">${userProfile.name}</span>
              <span class="px-2 py-1 rounded-md text-xs font-medium bg-primary-600 text-white">
                ${capitalizeFirstLetter(userProfile.level)}
              </span>
            </div>
          ` : ''}
          
          <button id="mobile-menu-button" class="md:hidden ml-4 text-gray-300 hover:text-white focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <div id="mobile-menu" class="hidden md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a href="#/" class="block px-3 py-2 rounded-md text-base font-medium ${currentPath === '/' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">
            Home
          </a>
          <a href="#/assessment" class="block px-3 py-2 rounded-md text-base font-medium ${currentPath === '/assessment' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">
            Assessment
          </a>
          ${userProfile ? `
            <a href="#/roadmap" class="block px-3 py-2 rounded-md text-base font-medium ${currentPath === '/roadmap' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">
              Roadmap
            </a>
            <a href="#/resources" class="block px-3 py-2 rounded-md text-base font-medium ${currentPath === '/resources' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">
              Resources
            </a>
            <a href="#/projects" class="block px-3 py-2 rounded-md text-base font-medium ${currentPath === '/projects' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">
              Projects
            </a>
            <a href="#/algorithms" class="block px-3 py-2 rounded-md text-base font-medium ${currentPath === '/algorithms' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">
              Algorithms
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;
  
  // Add event listener for mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

/**
 * Capitalize first letter of a string
 * @param {string} string - String to capitalize
 * @returns {string} Capitalized string
 */
function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}
