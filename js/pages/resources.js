/**
 * Resources page component
 */

/**
 * Render the resources page
 * @param {HTMLElement} container - The container to render the resources page in
 */
function renderResourcesPage(container) {
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
  
  // Render resources
  renderResourcesList(getResources(), bookmarkedResources, completedResources);
  
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
      filterResources(getResources(), filter, bookmarkedResources, completedResources);
    });
  });
  
  // Add event listener for search
  const searchInput = document.getElementById('resource-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const activeFilter = document.querySelector('.resource-filter-btn.bg-primary-600').getAttribute('data-filter');
      
      filterResources(getResources(), activeFilter, bookmarkedResources, completedResources, searchTerm);
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
    resourceCard.className = `resource-card bg-gray-800 rounded-lg overflow-hidden ${isCompleted ? 'opacity-75' : ''}`;
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
 * Get all resources
 * @returns {Array} List of resources
 */
function getResources() {
  return [
    // Documentation resources
    {
      id: 'google-dev-dsa',
      title: 'Google Developers Tech Dev Guide',
      description: 'Google\'s official guide to data structures and algorithms',
      url: 'https://techdevguide.withgoogle.com/paths/data-structures-and-algorithms/',
      type: 'documentation',
      topics: ['Data Structures', 'Algorithms', 'Interview Preparation']
    },
    {
      id: 'mdn-web-docs',
      title: 'MDN Web Docs',
      description: 'Comprehensive documentation for web technologies',
      url: 'https://developer.mozilla.org/en-US/',
      type: 'documentation',
      topics: ['Web Development', 'JavaScript', 'HTML/CSS']
    },
    {
      id: 'javascript-info',
      title: 'JavaScript.info',
      description: 'Modern JavaScript tutorial with detailed explanations',
      url: 'https://javascript.info/',
      type: 'documentation',
      topics: ['JavaScript', 'Modern JS', 'ES6+']
    },
    {
      id: 'python-docs',
      title: 'Python Official Documentation',
      description: 'Comprehensive Python language and standard library documentation',
      url: 'https://docs.python.org/3/',
      type: 'documentation',
      topics: ['Python', 'Language Reference', 'Standard Library']
    },
    {
      id: 'oracle-java-docs',
      title: 'Oracle Java Documentation',
      description: 'Official Java language and API documentation',
      url: 'https://docs.oracle.com/en/java/',
      type: 'documentation',
      topics: ['Java', 'JDK', 'API Reference']
    },
    {
      id: 'cpp-reference',
      title: 'C++ Reference',
      description: 'Comprehensive reference for C++ language and standard library',
      url: 'https://en.cppreference.com/w/',
      type: 'documentation',
      topics: ['C++', 'STL', 'Language Reference']
    },
    {
      id: 'rust-docs',
      title: 'The Rust Programming Language',
      description: 'Official Rust language documentation and book',
      url: 'https://doc.rust-lang.org/book/',
      type: 'documentation',
      topics: ['Rust', 'Memory Safety', 'Systems Programming']
    },
    {
      id: 'go-docs',
      title: 'Go Documentation',
      description: 'Official Go language documentation and standard library reference',
      url: 'https://go.dev/doc/',
      type: 'documentation',
      topics: ['Go', 'Golang', 'Language Reference']
    },
    {
      id: 'roadmap-sh',
      title: 'roadmap.sh',
      description: 'Community-driven roadmaps, articles and resources for developers',
      url: 'https://roadmap.sh/',
      type: 'documentation',
      topics: ['Learning Paths', 'Career Development', 'Programming']
    },
    {
      id: 'clrs-book',
      title: 'Introduction to Algorithms (CLRS)',
      description: 'The canonical textbook on algorithms by Cormen, Leiserson, Rivest, and Stein',
      url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition',
      type: 'documentation',
      topics: ['Algorithms', 'Theoretical Computer Science', 'Academic']
    },
    
    // Tutorial resources
    {
      id: 'gfg-dsa',
      title: 'GeeksforGeeks DSA',
      description: 'Comprehensive DSA tutorials and practice problems',
      url: 'https://www.geeksforgeeks.org/data-structures/',
      type: 'tutorial',
      topics: ['Data Structures', 'Algorithms', 'Problem Solving']
    },
    {
      id: 'striver-a2z-dsa',
      title: 'Striver\'s A2Z DSA Course',
      description: 'Complete DSA course from basic to advanced topics',
      url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
      type: 'tutorial',
      topics: ['Complete DSA', 'Structured Learning', 'All Levels']
    },
    {
      id: 'visualgo',
      title: 'VisuAlgo',
      description: 'Visualizing data structures and algorithms through animation',
      url: 'https://visualgo.net/',
      type: 'tutorial',
      topics: ['Visualization', 'Data Structures', 'Algorithms']
    },
    {
      id: 'algo-visualizer',
      title: 'Algorithm Visualizer',
      description: 'Interactive online platform that visualizes algorithms from code',
      url: 'https://algorithm-visualizer.org/',
      type: 'tutorial',
      topics: ['Visualization', 'Algorithms', 'Interactive Learning']
    },
    
    // New tutorial resources
    {
      id: 'programiz-dsa',
      title: 'Programiz – Learn Data Structures and Algorithms',
      description: 'A step-by-step, text-based tutorial covering beginner to advanced DSA topics, complete with quizzes, examples, and practice problems',
      url: 'https://www.programiz.com/dsa',
      type: 'tutorial',
      topics: ['Data Structures', 'Algorithms', 'Beginner to Advanced']
    },
    {
      id: 'gfg-dsa-tutorial',
      title: 'GeeksforGeeks – DSA Tutorial',
      description: 'An up-to-date series organized by topic (logic building, complexity analysis, arrays, trees, graphs, hashing, DP) with code snippets in C++, Java, Python, and JavaScript',
      url: 'https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/',
      type: 'tutorial',
      topics: ['Data Structures', 'Algorithms', 'Multiple Languages']
    },
    {
      id: 'tutorialspoint-dsa',
      title: 'Tutorialspoint – Data Structures & Algorithms',
      description: 'Detailed, language-agnostic explanations paired with an online editor to try C, C++, Java, or Python implementations directly in your browser',
      url: 'https://www.tutorialspoint.com/data_structures_algorithms/index.htm',
      type: 'tutorial',
      topics: ['Data Structures', 'Algorithms', 'Online Editor']
    },
    {
      id: 'cp-algorithms',
      title: 'CP-Algorithms (e-maxx.ru English)',
      description: 'Authoritative reference for algorithms in competitive programming: theory, C++ code examples, and complexity analysis',
      url: 'https://cp-algorithms.com/index.html',
      type: 'tutorial',
      topics: ['Competitive Programming', 'Algorithms', 'C++']
    },
    {
      id: 'freecodecamp-dsa-guide',
      title: 'freeCodeCamp – Learn Data Structures and Algorithms',
      description: 'Article-based tutorial introducing core concepts, Big-O notation, and linking to interactive coding challenges',
      url: 'https://www.freecodecamp.org/news/learn-data-structures-and-algorithms/',
      type: 'tutorial',
      topics: ['Data Structures', 'Algorithms', 'Big-O Notation']
    },
    {
      id: 'w3schools-dsa',
      title: 'W3Schools – DSA Tutorial',
      description: 'Beginner-friendly walkthrough of arrays, stacks, queues, trees, graphs, and sorting/search algorithms, with live "Try it Yourself" code boxes',
      url: 'https://www.w3schools.com/dsa/',
      type: 'tutorial',
      topics: ['Data Structures', 'Algorithms', 'Interactive Learning']
    },
    {
      id: 'freecodecamp-python-dsa',
      title: 'freeCodeCamp – Learn Data Structures and Algorithms in Python',
      description: 'A full article covering Python implementations of arrays, linked lists, stacks, queues, trees, and sorting algorithms',
      url: 'https://www.freecodecamp.org/news/learn-data-structures-and-algorithms/',
      type: 'tutorial',
      topics: ['Python', 'Data Structures', 'Algorithms']
    },
    {
      id: 'analytics-vidhya-python-dsa',
      title: 'Analytics Vidhya – A Beginners\' Guide to Data Structures in Python',
      description: 'Illustrated tutorial on built-in vs. user-defined Python data structures, complete with code snippets and diagrams',
      url: 'https://www.analyticsvidhya.com/blog/2022/03/data-structures-in-python/',
      type: 'tutorial',
      topics: ['Python', 'Data Structures', 'Beginners']
    },
    {
      id: 'programiz-python-dsa',
      title: 'Programiz – Getting Started with DSA (Python)',
      description: 'Setup guide plus Python-focused DSA tutorials showing how to implement stacks, queues, linked lists, and more',
      url: 'https://www.programiz.com/dsa/getting-started',
      type: 'tutorial',
      topics: ['Python', 'Data Structures', 'Algorithms']
    },
    {
      id: 'programiz-java-dsa',
      title: 'Programiz – Learn Java Programming (DSA Section)',
      description: 'Java-centric lessons on arrays, linked lists, stacks, queues, trees, graphs, and algorithms like sorting/searching',
      url: 'https://www.programiz.com/java-programming',
      type: 'tutorial',
      topics: ['Java', 'Data Structures', 'Algorithms']
    },
    {
      id: 'programiz-java-algorithms',
      title: 'Programiz – Java Algorithms',
      description: 'Tutorials on Java Collections Framework algorithms (sort, shuffle, binarySearch, reverse, etc.) with code examples',
      url: 'https://www.programiz.com/java-programming/algorithms',
      type: 'tutorial',
      topics: ['Java', 'Algorithms', 'Collections Framework']
    },
    {
      id: 'gfg-java-dsa',
      title: 'GeeksforGeeks – DSA Tutorial (Java Examples)',
      description: 'All major DSA topics illustrated with Java code snippets, covering complexities and interview-style problems',
      url: 'https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/',
      type: 'tutorial',
      topics: ['Java', 'Data Structures', 'Algorithms']
    },
    {
      id: 'tutorialspoint-cpp-dsa',
      title: 'Tutorialspoint – Data Structures & Algorithms (C/C++)',
      description: 'Language-agnostic core tutorial with C++ examples for all DSA topics you can run in the integrated editor',
      url: 'https://www.tutorialspoint.com/data_structures_algorithms/index.htm',
      type: 'tutorial',
      topics: ['C++', 'Data Structures', 'Algorithms']
    },
    {
      id: 'gfg-cpp-dsa',
      title: 'GeeksforGeeks – DSA Tutorial (C++ Examples)',
      description: 'Chapter-wise guide with C++ implementations for arrays, trees, graphs, and dynamic programming',
      url: 'https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/',
      type: 'tutorial',
      topics: ['C++', 'Data Structures', 'Algorithms']
    },
    {
      id: 'cp-algorithms-cpp',
      title: 'CP-Algorithms – C++ Implementations',
      description: 'Extensive C++ code samples for hundreds of algorithms, ideal for competitive programming study',
      url: 'https://cp-algorithms.com/index.html',
      type: 'tutorial',
      topics: ['C++', 'Competitive Programming', 'Algorithms']
    },
    {
      id: 'freecodecamp-js-dsa',
      title: 'freeCodeCamp – JavaScript Algorithms and Data Structures',
      description: 'Part of freeCodeCamp\'s self-paced curriculum, covering OOP, functional programming, and all core DSA in JS',
      url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
      type: 'tutorial',
      topics: ['JavaScript', 'Data Structures', 'Algorithms']
    },
    {
      id: 'w3schools-js-dsa',
      title: 'W3Schools – DSA Tutorial (JS Examples)',
      description: 'Interactive JS examples for stacks, queues, trees, and algorithms, with live code editor',
      url: 'https://www.w3schools.com/dsa/',
      type: 'tutorial',
      topics: ['JavaScript', 'Data Structures', 'Algorithms']
    },
    {
      id: 'programiz-js-stack',
      title: 'Programiz – Stack Data Structure (JavaScript)',
      description: 'Shows JS-specific implementation of stacks along with other data structures and algorithms',
      url: 'https://www.programiz.com/dsa/stack',
      type: 'tutorial',
      topics: ['JavaScript', 'Stack', 'Data Structures']
    },
    
    // Practice resources
    {
      id: 'leetcode',
      title: 'LeetCode Problems',
      description: 'Practice coding problems with varying difficulty levels',
      url: 'https://leetcode.com/problemset/all/',
      type: 'practice',
      topics: ['Problem Solving', 'Interviews', 'Competitive Programming']
    },
    {
      id: 'neetcode',
      title: 'NeetCode 150',
      description: 'Curated list of 150 LeetCode questions for coding interviews',
      url: 'https://neetcode.io/',
      type: 'practice',
      topics: ['Interviews', 'Problem Patterns', 'Blind 75']
    },
    {
      id: 'striver-sde-sheet',
      title: 'Striver\'s SDE Sheet',
      description: 'A structured 30-day roadmap for SDE interview preparation',
      url: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/',
      type: 'practice',
      topics: ['Interview Preparation', 'Structured Learning', 'Problem Solving']
    },
    
    // Video resources
    {
      id: 'abdul-bari',
      title: 'Abdul Bari - Algorithms',
      description: 'Comprehensive algorithm course covering all major topics',
      url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O',
      type: 'video',
      topics: ['Algorithms', 'Theory', 'Analysis']
    },
    {
      id: 'cs-dojo',
      title: 'CS Dojo - Data Structures & Algorithms',
      description: 'Beginner-friendly DSA tutorials',
      url: 'https://www.youtube.com/playlist?list=PLBZBJbE_rGRV8D7XZ08LK6z-4zPoWzu5H',
      type: 'video',
      topics: ['Data Structures', 'Algorithms', 'Beginner']
    },
    {
      id: 'dsa-bootcamp-2025',
      title: 'Master Data Structures & Algorithms: DSA Bootcamp 2025',
      description: 'A full-series bootcamp covering asymptotic analysis, core data structures (arrays, linked lists, trees), graph algorithms, and common interview patterns—ideal for a structured, end-to-end curriculum',
      url: 'https://www.youtube.com/playlist?list=PLA3GkZPtsafYzRj2lk6OyquJtRXoDLR_S',
      type: 'video',
      topics: ['Data Structures', 'Algorithms', 'Interview Patterns', 'Bootcamp']
    },
    {
      id: 'mycodeschool-ds',
      title: 'myCodeSchool – Data Structures',
      description: 'Legendary C/C++ tutorials with illustrated explanations of stacks, queues, trees, hashing, and sorting—great for visual learners who want clear diagrams alongside code',
      url: 'https://www.youtube.com/user/mycodeschool/playlists',
      type: 'video',
      topics: ['C/C++', 'Data Structures', 'Visual Learning']
    },
    {
      id: 'freecodecamp-js-dsa-videos',
      title: 'freeCodeCamp.org – JavaScript Algorithms & Data Structures',
      description: 'A 113-video playlist that walks through all JS-based DSA topics, from basic array manipulations to advanced graph traversals, with runnable code in the browser',
      url: 'https://www.youtube.com/playlist?list=PLUvKRKFIL7gt3hvh5SZJ9TrlcIRaM_AfJ',
      type: 'video',
      topics: ['JavaScript', 'Data Structures', 'Algorithms', 'Interactive']
    },
    {
      id: 'dsa-beginners-course',
      title: 'Algorithms and Data Structures Tutorial – Full Course for Beginners',
      description: 'A concise, 4-hour crash course covering both theory and implementation in a language-agnostic style—perfect for beginners needing a quick yet thorough overview',
      url: 'https://www.youtube.com/watch?v=8hly31xKli0',
      type: 'video',
      topics: ['Beginners', 'Crash Course', 'Language-Agnostic']
    },
    {
      id: 'ultimate-dsa-2025',
      title: 'The Ultimate DSA Course for 2025',
      description: 'Hands-on Python build-from-scratch series focusing on problem-solving strategies, code optimization, and applied algorithm design with up-to-date examples',
      url: 'https://www.youtube.com/watch?v=DMeD8trbj6A',
      type: 'video',
      topics: ['Python', 'Problem-Solving', 'Code Optimization']
    },
    {
      id: 'ds-c-cpp-course',
      title: 'Data Structures – Full Course Using C and C++',
      description: 'myCodeSchool\'s flagship 4-hour walkthrough implementing key data structures in C/C++, complete with memory diagrams and step-by-step guidance',
      url: 'https://www.youtube.com/watch?v=B31LgI4Y4DQ',
      type: 'video',
      topics: ['C/C++', 'Data Structures', 'Memory Management']
    },
    {
      id: 'tushar-roy-channel',
      title: 'Tushar Roy – Coding Made Simple',
      description: 'A collection of smaller, topic-focused playlists (dynamic programming, binary trees, suffix/prefix algorithms) with thorough explanations and real-world coding challenges',
      url: 'https://www.youtube.com/channel/UCZLJf_R2sWyUtXSKiKlyvAw',
      type: 'video',
      topics: ['Dynamic Programming', 'Binary Trees', 'Algorithms']
    },
    {
      id: 'js-dsa-beau',
      title: 'Data Structures and Algorithms in JavaScript – Beau teaches JavaScript',
      description: 'A full-length beginner course showing JS implementations of arrays, linked lists, stacks, queues, trees, and sorting algorithms—ideal for front-end developers',
      url: 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbkso-IbgiiP48n-O-JQA9PJ',
      type: 'video',
      topics: ['JavaScript', 'Front-End', 'Data Structures']
    },
    {
      id: 'recursion-backtracking',
      title: 'Recursion and Backtracking – Tushar Roy',
      description: 'A dedicated 5-video series delving into recursion patterns, backtracking strategies, and classic problems like coin change and N-Queens',
      url: 'https://www.youtube.com/playlist?list=PLrmLmBdmIlpslxZUHHWmfOzNn6cA7jvyh',
      type: 'video',
      topics: ['Recursion', 'Backtracking', 'Problem Patterns']
    },
    {
      id: 'graph-algorithms',
      title: 'Graph Algorithms – Tushar Roy',
      description: 'Step-by-step tutorials on Dijkstra\'s, Bellman–Ford, Floyd–Warshall, and other graph algorithms, with whiteboard explanations and optimized code examples',
      url: 'https://www.youtube.com/playlist?list=PLrmLmBdmIlpu2f2g8ltqaaCZiq6GJvl1j',
      type: 'video',
      topics: ['Graph Algorithms', 'Pathfinding', 'Optimization']
    }
  ];
}
