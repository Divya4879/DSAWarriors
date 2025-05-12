/**
 * Blogs component for displaying curated blog posts
 */

/**
 * Render the blogs page
 * @param {HTMLElement} container - The container to render the blogs in
 */
function renderBlogs(container) {
  // Get user profile for language preference
  const userProfile = Storage.get(Storage.KEYS.USER_PROFILE, { language: 'javascript' });
  const language = userProfile.language || 'javascript';
  
  // Get bookmarked blogs
  const bookmarkedBlogs = Storage.get(Storage.KEYS.BOOKMARKED_BLOGS, []);
  
  // Render blogs container
  container.innerHTML = `
    <div class="max-w-4xl mx-auto fade-in">
      <div class="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-2xl font-bold text-white mb-2">Curated Blog Posts</h2>
        <p class="text-gray-300">High-quality articles and tutorials from the best tech blogs</p>
      </div>
      
      <div class="mb-6">
        <div class="flex flex-wrap gap-2 mb-4">
          <button class="blog-filter-btn bg-primary-600 text-white px-4 py-2 rounded-md text-sm" data-filter="all">
            All Blogs
          </button>
          <button class="blog-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="algorithms">
            Algorithms
          </button>
          <button class="blog-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="data-structures">
            Data Structures
          </button>
          <button class="blog-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="system-design">
            System Design
          </button>
          <button class="blog-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="interview">
            Interview Prep
          </button>
          <button class="blog-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="bookmarked">
            Bookmarked
          </button>
        </div>
        
        <div class="relative">
          <input type="text" id="blog-search" placeholder="Search blogs..." 
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-white">
          <svg class="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div id="blogs-container" class="space-y-6">
        <!-- Blogs will be rendered here -->
      </div>
    </div>
  `;
  
  // Get blogs
  const blogs = getAllBlogs();
  
  // Render blogs
  renderBlogsList(blogs, bookmarkedBlogs);
  
  // Add event listeners for filter buttons
  document.querySelectorAll('.blog-filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      document.querySelectorAll('.blog-filter-btn').forEach(btn => {
        btn.classList.remove('bg-primary-600');
        btn.classList.add('bg-gray-700');
      });
      button.classList.remove('bg-gray-700');
      button.classList.add('bg-primary-600');
      
      // Filter blogs
      const filter = button.getAttribute('data-filter');
      filterBlogs(blogs, filter, bookmarkedBlogs);
    });
  });
  
  // Add event listener for search
  const searchInput = document.getElementById('blog-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const activeFilter = document.querySelector('.blog-filter-btn.bg-primary-600').getAttribute('data-filter');
      
      filterBlogs(blogs, activeFilter, bookmarkedBlogs, searchTerm);
    });
  }
}

/**
 * Render the blogs list
 * @param {Array} blogs - List of blogs
 * @param {Array} bookmarkedBlogs - List of bookmarked blog IDs
 * @param {string} searchTerm - Optional search term
 */
function renderBlogsList(blogs, bookmarkedBlogs, searchTerm = '') {
  const blogsContainer = document.getElementById('blogs-container');
  if (!blogsContainer) return;
  
  // Filter blogs by search term if provided
  let filteredBlogs = blogs;
  if (searchTerm) {
    filteredBlogs = blogs.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm) || 
      blog.description.toLowerCase().includes(searchTerm) ||
      blog.author.toLowerCase().includes(searchTerm) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  // Clear container
  blogsContainer.innerHTML = '';
  
  if (filteredBlogs.length === 0) {
    blogsContainer.innerHTML = `
      <div class="text-center py-12">
        <p class="text-gray-400">No blogs found matching your criteria.</p>
      </div>
    `;
    return;
  }
  
  // Render each blog
  filteredBlogs.forEach(blog => {
    const isBookmarked = bookmarkedBlogs.includes(blog.id);
    
    const blogCard = document.createElement('div');
    blogCard.className = 'elegant-card p-6 slide-up';
    blogCard.setAttribute('data-blog-id', blog.id);
    blogCard.setAttribute('data-blog-category', blog.category);
    
    blogCard.innerHTML = `
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-xl font-semibold text-white">${blog.title}</h3>
        <button class="bookmark-blog-btn text-gray-400 hover:text-yellow-500 focus:outline-none transition" data-blog-id="${blog.id}">
          <svg class="w-5 h-5 ${isBookmarked ? 'text-yellow-500 fill-current' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
      
      <div class="flex items-center text-sm text-gray-400 mb-3">
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          ${blog.author}
        </span>
        <span class="mx-2">•</span>
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          ${blog.date}
        </span>
        <span class="mx-2">•</span>
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          ${blog.readTime} min read
        </span>
      </div>
      
      <p class="text-gray-300 mb-4">${blog.description}</p>
      
      <div class="flex flex-wrap gap-1 mb-4">
        ${blog.tags.map(tag => `
          <span class="tag tag-primary">
            ${tag}
          </span>
        `).join('')}
      </div>
      
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <img src="${blog.sourceLogo}" alt="${blog.source}" class="w-5 h-5 mr-2 rounded-full">
          <span class="text-sm text-gray-400">${blog.source}</span>
        </div>
        
        <a href="${blog.url}" target="_blank" rel="noopener" 
          class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
          Read Article
          <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    `;
    
    blogsContainer.appendChild(blogCard);
  });
  
  // Add event listeners for bookmark buttons
  document.querySelectorAll('.bookmark-blog-btn').forEach(button => {
    button.addEventListener('click', () => {
      const blogId = button.getAttribute('data-blog-id');
      toggleBlogBookmark(blogId);
    });
  });
}

/**
 * Filter blogs by category
 * @param {Array} blogs - List of blogs
 * @param {string} filter - Filter category
 * @param {Array} bookmarkedBlogs - List of bookmarked blog IDs
 * @param {string} searchTerm - Optional search term
 */
function filterBlogs(blogs, filter, bookmarkedBlogs, searchTerm = '') {
  let filteredBlogs = blogs;
  
  // Apply category filter
  if (filter !== 'all') {
    if (filter === 'bookmarked') {
      filteredBlogs = blogs.filter(blog => bookmarkedBlogs.includes(blog.id));
    } else {
      filteredBlogs = blogs.filter(blog => blog.category === filter);
    }
  }
  
  // Apply search filter if provided
  if (searchTerm) {
    filteredBlogs = filteredBlogs.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm) || 
      blog.description.toLowerCase().includes(searchTerm) ||
      blog.author.toLowerCase().includes(searchTerm) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  // Render filtered blogs
  renderBlogsList(filteredBlogs, bookmarkedBlogs);
}

/**
 * Toggle bookmark status for a blog
 * @param {string} blogId - Blog ID
 */
function toggleBlogBookmark(blogId) {
  // Get current bookmarks
  const bookmarkedBlogs = Storage.get(Storage.KEYS.BOOKMARKED_BLOGS, []);
  
  // Toggle bookmark
  const isBookmarked = bookmarkedBlogs.includes(blogId);
  let updatedBookmarks;
  
  if (isBookmarked) {
    updatedBookmarks = bookmarkedBlogs.filter(id => id !== blogId);
  } else {
    updatedBookmarks = [...bookmarkedBlogs, blogId];
  }
  
  // Save updated bookmarks
  Storage.save(Storage.KEYS.BOOKMARKED_BLOGS, updatedBookmarks);
  
  // Update UI
  const bookmarkBtn = document.querySelector(`.bookmark-blog-btn[data-blog-id="${blogId}"] svg`);
  if (bookmarkBtn) {
    if (isBookmarked) {
      bookmarkBtn.classList.remove('text-yellow-500', 'fill-current');
    } else {
      bookmarkBtn.classList.add('text-yellow-500', 'fill-current');
    }
  }
}

/**
 * Get all blog posts
 * @returns {Array} List of blog posts
 */
function getAllBlogs() {
  return [
    {
      id: 'blog-1',
      title: 'Learn Data Structures and Algorithms',
      author: 'freeCodeCamp',
      date: 'May 11, 2023',
      readTime: 15,
      description: 'A comprehensive walkthrough of core DSA concepts—from Big-O to trees and graphs—organized as an interactive tutorial with embedded code examples.',
      category: 'algorithms',
      tags: ['Algorithms', 'Data Structures', 'Tutorial', 'Big O'],
      url: 'https://www.freecodecamp.org/news/learn-data-structures-and-algorithms/',
      source: 'freeCodeCamp',
      sourceLogo: 'https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg'
    },
    {
      id: 'blog-2',
      title: 'Data Structures Handbook – The Key to Scalable Software',
      author: 'freeCodeCamp',
      date: 'Nov 15, 2023',
      readTime: 12,
      description: 'A concise handbook covering arrays, linked lists, stacks, queues, trees, and graphs, with performance trade-offs and real-world use cases.',
      category: 'data-structures',
      tags: ['Data Structures', 'Scalability', 'Software Engineering', 'Handbook'],
      url: 'https://www.freecodecamp.org/news/data-structures-the-key-to-scalable-software/',
      source: 'freeCodeCamp',
      sourceLogo: 'https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg'
    },
    {
      id: 'blog-3',
      title: 'Resources to master Data Structures and Algorithms',
      author: 'Anubhav Sinha',
      date: 'Jan 5, 2021',
      readTime: 10,
      description: 'A curated list of the author\'s favorite tutorials, courses, and reference sites—complete with personal notes on why each resource shines.',
      category: 'algorithms',
      tags: ['Resources', 'Learning', 'Tutorials', 'Courses'],
      url: 'https://anubhavsinha98.medium.com/resources-to-master-data-structures-and-algorithms-24450dc6d52b',
      source: 'Medium',
      sourceLogo: 'https://miro.medium.com/v2/resize:fill:64:64/1*sHhtYhaCe2Uc3IU0IgKwIQ.png'
    },
    {
      id: 'blog-4',
      title: 'Top 10 Data Structure and Algorithms Articles Programmers Should Read This Week',
      author: 'JavaRevisited',
      date: 'Mar 20, 2019',
      readTime: 8,
      description: 'A community-vetted roundup of must-read articles spanning Java, Python, C/C++, and JavaScript, ideal for drilling into specific DSA topics.',
      category: 'algorithms',
      tags: ['Articles', 'Programming Languages', 'Weekly Roundup'],
      url: 'https://medium.com/javarevisited/10-algorithms-articles-programmers-should-read-this-week-f55fcacd9469',
      source: 'Medium',
      sourceLogo: 'https://miro.medium.com/v2/resize:fill:64:64/1*sHhtYhaCe2Uc3IU0IgKwIQ.png'
    },
    {
      id: 'blog-5',
      title: 'Learn Data Structures and Algorithms (DSA)',
      author: 'Programiz Team',
      date: 'Jan 1, 2024',
      readTime: 20,
      description: 'Beginner-friendly lessons on each data structure and algorithm, with quizzes, practice problems, and multilingual code snippets.',
      category: 'data-structures',
      tags: ['Beginner', 'Tutorials', 'Practice Problems', 'Multiple Languages'],
      url: 'https://www.programiz.com/dsa',
      source: 'Programiz',
      sourceLogo: 'https://www.programiz.com/sites/all/themes/programiz/assets/favicon.png'
    },
    {
      id: 'blog-6',
      title: 'Data Structures & Algorithms (DSA) Tutorial',
      author: 'Tutorialspoint Team',
      date: 'Jan 1, 2024',
      readTime: 25,
      description: 'Detailed, language-agnostic write-up covering DSA fundamentals, with an integrated online compiler for hands-on practice.',
      category: 'data-structures',
      tags: ['Tutorial', 'Fundamentals', 'Online Compiler', 'Hands-on'],
      url: 'https://www.tutorialspoint.com/data_structures_algorithms/index.htm',
      source: 'TutorialsPoint',
      sourceLogo: 'https://www.tutorialspoint.com/favicon.ico'
    },
    {
      id: 'blog-7',
      title: 'Algorithms for Competitive Programming',
      author: 'CP-Algorithms Team',
      date: 'Jan 1, 2024',
      readTime: 30,
      description: 'The English translation of e-maxx.ru\'s authoritative algorithm encyclopedia—each article includes theory, code examples, and complexity analysis.',
      category: 'algorithms',
      tags: ['Competitive Programming', 'Encyclopedia', 'Code Examples', 'Complexity Analysis'],
      url: 'https://cp-algorithms.com/index.html',
      source: 'CP Algorithms',
      sourceLogo: 'https://cp-algorithms.com/favicon.ico'
    },
    {
      id: 'blog-8',
      title: '7 Steps to Improve Your Data Structure and Algorithm Skills',
      author: 'HackerEarth Team',
      date: 'Jan 1, 2024',
      readTime: 12,
      description: 'A practical, step-by-step guide—from mastering fundamentals to tackling complex problems—to systematically boost your DSA proficiency.',
      category: 'algorithms',
      tags: ['Skills Improvement', 'Step-by-Step', 'Fundamentals', 'Problem Solving'],
      url: 'https://www.hackerearth.com/blog/developers/7-steps-to-improve-your-data-structure-and-algorithm-skills/',
      source: 'HackerEarth',
      sourceLogo: 'https://static-fastly.hackerearth.com/static/hackerearth/images/badge/HE_badge.png'
    },
    {
      id: 'blog-9',
      title: 'A Beginners\' Guide to Data Structures in Python',
      author: 'Analytics Vidhya Team',
      date: 'Mar 15, 2022',
      readTime: 10,
      description: 'An introductory tutorial to both built-in and user-defined Python data structures, with code snippets and visual diagrams.',
      category: 'data-structures',
      tags: ['Python', 'Beginners', 'Code Snippets', 'Visual Diagrams'],
      url: 'https://www.analyticsvidhya.com/blog/2022/03/data-structures-in-python/',
      source: 'Analytics Vidhya',
      sourceLogo: 'https://www.analyticsvidhya.com/wp-content/themes/analytics-vidhya/images/logo.svg'
    },
    {
      id: 'blog-10',
      title: 'Intro to Stacks – Data Structure and Algorithm Tutorial',
      author: 'freeCodeCamp',
      date: 'Apr 5, 2022',
      readTime: 8,
      description: 'A focused deep-dive on the stack data structure: operations, memory layout, and typical interview questions, all explained with diagrams.',
      category: 'data-structures',
      tags: ['Stacks', 'Deep Dive', 'Interview Questions', 'Diagrams'],
      url: 'https://www.freecodecamp.org/news/intro-to-stacks-data-structure-and-algorithm-tutorial/',
      source: 'freeCodeCamp',
      sourceLogo: 'https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg'
    },
    {
      id: 'blog-11',
      title: 'DSA Tutorial – Learn Data Structures and Algorithms',
      author: 'GeeksforGeeks Team',
      date: 'Apr 27, 2024',
      readTime: 25,
      description: 'A structured roadmap covering logic building, complexity analysis, arrays, sorting, hashing, trees, graphs, and more—complete with code examples.',
      category: 'algorithms',
      tags: ['Roadmap', 'Complexity Analysis', 'Code Examples', 'Comprehensive'],
      url: 'https://www.geeksforgeeks.org/dsa-tutorial-learn-data-structures-and-algorithms/',
      source: 'GeeksforGeeks',
      sourceLogo: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png'
    },
    {
      id: 'blog-12',
      title: 'Visualising Data Structures and Algorithms through Animation',
      author: 'VisuAlgo Team',
      date: 'Jan 1, 2024',
      readTime: 15,
      description: 'Interactive, step-by-step animations of 30+ DSA topics—you can input your own data to see pointer movements, heap operations, graph traversals, and more.',
      category: 'data-structures',
      tags: ['Visualization', 'Animation', 'Interactive', 'Step-by-Step'],
      url: 'https://visualgo.net/',
      source: 'VisuAlgo',
      sourceLogo: 'https://visualgo.net/favicon.ico'
    },
    {
      id: 'blog-13',
      title: 'Algorithms | Computer Science Theory',
      author: 'Khan Academy Team',
      date: 'Jan 1, 2024',
      readTime: 20,
      description: 'Self-paced articles and visual demos on asymptotic analysis, sorting, searching, recursion, and graph algorithms—perfect for foundational learning.',
      category: 'algorithms',
      tags: ['Theory', 'Visual Demos', 'Self-Paced', 'Foundational'],
      url: 'https://www.khanacademy.org/computing/computer-science/algorithms',
      source: 'Khan Academy',
      sourceLogo: 'https://cdn.kastatic.org/images/favicon.ico?logo'
    }
  ];
}
