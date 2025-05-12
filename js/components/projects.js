/**
 * Projects component for displaying project ideas
 */

/**
 * Render the projects page
 * @param {HTMLElement} container - The container to render the projects in
 */
function renderProjects(container) {
  // Get user profile for language preference
  const userProfile = Storage.get(Storage.KEYS.USER_PROFILE, { language: 'javascript' });
  const language = userProfile.language || 'javascript';
  
  // Get project progress
  const projectProgress = Storage.get(Storage.KEYS.PROJECT_PROGRESS, {});
  
  // Render projects container
  container.innerHTML = `
    <div class="max-w-4xl mx-auto fade-in">
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">DSA Project Ideas</h2>
        <p class="text-gray-600">Build these projects to strengthen your DSA skills with ${language.charAt(0).toUpperCase() + language.slice(1)}</p>
      </div>
      
      <div class="mb-6">
        <div class="flex flex-wrap gap-2 mb-4">
          <button class="project-filter-btn bg-indigo-600 text-white px-4 py-2 rounded-md text-sm" data-filter="all">
            All Projects
          </button>
          <button class="project-filter-btn bg-white text-gray-700 px-4 py-2 rounded-md text-sm shadow-sm" data-filter="beginner">
            Beginner
          </button>
          <button class="project-filter-btn bg-white text-gray-700 px-4 py-2 rounded-md text-sm shadow-sm" data-filter="intermediate">
            Intermediate
          </button>
          <button class="project-filter-btn bg-white text-gray-700 px-4 py-2 rounded-md text-sm shadow-sm" data-filter="advanced">
            Advanced
          </button>
        </div>
      </div>
      
      <div id="projects-container" class="space-y-4">
        <!-- Projects will be rendered here -->
      </div>
    </div>
  `;
  
  // Get projects based on language
  const projects = getProjectsByLanguage(language);
  
  // Render projects
  renderProjectsList(projects, projectProgress);
  
  // Add event listeners for filter buttons
  document.querySelectorAll('.project-filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      document.querySelectorAll('.project-filter-btn').forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'text-white');
        btn.classList.add('bg-white', 'text-gray-700');
      });
      button.classList.remove('bg-white', 'text-gray-700');
      button.classList.add('bg-indigo-600', 'text-white');
      
      // Filter projects
      const filter = button.getAttribute('data-filter');
      filterProjects(projects, filter, projectProgress);
    });
  });
}

/**
 * Render the projects list
 * @param {Array} projects - List of projects
 * @param {Object} projectProgress - Project progress data
 */
function renderProjectsList(projects, projectProgress) {
  const projectsContainer = document.getElementById('projects-container');
  if (!projectsContainer) return;
  
  // Clear container
  projectsContainer.innerHTML = '';
  
  if (projects.length === 0) {
    projectsContainer.innerHTML = `
      <div class="text-center py-12">
        <p class="text-gray-500">No projects found matching your criteria.</p>
      </div>
    `;
    return;
  }
  
  // Group projects by status
  const completedProjects = [];
  const inProgressProjects = [];
  const notStartedProjects = [];
  
  projects.forEach(project => {
    const progress = projectProgress[project.id] || { status: 'not_started', notes: '' };
    
    if (progress.status === 'completed') {
      completedProjects.push({ project, progress });
    } else if (progress.status === 'in_progress') {
      inProgressProjects.push({ project, progress });
    } else {
      notStartedProjects.push({ project, progress });
    }
  });
  
  // Create status sections
  if (completedProjects.length > 0) {
    const completedSection = document.createElement('div');
    completedSection.className = 'mb-8';
    completedSection.innerHTML = `
      <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-green-500">Completed Projects (${completedProjects.length})</span>
      </h3>
      <div class="completed-projects space-y-4"></div>
    `;
    projectsContainer.appendChild(completedSection);
    
    const completedProjectsContainer = completedSection.querySelector('.completed-projects');
    completedProjects.forEach(({ project, progress }) => {
      renderProjectCard(completedProjectsContainer, project, progress);
    });
  }
  
  if (inProgressProjects.length > 0) {
    const inProgressSection = document.createElement('div');
    inProgressSection.className = 'mb-8';
    inProgressSection.innerHTML = `
      <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-yellow-500">In Progress Projects (${inProgressProjects.length})</span>
      </h3>
      <div class="in-progress-projects space-y-4"></div>
    `;
    projectsContainer.appendChild(inProgressSection);
    
    const inProgressProjectsContainer = inProgressSection.querySelector('.in-progress-projects');
    inProgressProjects.forEach(({ project, progress }) => {
      renderProjectCard(inProgressProjectsContainer, project, progress);
    });
  }
  
  if (notStartedProjects.length > 0) {
    const notStartedSection = document.createElement('div');
    notStartedSection.className = 'mb-8';
    notStartedSection.innerHTML = `
      <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span class="text-gray-500">Not Started Projects (${notStartedProjects.length})</span>
      </h3>
      <div class="not-started-projects space-y-4"></div>
    `;
    projectsContainer.appendChild(notStartedSection);
    
    const notStartedProjectsContainer = notStartedSection.querySelector('.not-started-projects');
    notStartedProjects.forEach(({ project, progress }) => {
      renderProjectCard(notStartedProjectsContainer, project, progress);
    });
  }
  
  // Add event listeners for project status selects
  document.querySelectorAll('.project-status-select').forEach(select => {
    select.addEventListener('change', () => {
      const projectId = select.getAttribute('data-project-id');
      updateProjectStatus(projectId, select.value);
      
      // Refresh the project list to update the sections
      const activeFilter = document.querySelector('.project-filter-btn.bg-indigo-600').getAttribute('data-filter');
      filterProjects(projects, activeFilter, { ...projectProgress, [projectId]: { ...projectProgress[projectId], status: select.value } });
    });
  });
  
  // Add event listeners for project notes buttons
  document.querySelectorAll('.project-notes-btn').forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.getAttribute('data-project-id');
      const notesContainer = document.getElementById(`project-notes-container-${projectId}`);
      notesContainer.classList.toggle('hidden');
    });
  });
  
  // Add event listeners for save notes buttons
  document.querySelectorAll('.save-notes-btn').forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.getAttribute('data-project-id');
      const notes = document.getElementById(`project-notes-${projectId}`).value;
      updateProjectNotes(projectId, notes);
    });
  });
}

/**
 * Render a project card
 * @param {HTMLElement} container - Container to render the card in
 * @param {Object} project - Project data
 * @param {Object} progress - Project progress data
 */
function renderProjectCard(container, project, progress) {
  const projectCard = document.createElement('div');
  projectCard.className = 'bg-white rounded-lg shadow-md overflow-hidden';
  projectCard.setAttribute('data-project-id', project.id);
  projectCard.setAttribute('data-project-level', project.level);
  
  projectCard.innerHTML = `
    <div class="p-6">
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-xl font-semibold text-gray-800">${project.title}</h3>
        <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full 
          ${project.level === 'beginner' ? 'bg-green-100 text-green-800' : 
            project.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'}">
          ${project.level.charAt(0).toUpperCase() + project.level.slice(1)}
        </span>
      </div>
      
      <p class="text-gray-600 mb-4">${project.description}</p>
      
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-700 mb-2">Key Concepts:</h4>
        <div class="flex flex-wrap gap-1">
          ${project.concepts.map(concept => `
            <span class="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
              ${concept}
            </span>
          `).join('')}
        </div>
      </div>
      
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-700 mb-2">Implementation Steps:</h4>
        <ol class="list-decimal list-inside text-sm text-gray-600 space-y-1">
          ${project.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>
      
      ${project.githubRepo ? `
        <div class="mb-4">
          <h4 class="text-sm font-semibold text-gray-700 mb-2">Reference Implementation:</h4>
          <a href="${project.githubRepo}" target="_blank" rel="noopener" 
            class="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm">
            GitHub Repository
            <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      ` : ''}
      
      <div class="border-t border-gray-200 pt-4 mt-4">
        <div class="flex justify-between items-center">
          <div>
            <label for="project-status-${project.id}" class="block text-sm font-medium text-gray-700 mb-1">Project Status:</label>
            <select id="project-status-${project.id}" class="project-status-select text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" data-project-id="${project.id}">
              <option value="not_started" ${progress.status === 'not_started' ? 'selected' : ''}>
                Not Started
              </option>
              <option value="in_progress" ${progress.status === 'in_progress' ? 'selected' : ''}>
                In Progress
              </option>
              <option value="completed" ${progress.status === 'completed' ? 'selected' : ''}>
                Completed
              </option>
            </select>
          </div>
          
          <button class="project-notes-btn text-sm text-indigo-600 hover:text-indigo-800" data-project-id="${project.id}">
            ${progress.notes ? 'Edit Notes' : 'Add Notes'}
          </button>
        </div>
        
        <div id="project-notes-container-${project.id}" class="mt-3 ${progress.notes ? '' : 'hidden'}">
          <textarea id="project-notes-${project.id}" class="project-notes w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" rows="3" placeholder="Add your notes about this project...">${progress.notes || ''}</textarea>
          <div class="flex justify-end mt-2">
            <button class="save-notes-btn text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700" data-project-id="${project.id}">
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  container.appendChild(projectCard);
}

/**
 * Filter projects by level
 * @param {Array} projects - List of projects
 * @param {string} filter - Filter level
 * @param {Object} projectProgress - Project progress data
 */
function filterProjects(projects, filter, projectProgress) {
  let filteredProjects = projects;
  
  // Apply level filter
  if (filter !== 'all') {
    filteredProjects = projects.filter(project => project.level === filter);
  }
  
  // Render filtered projects
  renderProjectsList(filteredProjects, projectProgress);
}

/**
 * Update project status
 * @param {string} projectId - Project ID
 * @param {string} status - New status
 */
function updateProjectStatus(projectId, status) {
  // Get current project progress
  const projectProgress = Storage.get(Storage.KEYS.PROJECT_PROGRESS, {});
  
  // Update status
  projectProgress[projectId] = {
    ...(projectProgress[projectId] || { notes: '' }),
    status
  };
  
  // Save updated progress
  Storage.save(Storage.KEYS.PROJECT_PROGRESS, projectProgress);
}

/**
 * Update project notes
 * @param {string} projectId - Project ID
 * @param {string} notes - New notes
 */
function updateProjectNotes(projectId, notes) {
  // Get current project progress
  const projectProgress = Storage.get(Storage.KEYS.PROJECT_PROGRESS, {});
  
  // Update notes
  projectProgress[projectId] = {
    ...(projectProgress[projectId] || { status: 'not_started' }),
    notes
  };
  
  // Save updated progress
  Storage.save(Storage.KEYS.PROJECT_PROGRESS, projectProgress);
  
  // Update UI
  const notesBtn = document.querySelector(`.project-notes-btn[data-project-id="${projectId}"]`);
  if (notesBtn) {
    notesBtn.textContent = notes ? 'Edit Notes' : 'Add Notes';
  }
}

/**
 * Get projects by programming language
 * @param {string} language - Programming language
 * @returns {Array} List of projects
 */
function getProjectsByLanguage(language) {
  // Common projects for all languages
  const commonProjects = [
    {
      id: 'sorting-visualizer',
      title: 'Sorting Algorithm Visualizer',
      description: 'Create an interactive tool that visualizes various sorting algorithms in action.',
      level: 'intermediate',
      concepts: ['Sorting Algorithms', 'Animation', 'Time Complexity'],
      steps: [
        'Implement at least 5 different sorting algorithms',
        'Create visual representation of the array being sorted',
        'Add controls to adjust speed and array size',
        'Display time complexity information for each algorithm'
      ],
      githubRepo: 'https://github.com/clementmihailescu/Sorting-Visualizer'
    },
    {
      id: 'pathfinding-visualizer',
      title: 'Pathfinding Algorithm Visualizer',
      description: 'Build a grid-based visualization tool for pathfinding algorithms like Dijkstra and A*.',
      level: 'advanced',
      concepts: ['Graph Algorithms', 'Shortest Path', 'Heuristics'],
      steps: [
        'Create an interactive grid with start and end points',
        'Implement Dijkstra\'s algorithm for shortest path',
        'Add A* algorithm with different heuristics',
        'Visualize the algorithm\'s progress step by step'
      ],
      githubRepo: 'https://github.com/clementmihailescu/Pathfinding-Visualizer'
    },
    {
      id: 'custom-data-structure-library',
      title: 'Custom Data Structure Library',
      description: 'Implement a comprehensive library of data structures from scratch, including linked lists, stacks, queues, trees, heaps, and graphs.',
      level: 'intermediate',
      concepts: ['Data Structure Internals', 'Time Complexity', 'API Design'],
      steps: [
        'Implement basic data structures (linked lists, stacks, queues)',
        'Add tree-based structures (binary trees, BST, AVL trees)',
        'Implement graph representations and algorithms',
        'Create comprehensive documentation with time complexity analysis'
      ],
      githubRepo: 'https://github.com/trekhleb/javascript-algorithms'
    },
    {
      id: 'sudoku-solver',
      title: 'Sudoku Solver with Backtracking',
      description: 'Create a program that can solve Sudoku puzzles using backtracking algorithm, with visualization of the solving process.',
      level: 'intermediate',
      concepts: ['Backtracking', 'Constraint Satisfaction', 'Recursion'],
      steps: [
        'Implement the core Sudoku solving algorithm using backtracking',
        'Create a visual representation of the puzzle',
        'Add step-by-step visualization of the solving process',
        'Implement puzzle generation with varying difficulty levels'
      ],
      githubRepo: 'https://github.com/ImKennyYip/Sudoku-Solver'
    },
    {
      id: 'compression-tool',
      title: 'Data Compression Tool',
      description: 'Build a tool that can compress and decompress text files using Huffman coding or LZW compression algorithms.',
      level: 'advanced',
      concepts: ['Huffman Coding', 'LZW Compression', 'Binary File Handling'],
      steps: [
        'Implement frequency analysis for characters in text',
        'Create Huffman tree or LZW dictionary for compression',
        'Build encoding and decoding functionality',
        'Add a simple UI to compress/decompress files'
      ],
      githubRepo: 'https://github.com/nayuki/Reference-Huffman-coding'
    },
    {
      id: 'url-shortener',
      title: 'URL Shortener Service',
      description: 'Design and implement a URL shortening service similar to bit.ly or TinyURL with analytics capabilities.',
      level: 'intermediate',
      concepts: ['Hash Functions', 'Database Design', 'API Development'],
      steps: [
        'Create a hashing mechanism to generate short URLs',
        'Implement storage for URL mappings',
        'Build an API for URL creation and redirection',
        'Add analytics to track URL usage'
      ],
      githubRepo: 'https://github.com/thedevdojo/url-shortener'
    },
    {
      id: 'graph-theory-explorer',
      title: 'Graph Theory Explorer',
      description: 'Build an interactive application for creating, visualizing, and analyzing graphs with various algorithms.',
      level: 'advanced',
      concepts: ['Graph Theory', 'Network Analysis', 'Visualization'],
      steps: [
        'Create a UI for building and editing graphs',
        'Implement common graph algorithms (MST, shortest path, etc.)',
        'Add visualization for algorithm execution',
        'Include real-world applications like social network analysis'
      ],
      githubRepo: 'https://github.com/vasturiano/force-graph'
    },
    {
      id: 'memory-management-simulator',
      title: 'Memory Management Simulator',
      description: 'Create a visual simulator for different memory allocation strategies and garbage collection algorithms.',
      level: 'advanced',
      concepts: ['Memory Allocation', 'Fragmentation', 'Garbage Collection'],
      steps: [
        'Implement different allocation strategies (first-fit, best-fit, worst-fit)',
        'Visualize memory usage and fragmentation',
        'Add garbage collection algorithms',
        'Create scenarios to compare different strategies'
      ],
      githubRepo: 'https://github.com/topics/memory-management'
    },
    {
      id: 'genetic-algorithm-playground',
      title: 'Genetic Algorithm Playground',
      description: 'Build an interactive environment for solving optimization problems using genetic algorithms.',
      level: 'advanced',
      concepts: ['Genetic Algorithms', 'Optimization', 'Evolution Simulation'],
      steps: [
        'Implement core genetic algorithm components (selection, crossover, mutation)',
        'Create visualizations of the evolution process',
        'Apply to classic problems like traveling salesman',
        'Allow users to customize parameters and fitness functions'
      ],
      githubRepo: 'https://github.com/Chrispresso/GeneticAlgorithm'
    },
    {
      id: 'simple-search-engine',
      title: 'Simple Search Engine',
      description: 'Build a text indexing and search system using tries or inverted indices.',
      level: 'intermediate',
      concepts: ['Information Retrieval', 'Indexing', 'Ranking Algorithms'],
      steps: [
        'Create a document parser and tokenizer',
        'Implement an inverted index or trie structure',
        'Add basic ranking and relevance scoring',
        'Build a simple search interface'
      ],
      githubRepo: 'https://github.com/topics/search-engine'
    },
    {
      id: 'distributed-key-value-store',
      title: 'Distributed Key-Value Store',
      description: 'Build a simple distributed database using consistent hashing with basic CRUD operations and replication.',
      level: 'advanced',
      concepts: ['Distributed Systems', 'Consistent Hashing', 'Replication'],
      steps: [
        'Implement a consistent hashing mechanism',
        'Create a basic key-value store with CRUD operations',
        'Add data replication across multiple nodes',
        'Implement fault tolerance and partition handling'
      ],
      githubRepo: 'https://github.com/topics/distributed-database'
    },
    {
      id: 'real-time-collaborative-editor',
      title: 'Real-time Collaborative Editor',
      description: 'Create a web-based text editor that allows multiple users to edit the same document simultaneously.',
      level: 'advanced',
      concepts: ['Operational Transformation', 'CRDTs', 'Conflict Resolution'],
      steps: [
        'Implement a basic text editor with cursor management',
        'Add operational transformation or CRDT algorithms',
        'Create a server for synchronizing changes',
        'Implement conflict resolution and consistency'
      ],
      githubRepo: 'https://github.com/yjs/yjs'
    },
    {
      id: 'recommendation-system',
      title: 'Recommendation System',
      description: 'Build a content-based or collaborative filtering recommendation system for movies, books, or products.',
      level: 'advanced',
      concepts: ['Collaborative Filtering', 'Content-Based Filtering', 'Similarity Metrics'],
      steps: [
        'Implement user-item interaction matrix',
        'Create similarity metrics for users and items',
        'Build recommendation algorithms',
        'Evaluate recommendation quality with metrics'
      ],
      githubRepo: 'https://github.com/microsoft/recommenders'
    },
    {
      id: 'load-balancer',
      title: 'Load Balancer Implementation',
      description: 'Create a simple load balancer that distributes incoming requests across multiple backend servers.',
      level: 'intermediate',
      concepts: ['Load Balancing Algorithms', 'Proxy Design', 'Health Checks'],
      steps: [
        'Implement different load balancing strategies (round-robin, least connections)',
        'Create a proxy server to distribute requests',
        'Add health checks for backend servers',
        'Implement automatic failover mechanisms'
      ],
      githubRepo: 'https://github.com/topics/load-balancer'
    },
    {
      id: 'rate-limiter',
      title: 'Rate Limiter Implementation',
      description: 'Build different rate limiting algorithms that can be applied to any API to control request rates.',
      level: 'intermediate',
      concepts: ['Token Bucket', 'Leaky Bucket', 'Sliding Window'],
      steps: [
        'Implement token bucket algorithm',
        'Add leaky bucket and fixed window algorithms',
        'Create middleware for API rate limiting',
        'Visualize rate limiting in action'
      ],
      githubRepo: 'https://github.com/topics/rate-limiter'
    },
    {
      id: 'distributed-web-crawler',
      title: 'Distributed Web Crawler',
      description: 'Design a multi-threaded or distributed web crawler that respects robots.txt and creates a simple search index.',
      level: 'advanced',
      concepts: ['Web Crawling', 'Distributed Systems', 'Indexing'],
      steps: [
        'Implement a basic web crawler with URL frontier',
        'Add support for robots.txt and politeness policies',
        'Create a distributed architecture for parallel crawling',
        'Build a simple search index from crawled content'
      ],
      githubRepo: 'https://github.com/topics/web-crawler'
    }
  ];
  
  // Language-specific projects
  const languageProjects = {
    java: [
      {
        id: 'java-data-structures',
        title: 'Custom Data Structures Library',
        description: 'Build your own implementation of common data structures in Java.',
        level: 'intermediate',
        concepts: ['Object-Oriented Design', 'Data Structures', 'Generic Types'],
        steps: [
          'Implement LinkedList, Stack, Queue, and Binary Tree',
          'Add comprehensive unit tests for each structure',
          'Create documentation with usage examples',
          'Optimize for performance where possible'
        ],
        githubRepo: null
      }
    ],
    python: [
      {
        id: 'python-algorithm-notebook',
        title: 'Interactive Algorithm Notebook',
        description: 'Create a Jupyter notebook with interactive visualizations of algorithms.',
        level: 'intermediate',
        concepts: ['Jupyter Notebooks', 'Matplotlib', 'Algorithm Analysis'],
        steps: [
          'Set up Jupyter environment with necessary libraries',
          'Implement and visualize sorting algorithms',
          'Create interactive graph algorithm demonstrations',
          'Add performance comparison between different approaches'
        ],
        githubRepo: null
      }
    ],
    javascript: [
      {
        id: 'js-data-structures',
        title: 'JavaScript Data Structures Library',
        description: 'Build a comprehensive library of data structures in JavaScript.',
        level: 'intermediate',
        concepts: ['ES6 Classes', 'Data Structures', 'Unit Testing'],
        steps: [
          'Implement common data structures (LinkedList, Stack, Queue, etc.)',
          'Write unit tests using Jest or Mocha',
          'Create documentation with usage examples',
          'Publish as an npm package'
        ],
        githubRepo: 'https://github.com/trekhleb/javascript-algorithms'
      }
    ],
    cpp: [
      {
        id: 'cpp-algorithm-library',
        title: 'C++ Algorithm Library',
        description: 'Create a library of common algorithms implemented in C++.',
        level: 'advanced',
        concepts: ['Templates', 'STL', 'Algorithm Design'],
        steps: [
          'Implement sorting, searching, and graph algorithms',
          'Use C++ templates for generic implementations',
          'Create comprehensive documentation',
          'Add performance benchmarks'
        ],
        githubRepo: null
      }
    ],
    csharp: [
      {
        id: 'csharp-data-structures',
        title: 'C# Data Structures Library',
        description: 'Build a library of data structures in C#.',
        level: 'intermediate',
        concepts: ['.NET Classes', 'Generics', 'LINQ'],
        steps: [
          'Implement common data structures',
          'Use C# generics for type safety',
          'Write unit tests using NUnit or MSTest',
          'Create documentation with usage examples'
        ],
        githubRepo: null
      }
    ]
  };
  
  // Beginner projects for all languages
  const beginnerProjects = [
    {
      id: 'todo-list',
      title: 'Todo List Application',
      description: 'Build a simple todo list application to practice basic data operations.',
      level: 'beginner',
      concepts: ['CRUD Operations', 'Arrays/Lists', 'UI Interaction'],
      steps: [
        'Create data structure to store todo items',
        'Implement add, edit, delete, and mark complete functionality',
        'Add filtering and sorting options',
        'Implement local storage for persistence'
      ],
      githubRepo: null
    },
    {
      id: 'calculator',
      title: 'Calculator with Expression Evaluation',
      description: 'Create a calculator that can evaluate mathematical expressions using stacks.',
      level: 'beginner',
      concepts: ['Stack', 'Expression Parsing', 'Operator Precedence'],
      steps: [
        'Implement basic arithmetic operations',
        'Add support for parentheses and operator precedence',
        'Create a user interface for input and display',
        'Handle error cases and edge conditions'
      ],
      githubRepo: null
    },
    {
      id: 'tic-tac-toe',
      title: 'Tic-Tac-Toe Game',
      description: 'Implement a simple Tic-Tac-Toe game with a basic AI opponent.',
      level: 'beginner',
      concepts: ['2D Arrays', 'Game Logic', 'Minimax Algorithm'],
      steps: [
        'Create the game board representation',
        'Implement game state checking (win, draw)',
        'Add a simple AI using minimax algorithm',
        'Build a user interface for the game'
      ],
      githubRepo: null
    },
    {
      id: 'contact-manager',
      title: 'Contact Manager',
      description: 'Build a simple contact management application with search functionality.',
      level: 'beginner',
      concepts: ['Data Storage', 'Searching', 'Sorting'],
      steps: [
        'Create a data structure to store contacts',
        'Implement add, edit, delete functionality',
        'Add search and filter capabilities',
        'Implement sorting by different fields'
      ],
      githubRepo: null
    },
    {
      id: 'text-analyzer',
      title: 'Text Analyzer',
      description: 'Create a tool that analyzes text for word frequency, readability, and other metrics.',
      level: 'beginner',
      concepts: ['String Manipulation', 'Frequency Counting', 'Hash Maps'],
      steps: [
        'Parse and tokenize input text',
        'Count word and character frequencies',
        'Calculate readability metrics',
        'Generate visual reports of the analysis'
      ],
      githubRepo: null
    }
  ];
  
  // Combine projects
  return [
    ...commonProjects,
    ...beginnerProjects,
    ...(languageProjects[language] || [])
  ];
}
