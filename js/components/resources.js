/**
 * Resources component for displaying curated learning resources
 */

/**
 * Render the resources page
 * @param {HTMLElement} container - The container to render the resources in
 */
function renderResources(container) {
  // Get user profile for language preference
  const userProfile = Storage.get(Storage.KEYS.USER_PROFILE, { language: 'javascript' });
  const language = userProfile.language || 'javascript';
  
  // Get bookmarked resources
  const bookmarkedResources = Storage.get(Storage.KEYS.BOOKMARKED_RESOURCES, []);
  
  // Get completed resources
  const completedResources = Storage.get(Storage.KEYS.COMPLETED_RESOURCES, []);
  
  // Render resources container
  container.innerHTML = `
    <div class="max-w-4xl mx-auto fade-in">
      <div class="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-2xl font-bold text-white mb-2">Learning Resources</h2>
        <p class="text-gray-300">Curated free resources for mastering DSA with ${language.charAt(0).toUpperCase() + language.slice(1)}</p>
      </div>
      
      <div class="mb-6">
        <div class="flex flex-wrap gap-2 mb-4">
          <button class="resource-filter-btn bg-primary-600 text-white px-4 py-2 rounded-md text-sm" data-filter="all">
            All Resources
          </button>
          <button class="resource-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="documentation">
            Documentation
          </button>
          <button class="resource-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="tutorial">
            Tutorials
          </button>
          <button class="resource-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="practice">
            Practice
          </button>
          <button class="resource-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="video">
            Videos
          </button>
          <button class="resource-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="bookmarked">
            Bookmarked
          </button>
        </div>
        
        <div class="relative">
          <input type="text" id="resource-search" placeholder="Search resources..." 
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-white">
          <svg class="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div id="resources-container" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Resources will be rendered here -->
      </div>
    </div>
  `;
  
  // Get resources based on language
  const resources = getResourcesByLanguage(language);
  
  // Render resources
  renderResourcesList(resources, bookmarkedResources, completedResources);
  
  // Add event listeners for filter buttons
  document.querySelectorAll('.resource-filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      document.querySelectorAll('.resource-filter-btn').forEach(btn => {
        btn.classList.remove('bg-primary-600');
        btn.classList.add('bg-gray-700');
      });
      button.classList.remove('bg-gray-700');
      button.classList.add('bg-primary-600');
      
      // Filter resources
      const filter = button.getAttribute('data-filter');
      filterResources(resources, filter, bookmarkedResources, completedResources);
    });
  });
  
  // Add event listener for search
  const searchInput = document.getElementById('resource-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const activeFilter = document.querySelector('.resource-filter-btn.bg-primary-600').getAttribute('data-filter');
      
      filterResources(resources, activeFilter, bookmarkedResources, completedResources, searchTerm);
    });
  }
}

/**
 * Render the resources list
 * @param {Array} resources - List of resources
 * @param {Array} bookmarkedResources - List of bookmarked resource IDs
 * @param {Array} completedResources - List of completed resource IDs
 * @param {string} searchTerm - Optional search term
 */
function renderResourcesList(resources, bookmarkedResources, completedResources, searchTerm = '') {
  const resourcesContainer = document.getElementById('resources-container');
  if (!resourcesContainer) return;
  
  // Filter resources by search term if provided
  let filteredResources = resources;
  if (searchTerm) {
    filteredResources = resources.filter(resource => 
      resource.title.toLowerCase().includes(searchTerm) || 
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.topics.some(topic => topic.toLowerCase().includes(searchTerm))
    );
  }
  
  // Clear container
  resourcesContainer.innerHTML = '';
  
  if (filteredResources.length === 0) {
    resourcesContainer.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-gray-400">No resources found matching your criteria.</p>
      </div>
    `;
    return;
  }
  
  // Render each resource
  filteredResources.forEach(resource => {
    const isBookmarked = bookmarkedResources.includes(resource.id);
    const isCompleted = completedResources.includes(resource.id);
    
    const resourceCard = document.createElement('div');
    resourceCard.className = `resource-card rounded-lg overflow-hidden ${isCompleted ? 'opacity-75' : ''}`;
    resourceCard.setAttribute('data-resource-id', resource.id);
    resourceCard.setAttribute('data-resource-type', resource.type);
    
    resourceCard.innerHTML = `
      <div class="p-5">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-semibold text-white ${isCompleted ? 'line-through' : ''}">${resource.title}</h3>
          <button class="bookmark-btn text-gray-400 hover:text-yellow-500 focus:outline-none transition" data-resource-id="${resource.id}">
            <svg class="w-5 h-5 ${isBookmarked ? 'text-yellow-500 fill-current' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
        
        <p class="text-gray-300 text-sm mb-3">${resource.description}</p>
        
        <div class="flex flex-wrap gap-1 mb-4">
          ${resource.topics.map(topic => `
            <span class="tag tag-primary">
              ${topic}
            </span>
          `).join('')}
        </div>
        
        <div class="flex justify-between items-center">
          <span class="tag">
            ${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
          </span>
          
          <div class="flex items-center space-x-3">
            <label class="flex items-center text-sm text-gray-300">
              <input type="checkbox" class="resource-completed-checkbox mr-1 custom-checkbox" 
                data-resource-id="${resource.id}" ${isCompleted ? 'checked' : ''}>
              Completed
            </label>
            
            <a href="${resource.url}" target="_blank" rel="noopener" 
              class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
              Visit
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;
    
    resourcesContainer.appendChild(resourceCard);
  });
  
  // Add event listeners for bookmark buttons
  document.querySelectorAll('.bookmark-btn').forEach(button => {
    button.addEventListener('click', () => {
      const resourceId = button.getAttribute('data-resource-id');
      toggleBookmark(resourceId);
    });
  });
  
  // Add event listeners for completed checkboxes
  document.querySelectorAll('.resource-completed-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const resourceId = checkbox.getAttribute('data-resource-id');
      toggleCompleted(resourceId);
    });
  });
}

/**
 * Filter resources by type
 * @param {Array} resources - List of resources
 * @param {string} filter - Filter type
 * @param {Array} bookmarkedResources - List of bookmarked resource IDs
 * @param {Array} completedResources - List of completed resource IDs
 * @param {string} searchTerm - Optional search term
 */
function filterResources(resources, filter, bookmarkedResources, completedResources, searchTerm = '') {
  let filteredResources = resources;
  
  // Apply type filter
  if (filter !== 'all') {
    if (filter === 'bookmarked') {
      filteredResources = resources.filter(resource => bookmarkedResources.includes(resource.id));
    } else {
      filteredResources = resources.filter(resource => resource.type === filter);
    }
  }
  
  // Apply search filter if provided
  if (searchTerm) {
    filteredResources = filteredResources.filter(resource => 
      resource.title.toLowerCase().includes(searchTerm) || 
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.topics.some(topic => topic.toLowerCase().includes(searchTerm))
    );
  }
  
  // Render filtered resources
  renderResourcesList(filteredResources, bookmarkedResources, completedResources);
}

/**
 * Toggle bookmark status for a resource
 * @param {string} resourceId - Resource ID
 */
function toggleBookmark(resourceId) {
  // Get current bookmarks
  const bookmarkedResources = Storage.get(Storage.KEYS.BOOKMARKED_RESOURCES, []);
  
  // Toggle bookmark
  const isBookmarked = bookmarkedResources.includes(resourceId);
  let updatedBookmarks;
  
  if (isBookmarked) {
    updatedBookmarks = bookmarkedResources.filter(id => id !== resourceId);
  } else {
    updatedBookmarks = [...bookmarkedResources, resourceId];
  }
  
  // Save updated bookmarks
  Storage.save(Storage.KEYS.BOOKMARKED_RESOURCES, updatedBookmarks);
  
  // Update UI
  const bookmarkBtn = document.querySelector(`.bookmark-btn[data-resource-id="${resourceId}"] svg`);
  if (bookmarkBtn) {
    if (isBookmarked) {
      bookmarkBtn.classList.remove('text-yellow-500', 'fill-current');
    } else {
      bookmarkBtn.classList.add('text-yellow-500', 'fill-current');
    }
  }
}

/**
 * Toggle completed status for a resource
 * @param {string} resourceId - Resource ID
 */
function toggleCompleted(resourceId) {
  // Get current completed resources
  const completedResources = Storage.get(Storage.KEYS.COMPLETED_RESOURCES, []);
  
  // Toggle completed status
  const isCompleted = completedResources.includes(resourceId);
  let updatedCompleted;
  
  if (isCompleted) {
    updatedCompleted = completedResources.filter(id => id !== resourceId);
  } else {
    updatedCompleted = [...completedResources, resourceId];
  }
  
  // Save updated completed resources
  Storage.save(Storage.KEYS.COMPLETED_RESOURCES, updatedCompleted);
  
  // Update UI
  const resourceCard = document.querySelector(`.resource-card[data-resource-id="${resourceId}"]`);
  const resourceTitle = resourceCard?.querySelector('h3');
  
  if (resourceCard && resourceTitle) {
    if (isCompleted) {
      resourceCard.classList.remove('opacity-75');
      resourceTitle.classList.remove('line-through');
    } else {
      resourceCard.classList.add('opacity-75');
      resourceTitle.classList.add('line-through');
    }
  }
}

/**
 * Get resources by programming language
 * @param {string} language - Programming language
 * @returns {Array} List of resources
 */
function getResourcesByLanguage(language) {
  // Comprehensive list of DSA resources
  const commonResources = [
    {
      id: 'gfg-dsa',
      title: 'GeeksforGeeks DSA',
      description: 'Comprehensive DSA tutorials and practice problems',
      url: 'https://www.geeksforgeeks.org/data-structures/',
      type: 'tutorial',
      topics: ['Data Structures', 'Algorithms', 'Problem Solving'],
      image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png'
    },
    // New documentation resources
    {
      id: 'google-dev-dsa',
      title: 'Google Developers Tech Dev Guide',
      description: 'Google\'s official guide to data structures and algorithms',
      url: 'https://techdevguide.withgoogle.com/paths/data-structures-and-algorithms/',
      type: 'documentation',
      topics: ['Data Structures', 'Algorithms', 'Interview Preparation'],
      image: 'https://www.gstatic.com/devrel-devsite/prod/v2210deb8920cd4a55bd580441aa58e7853afc04b39a9d9ac4198e1cd7fbe04ef/developers/images/favicon.png'
    },
    {
      id: 'mdn-web-docs',
      title: 'MDN Web Docs',
      description: 'Comprehensive documentation for web technologies',
      url: 'https://developer.mozilla.org/en-US/',
      type: 'documentation',
      topics: ['Web Development', 'JavaScript', 'HTML/CSS'],
      image: 'https://developer.mozilla.org/favicon-48x48.png'
    },
    {
      id: 'javascript-info',
      title: 'JavaScript.info',
      description: 'Modern JavaScript tutorial with detailed explanations',
      url: 'https://javascript.info/',
      type: 'documentation',
      topics: ['JavaScript', 'Modern JS', 'ES6+'],
      image: 'https://javascript.info/img/favicon/favicon.png'
    },
    // New documentation resources
    {
      id: 'google-dev-dsa',
      title: 'Google Developers Tech Dev Guide',
      description: 'Google\'s official guide to data structures and algorithms',
      url: 'https://techdevguide.withgoogle.com/paths/data-structures-and-algorithms/',
      type: 'documentation',
      topics: ['Data Structures', 'Algorithms', 'Interview Preparation'],
      image: 'https://www.gstatic.com/devrel-devsite/prod/v2210deb8920cd4a55bd580441aa58e7853afc04b39a9d9ac4198e1cd7fbe04ef/developers/images/favicon.png'
    },
    {
      id: 'mdn-web-docs',
      title: 'MDN Web Docs',
      description: 'Comprehensive documentation for web technologies',
      url: 'https://developer.mozilla.org/en-US/',
      type: 'documentation',
      topics: ['Web Development', 'JavaScript', 'HTML/CSS'],
      image: 'https://developer.mozilla.org/favicon-48x48.png'
    },
    {
      id: 'javascript-info',
      title: 'JavaScript.info',
      description: 'Modern JavaScript tutorial with detailed explanations',
      url: 'https://javascript.info/',
      type: 'documentation',
      topics: ['JavaScript', 'Modern JS', 'ES6+'],
      image: 'https://javascript.info/img/favicon/favicon.png'
    },
    {
      id: 'python-docs',
      title: 'Python Official Documentation',
      description: 'Comprehensive Python language and standard library documentation',
      url: 'https://docs.python.org/3/',
      type: 'documentation',
      topics: ['Python', 'Language Reference', 'Standard Library'],
      image: 'https://www.python.org/static/favicon.ico'
    },
    {
      id: 'oracle-java-docs',
      title: 'Oracle Java Documentation',
      description: 'Official Java language and API documentation',
      url: 'https://docs.oracle.com/en/java/',
      type: 'documentation',
      topics: ['Java', 'JDK', 'API Reference'],
      image: 'https://www.oracle.com/a/tech/img/cb88-java-logo-001.jpg'
    },
    {
      id: 'cpp-reference',
      title: 'C++ Reference',
      description: 'Comprehensive reference for C++ language and standard library',
      url: 'https://en.cppreference.com/w/',
      type: 'documentation',
      topics: ['C++', 'STL', 'Language Reference'],
      image: 'https://en.cppreference.com/favicon.ico'
    },
    {
      id: 'rust-docs',
      title: 'The Rust Programming Language',
      description: 'Official Rust language documentation and book',
      url: 'https://doc.rust-lang.org/book/',
      type: 'documentation',
      topics: ['Rust', 'Memory Safety', 'Systems Programming'],
      image: 'https://www.rust-lang.org/static/images/favicon.ico'
    },
    {
      id: 'go-docs',
      title: 'Go Documentation',
      description: 'Official Go language documentation and standard library reference',
      url: 'https://go.dev/doc/',
      type: 'documentation',
      topics: ['Go', 'Golang', 'Language Reference'],
      image: 'https://go.dev/favicon.ico'
    },
    {
      id: 'roadmap-sh',
      title: 'roadmap.sh',
      description: 'Community-driven roadmaps, articles and resources for developers',
      url: 'https://roadmap.sh/',
      type: 'documentation',
      topics: ['Learning Paths', 'Career Development', 'Programming'],
      image: 'https://roadmap.sh/manifest-icon-192.maskable.png'
    },
    {
      id: 'clrs-book',
      title: 'Introduction to Algorithms (CLRS)',
      description: 'The canonical textbook on algorithms by Cormen, Leiserson, Rivest, and Stein',
      url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition',
      type: 'documentation',
      topics: ['Algorithms', 'Theoretical Computer Science', 'Academic'],
      image: 'https://mitpress.mit.edu/sites/default/files/styles/large_book_cover/http/mitp-content-server.mit.edu%3A18180/books/covers/cover/%3Fcollid%3Dbooks_covers_0%26isbn%3D9780262033848%26type%3D.jpg'
    },
    {
      id: 'leetcode',
      title: 'LeetCode Problems',
      description: 'Practice coding problems with varying difficulty levels',
      url: 'https://leetcode.com/problemset/all/',
      type: 'practice',
      topics: ['Problem Solving', 'Interviews', 'Competitive Programming'],
      image: 'https://leetcode.com/static/images/LeetCode_logo_rvs.png'
    },
    {
      id: 'neetcode',
      title: 'NeetCode 150',
      description: 'Curated list of 150 LeetCode questions for coding interviews',
      url: 'https://neetcode.io/',
      type: 'practice',
      topics: ['Interviews', 'Problem Patterns', 'Blind 75'],
      image: 'https://neetcode.io/assets/images/nc-logo.svg'
    },
    {
      id: 'striver-sde-sheet',
      title: 'Striver\'s SDE Sheet',
      description: 'A structured 30-day roadmap for SDE interview preparation',
      url: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/',
      type: 'practice',
      topics: ['Interview Preparation', 'Structured Learning', 'Problem Solving'],
      image: 'https://takeuforward.org/wp-content/uploads/2022/01/cropped-TUF-01.png'
    },
    {
      id: 'striver-a2z-dsa',
      title: 'Striver\'s A2Z DSA Course',
      description: 'Complete DSA course from basic to advanced topics',
      url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
      type: 'tutorial',
      topics: ['Complete DSA', 'Structured Learning', 'All Levels'],
      image: 'https://takeuforward.org/wp-content/uploads/2022/01/cropped-TUF-01.png'
    },
    {
      id: 'striver-cp-sheet',
      title: 'Striver\'s CP Sheet',
      description: 'Competitive programming problems categorized by topic',
      url: 'https://takeuforward.org/interview-experience/strivers-cp-sheet/',
      type: 'practice',
      topics: ['Competitive Programming', 'Problem Solving', 'Advanced'],
      image: 'https://takeuforward.org/wp-content/uploads/2022/01/cropped-TUF-01.png'
    },
    {
      id: 'arsh-dsa-sheet',
      title: 'Arsh Goyal\'s DSA Sheet',
      description: '280 questions for interview preparation with company tags',
      url: 'https://docs.google.com/spreadsheets/d/1MGVBJ8HkRbCnU6EQASjJKCqQE8BWng4qgL0n3vCVOxE/edit#gid=0',
      type: 'practice',
      topics: ['Company-wise Questions', 'Interview Preparation', 'DSA'],
      image: 'https://media.licdn.com/dms/image/D4D03AQHfUQBZsO0HKA/profile-displayphoto-shrink_800_800/0/1677442553417?e=1720742400&v=beta&t=_Wd_zWOvQJzEVJbSi_CKbmJKnDKNR-_Ym_TIXCrHFP8'
    },
    {
      id: 'visualgo',
      title: 'VisuAlgo',
      description: 'Visualizing data structures and algorithms through animation',
      url: 'https://visualgo.net/',
      type: 'tutorial',
      topics: ['Visualization', 'Data Structures', 'Algorithms'],
      image: 'https://visualgo.net/img/favicon.png'
    },
    {
      id: 'devdocs',
      title: 'DevDocs',
      description: 'Fast, offline, and free documentation browser for developers',
      url: 'https://devdocs.io/',
      type: 'documentation',
      topics: ['API Reference', 'Documentation', 'Multiple Languages'],
      image: 'https://devdocs.io/images/icon-192.png'
    },
    {
      id: 'big-o-cheatsheet',
      title: 'Big-O Cheat Sheet',
      description: 'Time and space complexity cheat sheet for common algorithms',
      url: 'https://www.bigocheatsheet.com/',
      type: 'documentation',
      topics: ['Time Complexity', 'Space Complexity', 'Algorithm Analysis'],
      image: 'https://www.bigocheatsheet.com/img/big-o-cheat-sheet-poster.png'
    },
    {
      id: 'algo-visualizer',
      title: 'Algorithm Visualizer',
      description: 'Interactive online platform that visualizes algorithms from code',
      url: 'https://algorithm-visualizer.org/',
      type: 'tutorial',
      topics: ['Visualization', 'Algorithms', 'Interactive Learning'],
      image: 'https://algorithm-visualizer.org/favicon.png'
    },
    {
      id: 'cs50',
      title: 'Harvard CS50',
      description: 'Harvard\'s introduction to computer science and programming',
      url: 'https://cs50.harvard.edu/x/',
      type: 'video',
      topics: ['Computer Science', 'Programming', 'Fundamentals'],
      image: 'https://cs50.harvard.edu/x/2023/favicon.ico'
    },
    {
      id: 'mit-algorithms',
      title: 'MIT Introduction to Algorithms',
      description: 'MIT\'s course on algorithms and data structures',
      url: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/',
      type: 'video',
      topics: ['Algorithms', 'Data Structures', 'Academic'],
      image: 'https://ocw.mit.edu/images/mit_logo_footer.png'
    },
    {
      id: 'codeforces',
      title: 'Codeforces',
      description: 'Competitive programming platform with regular contests',
      url: 'https://codeforces.com/',
      type: 'practice',
      topics: ['Competitive Programming', 'Contests', 'Problem Solving'],
      image: 'https://codeforces.org/s/0/favicon-96x96.png'
    },
    {
      id: 'atcoder',
      title: 'AtCoder',
      description: 'Japanese competitive programming platform with high-quality problems',
      url: 'https://atcoder.jp/',
      type: 'practice',
      topics: ['Competitive Programming', 'Contests', 'Algorithm Challenges'],
      image: 'https://img.atcoder.jp/assets/favicon.png'
    },
    {
      id: 'hackerrank',
      title: 'HackerRank',
      description: 'Practice coding challenges and prepare for interviews',
      url: 'https://www.hackerrank.com/domains/algorithms',
      type: 'practice',
      topics: ['Algorithms', 'Data Structures', 'Interview Preparation'],
      image: 'https://hrcdn.net/community-frontend/assets/favicon-ddc852f75a.png'
    },
    {
      id: 'codechef',
      title: 'CodeChef',
      description: 'Competitive programming platform with long and short contests',
      url: 'https://www.codechef.com/',
      type: 'practice',
      topics: ['Competitive Programming', 'Contests', 'Problem Solving'],
      image: 'https://www.codechef.com/sites/all/themes/abessive/logo.svg'
    },
    {
      id: 'interviewbit',
      title: 'InterviewBit',
      description: 'Platform for interview preparation with company-specific questions',
      url: 'https://www.interviewbit.com/practice/',
      type: 'practice',
      topics: ['Interview Preparation', 'Company Questions', 'Problem Solving'],
      image: 'https://www.interviewbit.com/blog/wp-content/uploads/2021/01/ib-logo-inverted.png'
    },
    {
      id: 'algoexpert',
      title: 'AlgoExpert',
      description: 'Platform with 160+ hand-picked questions for interview preparation',
      url: 'https://www.algoexpert.io/',
      type: 'practice',
      topics: ['Interview Preparation', 'Video Explanations', 'Curated Problems'],
      image: 'https://assets.algoexpert.io/g1e47ba0a7c-prod/dist/images/favicon.ico'
    },
    // New documentation resources
    {
      id: 'google-dev-dsa',
      title: 'Google Developers Tech Dev Guide',
      description: 'Google\'s official guide to data structures and algorithms',
      url: 'https://techdevguide.withgoogle.com/paths/data-structures-and-algorithms/',
      type: 'documentation',
      topics: ['Data Structures', 'Algorithms', 'Interview Preparation'],
      image: 'https://www.gstatic.com/devrel-devsite/prod/v2210deb8920cd4a55bd580441aa58e7853afc04b39a9d9ac4198e1cd7fbe04ef/developers/images/favicon.png'
    },
    {
      id: 'mdn-web-docs',
      title: 'MDN Web Docs',
      description: 'Comprehensive documentation for web technologies',
      url: 'https://developer.mozilla.org/en-US/',
      type: 'documentation',
      topics: ['Web Development', 'JavaScript', 'HTML/CSS'],
      image: 'https://developer.mozilla.org/favicon-48x48.png'
    },
    {
      id: 'javascript-info',
      title: 'JavaScript.info',
      description: 'Modern JavaScript tutorial with detailed explanations',
      url: 'https://javascript.info/',
      type: 'documentation',
      topics: ['JavaScript', 'Modern JS', 'ES6+'],
      image: 'https://javascript.info/img/favicon/favicon.png'
    },
    {
      id: 'python-docs',
      title: 'Python Official Documentation',
      description: 'Comprehensive Python language and standard library documentation',
      url: 'https://docs.python.org/3/',
      type: 'documentation',
      topics: ['Python', 'Language Reference', 'Standard Library'],
      image: 'https://www.python.org/static/favicon.ico'
    },
    {
      id: 'oracle-java-docs',
      title: 'Oracle Java Documentation',
      description: 'Official Java language and API documentation',
      url: 'https://docs.oracle.com/en/java/',
      type: 'documentation',
      topics: ['Java', 'JDK', 'API Reference'],
      image: 'https://www.oracle.com/a/tech/img/cb88-java-logo-001.jpg'
    },
    {
      id: 'cpp-reference',
      title: 'C++ Reference',
      description: 'Comprehensive reference for C++ language and standard library',
      url: 'https://en.cppreference.com/w/',
      type: 'documentation',
      topics: ['C++', 'STL', 'Language Reference'],
      image: 'https://en.cppreference.com/favicon.ico'
    },
    {
      id: 'rust-docs',
      title: 'The Rust Programming Language',
      description: 'Official Rust language documentation and book',
      url: 'https://doc.rust-lang.org/book/',
      type: 'documentation',
      topics: ['Rust', 'Memory Safety', 'Systems Programming'],
      image: 'https://www.rust-lang.org/static/images/favicon.ico'
    },
    {
      id: 'go-docs',
      title: 'Go Documentation',
      description: 'Official Go language documentation and standard library reference',
      url: 'https://go.dev/doc/',
      type: 'documentation',
      topics: ['Go', 'Golang', 'Language Reference'],
      image: 'https://go.dev/favicon.ico'
    },
    {
      id: 'roadmap-sh',
      title: 'roadmap.sh',
      description: 'Community-driven roadmaps, articles and resources for developers',
      url: 'https://roadmap.sh/',
      type: 'documentation',
      topics: ['Learning Paths', 'Career Development', 'Programming'],
      image: 'https://roadmap.sh/manifest-icon-192.maskable.png'
    },
    {
      id: 'clrs-book',
      title: 'Introduction to Algorithms (CLRS)',
      description: 'The canonical textbook on algorithms by Cormen, Leiserson, Rivest, and Stein',
      url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition',
      type: 'documentation',
      topics: ['Algorithms', 'Theoretical Computer Science', 'Academic'],
      image: 'https://mitpress.mit.edu/sites/default/files/styles/large_book_cover/http/mitp-content-server.mit.edu%3A18180/books/covers/cover/%3Fcollid%3Dbooks_covers_0%26isbn%3D9780262033848%26type%3D.jpg'
    }
  ];
  
  // Language-specific resources
  const languageResources = {
    java: [
      {
        id: 'java-docs',
        title: 'Oracle Java Documentation',
        description: 'Official Java documentation and tutorials',
        url: 'https://docs.oracle.com/javase/',
        type: 'documentation',
        topics: ['Java', 'Language Basics', 'API Reference'],
        image: 'https://www.oracle.com/a/tech/img/cb88-java-logo-001.jpg'
      },
      {
        id: 'java-collections',
        title: 'Java Collections Framework',
        description: 'Learn about Java Collections Framework for data structures',
        url: 'https://docs.oracle.com/javase/tutorial/collections/',
        type: 'documentation',
        topics: ['Collections', 'Data Structures', 'Java'],
        image: 'https://www.oracle.com/a/tech/img/cb88-java-logo-001.jpg'
      },
      {
        id: 'java-visualizer',
        title: 'Java Visualizer',
        description: 'Visualize Java code execution step by step',
        url: 'https://cscircles.cemc.uwaterloo.ca/java_visualize/',
        type: 'tutorial',
        topics: ['Java', 'Visualization', 'Debugging'],
        image: 'https://cscircles.cemc.uwaterloo.ca/java_visualize/favicon.ico'
      },
      {
        id: 'striver-java',
        title: 'Striver\'s SDE Sheet (Java Solutions)',
        description: 'Java implementations for all problems in Striver\'s SDE Sheet',
        url: 'https://github.com/striver79/SDESheet/tree/main/Java',
        type: 'practice',
        topics: ['Java', 'Interview Preparation', 'Problem Solving'],
        image: 'https://takeuforward.org/wp-content/uploads/2022/01/cropped-TUF-01.png'
      },
      {
        id: 'baeldung-java-dsa',
        title: 'Baeldung Java DSA',
        description: 'High-quality tutorials on Java data structures and algorithms',
        url: 'https://www.baeldung.com/java-algorithms',
        type: 'tutorial',
        topics: ['Java', 'Data Structures', 'Algorithms'],
        image: 'https://www.baeldung.com/wp-content/themes/baeldung/favicon/favicon-32x32.png'
      }
    ],
    python: [
      {
        id: 'python-docs',
        title: 'Python Documentation',
        description: 'Official Python documentation and tutorials',
        url: 'https://docs.python.org/3/',
        type: 'documentation',
        topics: ['Python', 'Language Basics', 'API Reference'],
        image: 'https://www.python.org/static/favicon.ico'
      },
      {
        id: 'python-dsa',
        title: 'Problem Solving with Algorithms and Data Structures using Python',
        description: 'Interactive book on DSA with Python',
        url: 'https://runestone.academy/runestone/books/published/pythonds/index.html',
        type: 'tutorial',
        topics: ['Python', 'Data Structures', 'Algorithms'],
        image: 'https://runestone.academy/runestone/static/images/logo_small.png'
      },
      {
        id: 'python-tutor',
        title: 'Python Tutor',
        description: 'Visualize Python code execution step by step',
        url: 'http://pythontutor.com/',
        type: 'tutorial',
        topics: ['Python', 'Visualization', 'Debugging'],
        image: 'http://pythontutor.com/favicon.ico'
      },
      {
        id: 'real-python',
        title: 'Real Python',
        description: 'Python tutorials for developers of all skill levels',
        url: 'https://realpython.com/tutorials/algorithms/',
        type: 'tutorial',
        topics: ['Python', 'Practical Examples', 'Tutorials'],
        image: 'https://realpython.com/static/favicon.68cbf4197b0c.png'
      }
    ],
    javascript: [
      {
        id: 'mdn-js',
        title: 'MDN JavaScript Guide',
        description: 'Comprehensive guide to JavaScript',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
        type: 'documentation',
        topics: ['JavaScript', 'Language Basics', 'API Reference'],
        image: 'https://developer.mozilla.org/favicon-48x48.png'
      },
      {
        id: 'js-dsa',
        title: 'JavaScript Algorithms and Data Structures',
        description: 'Collection of JavaScript based examples of algorithms and data structures',
        url: 'https://github.com/trekhleb/javascript-algorithms',
        type: 'tutorial',
        topics: ['JavaScript', 'Data Structures', 'Algorithms'],
        image: 'https://github.githubassets.com/favicons/favicon.svg'
      },
      {
        id: 'js-visualizer',
        title: 'JavaScript Visualizer',
        description: 'Visualize JavaScript code execution and scope',
        url: 'https://ui.dev/javascript-visualizer/',
        type: 'tutorial',
        topics: ['JavaScript', 'Visualization', 'Scope'],
        image: 'https://ui.dev/favicon.ico'
      },
      {
        id: 'eloquent-js',
        title: 'Eloquent JavaScript',
        description: 'A modern introduction to programming with JavaScript',
        url: 'https://eloquentjavascript.net/',
        type: 'tutorial',
        topics: ['JavaScript', 'Programming', 'Web Development'],
        image: 'https://eloquentjavascript.net/img/cover.jpg'
      }
    ],
    cpp: [
      {
        id: 'cpp-reference',
        title: 'C++ Reference',
        description: 'Comprehensive reference for C++ language and standard library',
        url: 'https://en.cppreference.com/',
        type: 'documentation',
        topics: ['C++', 'Language Basics', 'API Reference'],
        image: 'https://en.cppreference.com/favicon.ico'
      },
      {
        id: 'cpp-dsa',
        title: 'C++ Data Structures and Algorithms',
        description: 'Learn DSA concepts with C++ implementations',
        url: 'https://www.geeksforgeeks.org/c-plus-plus/',
        type: 'tutorial',
        topics: ['C++', 'Data Structures', 'Algorithms'],
        image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png'
      },
      {
        id: 'cpp-visualizer',
        title: 'C++ Tutor',
        description: 'Visualize C++ code execution step by step',
        url: 'http://pythontutor.com/cpp.html',
        type: 'tutorial',
        topics: ['C++', 'Visualization', 'Debugging'],
        image: 'http://pythontutor.com/favicon.ico'
      },
      {
        id: 'striver-cpp',
        title: 'Striver\'s SDE Sheet (C++ Solutions)',
        description: 'C++ implementations for all problems in Striver\'s SDE Sheet',
        url: 'https://github.com/striver79/SDESheet/tree/main/C%2B%2B',
        type: 'practice',
        topics: ['C++', 'Interview Preparation', 'Problem Solving'],
        image: 'https://takeuforward.org/wp-content/uploads/2022/01/cropped-TUF-01.png'
      },
      {
        id: 'codeforces-edu',
        title: 'Codeforces EDU',
        description: 'Educational section with interactive problems and tutorials',
        url: 'https://codeforces.com/edu/courses',
        type: 'tutorial',
        topics: ['C++', 'Algorithms', 'Interactive Learning'],
        image: 'https://codeforces.org/s/0/favicon-96x96.png'
      }
    ],
    csharp: [
      {
        id: 'csharp-docs',
        title: 'C# Documentation',
        description: 'Official C# documentation and tutorials',
        url: 'https://docs.microsoft.com/en-us/dotnet/csharp/',
        type: 'documentation',
        topics: ['C#', 'Language Basics', 'API Reference'],
        image: 'https://docs.microsoft.com/en-us/media/logos/logo-ms-social.png'
      },
      {
        id: 'csharp-dsa',
        title: 'C# Data Structures and Algorithms',
        description: 'Learn DSA concepts with C# implementations',
        url: 'https://www.geeksforgeeks.org/csharp-programming-language/',
        type: 'tutorial',
        topics: ['C#', 'Data Structures', 'Algorithms'],
        image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png'
      },
      {
        id: 'csharp-visualizer',
        title: 'SharpLab',
        description: 'C# code playground that shows intermediate steps and compiled code',
        url: 'https://sharplab.io/',
        type: 'tutorial',
        topics: ['C#', 'Compilation', 'IL Code'],
        image: 'https://sharplab.io/favicon.ico'
      },
      {
        id: 'csharp-in-depth',
        title: 'C# in Depth',
        description: 'Jon Skeet\'s deep dive into C# features and best practices',
        url: 'https://csharpindepth.com/',
        type: 'tutorial',
        topics: ['C#', 'Advanced', 'Best Practices'],
        image: 'https://csharpindepth.com/favicon.ico'
      }
    ],
    rust: [
      {
        id: 'rust-docs',
        title: 'The Rust Programming Language',
        description: 'Official Rust documentation and book',
        url: 'https://doc.rust-lang.org/book/',
        type: 'documentation',
        topics: ['Rust', 'Language Basics', 'Memory Safety'],
        image: 'https://www.rust-lang.org/static/images/rust-logo-blk.svg'
      },
      {
        id: 'rust-by-example',
        title: 'Rust By Example',
        description: 'Collection of runnable examples that illustrate various Rust concepts',
        url: 'https://doc.rust-lang.org/rust-by-example/',
        type: 'tutorial',
        topics: ['Rust', 'Examples', 'Hands-on'],
        image: 'https://www.rust-lang.org/static/images/rust-logo-blk.svg'
      },
      {
        id: 'rust-playground',
        title: 'Rust Playground',
        description: 'Run and share Rust code snippets online',
        url: 'https://play.rust-lang.org/',
        type: 'practice',
        topics: ['Rust', 'Code Execution', 'Sharing'],
        image: 'https://www.rust-lang.org/static/images/rust-logo-blk.svg'
      },
      {
        id: 'rust-algorithms',
        title: 'Rust Algorithms',
        description: 'Common algorithms and data structures implemented in Rust',
        url: 'https://github.com/TheAlgorithms/Rust',
        type: 'tutorial',
        topics: ['Rust', 'Algorithms', 'Data Structures'],
        image: 'https://github.githubassets.com/favicons/favicon.svg'
      }
    ],
    solidity: [
      {
        id: 'solidity-docs',
        title: 'Solidity Documentation',
        description: 'Official Solidity language documentation',
        url: 'https://docs.soliditylang.org/',
        type: 'documentation',
        topics: ['Solidity', 'Smart Contracts', 'Ethereum'],
        image: 'https://docs.soliditylang.org/en/v0.8.17/_static/logo.svg'
      },
      {
        id: 'crypto-zombies',
        title: 'CryptoZombies',
        description: 'Learn to code blockchain DApps by building simple games',
        url: 'https://cryptozombies.io/',
        type: 'tutorial',
        topics: ['Solidity', 'Ethereum', 'Smart Contracts', 'Games'],
        image: 'https://cryptozombies.io/course/static/image/preview.jpg'
      },
      {
        id: 'remix-ide',
        title: 'Remix IDE',
        description: 'Web-based IDE for Solidity development',
        url: 'https://remix.ethereum.org/',
        type: 'practice',
        topics: ['Solidity', 'Smart Contracts', 'Development'],
        image: 'https://remix.ethereum.org/icon.png'
      },
      {
        id: 'solidity-patterns',
        title: 'Solidity Patterns',
        description: 'A collection of design and programming patterns for smart contracts',
        url: 'https://github.com/fravoll/solidity-patterns',
        type: 'tutorial',
        topics: ['Solidity', 'Design Patterns', 'Best Practices'],
        image: 'https://github.githubassets.com/favicons/favicon.svg'
      },
      {
        id: 'ethernaut',
        title: 'The Ethernaut',
        description: 'Web3/Solidity based wargame to learn security concepts',
        url: 'https://ethernaut.openzeppelin.com/',
        type: 'practice',
        topics: ['Solidity', 'Security', 'Smart Contracts'],
        image: 'https://ethernaut.openzeppelin.com/imgs/ethernaut.svg'
      }
    ],
    docker: [
      {
        id: 'docker-docs',
        title: 'Docker Documentation',
        description: 'Official Docker documentation and guides',
        url: 'https://docs.docker.com/',
        type: 'documentation',
        topics: ['Docker', 'Containers', 'DevOps'],
        image: 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png'
      },
      {
        id: 'docker-curriculum',
        title: 'Docker Curriculum',
        description: 'Learn to dockerize applications',
        url: 'https://docker-curriculum.com/',
        type: 'tutorial',
        topics: ['Docker', 'Containerization', 'Deployment'],
        image: 'https://docker-curriculum.com/images/logo.png'
      },
      {
        id: 'play-with-docker',
        title: 'Play with Docker',
        description: 'Interactive Docker playground',
        url: 'https://labs.play-with-docker.com/',
        type: 'practice',
        topics: ['Docker', 'Hands-on', 'Experimentation'],
        image: 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png'
      },
      {
        id: 'docker-mastery',
        title: 'Docker Mastery',
        description: 'Free Docker tutorials and resources',
        url: 'https://github.com/BretFisher/udemy-docker-mastery',
        type: 'tutorial',
        topics: ['Docker', 'Docker Compose', 'Swarm'],
        image: 'https://github.githubassets.com/favicons/favicon.svg'
      }
    ]
  };
  
  // Video resources
  const videoResources = [
    {
      id: 'abdul-bari',
      title: 'Abdul Bari - Algorithms',
      description: 'Comprehensive algorithm course covering all major topics',
      url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O',
      type: 'video',
      topics: ['Algorithms', 'Theory', 'Analysis'],
      image: 'https://yt3.googleusercontent.com/ytc/APkrFKZGyiFJtoR-L1RfS6h84tTqIGrB-5jgBfkIC0jDgA=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'cs-dojo',
      title: 'CS Dojo - Data Structures & Algorithms',
      description: 'Beginner-friendly DSA tutorials',
      url: 'https://www.youtube.com/playlist?list=PLBZBJbE_rGRV8D7XZ08LK6z-4zPoWzu5H',
      type: 'video',
      topics: ['Data Structures', 'Algorithms', 'Beginner'],
      image: 'https://yt3.googleusercontent.com/ytc/APkrFKbpSojje_-tkBQOzgEBUCF2Y9TJgiI6V0eNP5HF=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'freecodecamp-dsa',
      title: 'freeCodeCamp - Data Structures and Algorithms',
      description: 'Full course on data structures and algorithms',
      url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM',
      type: 'video',
      topics: ['Data Structures', 'Algorithms', 'Comprehensive'],
      image: 'https://yt3.googleusercontent.com/ytc/APkrFKaqca-xQcJtp9XfX3YQC7KPDLG5hEHbTY5PbMIZ=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'tech-with-tim',
      title: 'Tech With Tim - Python Data Structures',
      description: 'Python data structures tutorials',
      url: 'https://www.youtube.com/playlist?list=PLzMcBGfZo4-nhWva-6OVh1yKWHBs4o_tv',
      type: 'video',
      topics: ['Python', 'Data Structures', 'Tutorials'],
      image: 'https://yt3.googleusercontent.com/ytc/APkrFKa3yoeLWJXX30BOAgr75umgoreAGjH8uKvYIOKa=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'striver-youtube',
      title: 'Striver (takeUforward) - DSA Tutorials',
      description: 'Comprehensive DSA tutorials and interview preparation',
      url: 'https://www.youtube.com/c/takeUforward',
      type: 'video',
      topics: ['DSA', 'Interview Preparation', 'Problem Solving'],
      image: 'https://yt3.googleusercontent.com/ytc/APkrFKbcqDRQJzn1FGP3Z3sjvKVPiKrAOCYZ_dJAcJ-1=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'neetcode-youtube',
      title: 'NeetCode - LeetCode Solutions',
      description: 'Video explanations for popular LeetCode problems',
      url: 'https://www.youtube.com/c/NeetCode',
      type: 'video',
      topics: ['LeetCode', 'Problem Solving', 'Interviews'],
      image: 'https://yt3.googleusercontent.com/FqiGBOsNpeWbNw20ULboW0jy88JdpqFO9a-YRJ0C2oc4lZ8uoHYJ38PWSkrjdC_zQgNW9pGU=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'back-to-back-swe',
      title: 'Back To Back SWE',
      description: 'In-depth explanations of algorithms and data structures',
      url: 'https://www.youtube.com/c/BackToBackSWE',
      type: 'video',
      topics: ['Algorithms', 'Data Structures', 'Interview Preparation'],
      image: 'https://yt3.googleusercontent.com/ytc/APkrFKYcYswt_UhD7D3gYxh-qQhcU8ONYu77jWK5Zzp0=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'william-fiset',
      title: 'William Fiset - Graph Theory',
      description: 'Comprehensive graph theory algorithms course',
      url: 'https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P',
      type: 'video',
      topics: ['Graph Theory', 'Algorithms', 'Advanced'],
      image: 'https://yt3.googleusercontent.com/ytc/APkrFKZJdGQNLMJg6qRYMEFZVMRfIGcC5pZy-eFJpvMQNw=s176-c-k-c0x00ffffff-no-rj'
    },
    {
      id: 'tushar-roy',
      title: 'Tushar Roy - Coding Made Simple',
      description: 'Detailed explanations of complex algorithms',
      url: 'https://www.youtube.com/user/tusharroy2525',
      type: 'video',
      topics: ['Dynamic Programming', 'Algorithms', 'Problem Solving'],
      image: 'https://yt3.googleusercontent.com/ytc/APkrFKYSGq7QZd6rcyOJMKt3aSHHHWJoZIRfW_RDsNBM=s176-c-k-c0x00ffffff-no-rj'
    }
  ];
  
  // Tutorial resources to add
  const additionalTutorials = [
    {
      id: 'programiz-dsa',
      title: 'Programiz – Learn Data Structures and Algorithms',
      description: 'A step-by-step, text-based tutorial covering beginner to advanced DSA topics, complete with quizzes, examples, and practice problems',
      url: 'https://www.programiz.com/dsa',
      type: 'tutorial',
      topics: ['Data Structures', 'Algorithms', 'Beginner to Advanced'],
      image: 'https://programiz.com/favicon.ico'
    },
    {
      id: 'gfg-dsa-tutorial',
      title: 'GeeksforGeeks – DSA Tutorial',
      description: 'An up-to-date series organized by topic (logic building, complexity analysis, arrays, trees, graphs, hashing, DP) with code snippets in C++, Java, Python, and JavaScript',
      url: 'https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/',
      type: 'tutorial',
      topics: ['Data Structures', 'Algorithms', 'Multiple Languages'],
      image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png'
    },
    {
      id: 'tutorialspoint-dsa',
      title: 'Tutorialspoint – Data Structures & Algorithms',
      description: 'Detailed, language-agnostic explanations paired with an online editor to try C, C++, Java, or Python implementations directly in your browser',
      url: 'https://www.tutorialspoint.com/data_structures_algorithms/index.htm',
      type: 'tutorial',
      topics: ['Data Structures', 'Algorithms', 'Online Editor'],
      image: 'https://www.tutorialspoint.com/favicon.ico'
    },
    {
      id: 'cp-algorithms',
      title: 'CP-Algorithms (e-maxx.ru English)',
      description: 'Authoritative reference for algorithms in competitive programming: theory, C++ code examples, and complexity analysis',
      url: 'https://cp-algorithms.com/index.html',
      type: 'tutorial',
      topics: ['Competitive Programming', 'Algorithms', 'C++'],
      image: 'https://cp-algorithms.com/favicon.ico'
    },
    {
      id: 'freecodecamp-dsa-guide',
      title: 'freeCodeCamp – Learn Data Structures and Algorithms',
      description: 'Article-based tutorial introducing core concepts, Big-O notation, and linking to interactive coding challenges',
      url: 'https://www.freecodecamp.org/news/learn-data-structures-and-algorithms/',
      type: 'tutorial',
      topics: ['Data Structures', 'Algorithms', 'Big-O Notation'],
      image: 'https://www.freecodecamp.org/favicon-32x32.png'
    },
    {
      id: 'w3schools-dsa',
      title: 'W3Schools – DSA Tutorial',
      description: 'Beginner-friendly walkthrough of arrays, stacks, queues, trees, graphs, and sorting/search algorithms, with live "Try it Yourself" code boxes',
      url: 'https://www.w3schools.com/dsa/',
      type: 'tutorial',
      topics: ['Data Structures', 'Algorithms', 'Interactive Learning'],
      image: 'https://www.w3schools.com/favicon.ico'
    },
    {
      id: 'freecodecamp-python-dsa',
      title: 'freeCodeCamp – Learn Data Structures and Algorithms in Python',
      description: 'A full article covering Python implementations of arrays, linked lists, stacks, queues, trees, and sorting algorithms',
      url: 'https://www.freecodecamp.org/news/learn-data-structures-and-algorithms/',
      type: 'tutorial',
      topics: ['Python', 'Data Structures', 'Algorithms'],
      image: 'https://www.freecodecamp.org/favicon-32x32.png'
    },
    {
      id: 'analytics-vidhya-python-dsa',
      title: 'Analytics Vidhya – A Beginners\' Guide to Data Structures in Python',
      description: 'Illustrated tutorial on built-in vs. user-defined Python data structures, complete with code snippets and diagrams',
      url: 'https://www.analyticsvidhya.com/blog/2022/03/data-structures-in-python/',
      type: 'tutorial',
      topics: ['Python', 'Data Structures', 'Beginners'],
      image: 'https://www.analyticsvidhya.com/wp-content/uploads/2015/02/logo_square_withtext.png'
    },
    {
      id: 'programiz-python-dsa',
      title: 'Programiz – Getting Started with DSA (Python)',
      description: 'Setup guide plus Python-focused DSA tutorials showing how to implement stacks, queues, linked lists, and more',
      url: 'https://www.programiz.com/dsa/getting-started',
      type: 'tutorial',
      topics: ['Python', 'Data Structures', 'Algorithms'],
      image: 'https://programiz.com/favicon.ico'
    },
    {
      id: 'programiz-java-dsa',
      title: 'Programiz – Learn Java Programming (DSA Section)',
      description: 'Java-centric lessons on arrays, linked lists, stacks, queues, trees, graphs, and algorithms like sorting/searching',
      url: 'https://www.programiz.com/java-programming',
      type: 'tutorial',
      topics: ['Java', 'Data Structures', 'Algorithms'],
      image: 'https://programiz.com/favicon.ico'
    },
    {
      id: 'programiz-java-algorithms',
      title: 'Programiz – Java Algorithms',
      description: 'Tutorials on Java Collections Framework algorithms (sort, shuffle, binarySearch, reverse, etc.) with code examples',
      url: 'https://www.programiz.com/java-programming/algorithms',
      type: 'tutorial',
      topics: ['Java', 'Algorithms', 'Collections Framework'],
      image: 'https://programiz.com/favicon.ico'
    },
    {
      id: 'gfg-java-dsa',
      title: 'GeeksforGeeks – DSA Tutorial (Java Examples)',
      description: 'All major DSA topics illustrated with Java code snippets, covering complexities and interview-style problems',
      url: 'https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/',
      type: 'tutorial',
      topics: ['Java', 'Data Structures', 'Algorithms'],
      image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png'
    },
    {
      id: 'tutorialspoint-cpp-dsa',
      title: 'Tutorialspoint – Data Structures & Algorithms (C/C++)',
      description: 'Language-agnostic core tutorial with C++ examples for all DSA topics you can run in the integrated editor',
      url: 'https://www.tutorialspoint.com/data_structures_algorithms/index.htm',
      type: 'tutorial',
      topics: ['C++', 'Data Structures', 'Algorithms'],
      image: 'https://www.tutorialspoint.com/favicon.ico'
    },
    {
      id: 'gfg-cpp-dsa',
      title: 'GeeksforGeeks – DSA Tutorial (C++ Examples)',
      description: 'Chapter-wise guide with C++ implementations for arrays, trees, graphs, and dynamic programming',
      url: 'https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/',
      type: 'tutorial',
      topics: ['C++', 'Data Structures', 'Algorithms'],
      image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png'
    },
    {
      id: 'cp-algorithms-cpp',
      title: 'CP-Algorithms – C++ Implementations',
      description: 'Extensive C++ code samples for hundreds of algorithms, ideal for competitive programming study',
      url: 'https://cp-algorithms.com/index.html',
      type: 'tutorial',
      topics: ['C++', 'Competitive Programming', 'Algorithms'],
      image: 'https://cp-algorithms.com/favicon.ico'
    },
    {
      id: 'freecodecamp-js-dsa',
      title: 'freeCodeCamp – JavaScript Algorithms and Data Structures',
      description: 'Part of freeCodeCamp\'s self-paced curriculum, covering OOP, functional programming, and all core DSA in JS',
      url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
      type: 'tutorial',
      topics: ['JavaScript', 'Data Structures', 'Algorithms'],
      image: 'https://www.freecodecamp.org/favicon-32x32.png'
    },
    {
      id: 'w3schools-js-dsa',
      title: 'W3Schools – DSA Tutorial (JS Examples)',
      description: 'Interactive JS examples for stacks, queues, trees, and algorithms, with live code editor',
      url: 'https://www.w3schools.com/dsa/',
      type: 'tutorial',
      topics: ['JavaScript', 'Data Structures', 'Algorithms'],
      image: 'https://www.w3schools.com/favicon.ico'
    },
    {
      id: 'programiz-js-stack',
      title: 'Programiz – Stack Data Structure (JavaScript)',
      description: 'Shows JS-specific implementation of stacks along with other data structures and algorithms',
      url: 'https://www.programiz.com/dsa/stack',
      type: 'tutorial',
      topics: ['JavaScript', 'Stack', 'Data Structures'],
      image: 'https://programiz.com/favicon.ico'
    }
  ];

  // Combine resources
  return [
    ...commonResources,
    ...additionalTutorials,
    ...(languageResources[language] || []),
    ...videoResources
  ];
}
