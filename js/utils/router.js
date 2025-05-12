/**
 * Simple client-side router for single page application
 */
const Router = {
  routes: {
    '/': 'home',
    '/assessment': 'assessment',
    '/roadmap': 'roadmap',
    '/resources': 'resources',
    '/projects': 'projects',
    '/blogs': 'blogs',
    '/books': 'books',
    '/algorithms': 'algorithms'
  },

  init: () => {
    // Handle initial route
    Router.navigate(window.location.hash.substring(1) || '/');
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      const path = window.location.hash.substring(1) || '/';
      Router.navigate(path);
    });
  },

  navigate: (path) => {
    console.log(`Navigating to: ${path}`);
    const route = Router.routes[path] || Router.routes['/'];
    console.log(`Route: ${route}`);
    
    // Update active nav item
    document.querySelectorAll('#navbar a').forEach(link => {
      link.classList.remove('bg-gray-700');
      if (link.getAttribute('href') === `#${path}`) {
        link.classList.add('bg-gray-700');
      }
    });

    // Clear content area
    const contentArea = document.getElementById('content');
    contentArea.innerHTML = '';
    
    // Load page content immediately without loading indicator
    const renderFunction = `render${route.charAt(0).toUpperCase() + route.slice(1)}Page`;
    console.log(`Looking for render function: ${renderFunction}`);
    
    if (window[renderFunction]) {
      console.log(`Found render function: ${renderFunction}, executing...`);
      window[renderFunction](contentArea);
    } else {
      console.error(`Render function not found: ${renderFunction}`);
      contentArea.innerHTML = '<div class="text-center py-12"><h2 class="text-2xl font-bold text-red-500">Page not found</h2></div>';
    }
  }
};
