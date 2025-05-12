/**
 * Algorithms component for displaying algorithm explanations and complexity analysis
 */

/**
 * Render the algorithms page
 * @param {HTMLElement} container - The container to render the algorithms in
 */
function renderAlgorithms(container) {
  // Get user profile for language preference
  const userProfile = Storage.get(Storage.KEYS.USER_PROFILE, { language: 'javascript' });
  const language = userProfile.language || 'javascript';
  
  // Render algorithms container
  container.innerHTML = `
    <div class="max-w-4xl mx-auto fade-in">
      <div class="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-2xl font-bold text-white mb-2">Algorithm Reference</h2>
        <p class="text-gray-300">Comprehensive guide to common algorithms with time and space complexity analysis</p>
      </div>
      
      <!-- Visual Resources Section -->
      <div class="bg-gray-800/50 rounded-lg p-5 mb-6">
        <h3 class="text-lg font-semibold text-white mb-3">Visual Learning Resources</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="https://visualgo.net/" target="_blank" class="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
            <div class="bg-primary-700 rounded-full p-2 mr-3">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h4 class="text-white font-medium">VisuAlgo</h4>
              <p class="text-xs text-gray-300">Interactive visualizations for 30+ algorithms and data structures</p>
            </div>
          </a>
          <a href="https://ide.sk/algorithm-animations/" target="_blank" class="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
            <div class="bg-primary-700 rounded-full p-2 mr-3">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <h4 class="text-white font-medium">Algorithm Animations</h4>
              <p class="text-xs text-gray-300">Step-by-step animated tutorials for core CS algorithms</p>
            </div>
          </a>
          <a href="https://www.geeksforgeeks.org/data-structures/" target="_blank" class="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
            <div class="bg-primary-700 rounded-full p-2 mr-3">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h4 class="text-white font-medium">GeeksforGeeks</h4>
              <p class="text-xs text-gray-300">Comprehensive, example-driven articles on every major DSA topic</p>
            </div>
          </a>
          <a href="https://www.programiz.com/dsa" target="_blank" class="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
            <div class="bg-primary-700 rounded-full p-2 mr-3">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h4 class="text-white font-medium">Programiz</h4>
              <p class="text-xs text-gray-300">Beginner-friendly lessons with visual diagrams and code snippets</p>
            </div>
          </a>
        </div>
        <div class="mt-4">
          <a href="https://github.com/tayllan/awesome-algorithms" target="_blank" class="text-primary-400 hover:text-primary-300 text-sm flex items-center">
            <span>Explore more algorithm resources</span>
            <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
      
      <div class="mb-6">
        <div class="flex flex-wrap gap-2 mb-4">
          <button class="algorithm-filter-btn bg-primary-600 text-white px-4 py-2 rounded-md text-sm" data-filter="all">
            All Algorithms
          </button>
          <button class="algorithm-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="sorting">
            Sorting
          </button>
          <button class="algorithm-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="searching">
            Searching
          </button>
          <button class="algorithm-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="graph">
            Graph
          </button>
          <button class="algorithm-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="dynamic">
            Dynamic Programming
          </button>
          <button class="algorithm-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="string">
            String
          </button>
        </div>
        
        <div class="relative">
          <input type="text" id="algorithm-search" placeholder="Search algorithms..." 
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-white">
          <svg class="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div id="algorithms-container" class="space-y-6">
        <!-- Algorithms will be rendered here -->
      </div>
    </div>
  `;
  
  // Get algorithms
  const algorithms = getAllAlgorithms(language);
  
  // Render algorithms
  renderAlgorithmsList(algorithms);
  
  // Add event listeners for filter buttons
  document.querySelectorAll('.algorithm-filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      document.querySelectorAll('.algorithm-filter-btn').forEach(btn => {
        btn.classList.remove('bg-primary-600');
        btn.classList.add('bg-gray-700');
      });
      button.classList.remove('bg-gray-700');
      button.classList.add('bg-primary-600');
      
      // Filter algorithms
      const filter = button.getAttribute('data-filter');
      filterAlgorithms(algorithms, filter);
    });
  });
  
  // Add event listener for search
  const searchInput = document.getElementById('algorithm-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const activeFilter = document.querySelector('.algorithm-filter-btn.bg-primary-600').getAttribute('data-filter');
      
      filterAlgorithms(algorithms, activeFilter, searchTerm);
    });
  }
}

/**
 * Render the algorithms list
 * @param {Array} algorithms - List of algorithms
 * @param {string} searchTerm - Optional search term
 */
function renderAlgorithmsList(algorithms, searchTerm = '') {
  const algorithmsContainer = document.getElementById('algorithms-container');
  if (!algorithmsContainer) return;
  
  // Filter algorithms by search term if provided
  let filteredAlgorithms = algorithms;
  if (searchTerm) {
    filteredAlgorithms = algorithms.filter(algorithm => 
      algorithm.name.toLowerCase().includes(searchTerm) || 
      algorithm.description.toLowerCase().includes(searchTerm) ||
      algorithm.category.toLowerCase().includes(searchTerm)
    );
  }
  
  // Clear container
  algorithmsContainer.innerHTML = '';
  
  if (filteredAlgorithms.length === 0) {
    algorithmsContainer.innerHTML = `
      <div class="text-center py-12">
        <p class="text-gray-400">No algorithms found matching your criteria.</p>
      </div>
    `;
    return;
  }
  
  // Render each algorithm
  filteredAlgorithms.forEach(algorithm => {
    const algorithmCard = document.createElement('div');
    algorithmCard.className = 'elegant-card p-6 slide-up';
    algorithmCard.setAttribute('data-algorithm-id', algorithm.id);
    algorithmCard.setAttribute('data-algorithm-category', algorithm.category);
    
    algorithmCard.innerHTML = `
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-xl font-semibold text-white">${algorithm.name}</h3>
        <span class="tag tag-primary">
          ${algorithm.category.charAt(0).toUpperCase() + algorithm.category.slice(1)}
        </span>
      </div>
      
      <p class="text-gray-300 mb-4">${algorithm.description}</p>
      
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-300 mb-2">Time & Space Complexity</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-700 p-3 rounded-md">
            <h5 class="text-xs font-medium text-gray-400 mb-1">Time Complexity</h5>
            <div class="space-y-1">
              <div class="flex justify-between">
                <span class="text-xs text-gray-300">Best:</span>
                <span class="text-xs font-mono text-green-400">${algorithm.timeComplexity.best}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-gray-300">Average:</span>
                <span class="text-xs font-mono text-yellow-400">${algorithm.timeComplexity.average}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-xs text-gray-300">Worst:</span>
                <span class="text-xs font-mono text-red-400">${algorithm.timeComplexity.worst}</span>
              </div>
            </div>
          </div>
          <div class="bg-gray-700 p-3 rounded-md">
            <h5 class="text-xs font-medium text-gray-400 mb-1">Space Complexity</h5>
            <div class="flex justify-between">
              <span class="text-xs text-gray-300">Auxiliary:</span>
              <span class="text-xs font-mono text-blue-400">${algorithm.spaceComplexity}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-300 mb-2">Implementation</h4>
        <div class="code-block text-xs">
          <pre><code>${algorithm.implementation}</code></pre>
        </div>
      </div>
      
      <div class="flex justify-between items-center mt-4">
        <div class="flex items-center">
          <span class="text-xs text-gray-400">Key characteristics:</span>
          <span class="ml-2 text-xs text-primary-400">${algorithm.characteristics.join(', ')}</span>
        </div>
        
        <a href="${algorithm.learnMoreUrl}" target="_blank" rel="noopener" 
          class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
          Learn More
          <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    `;
    
    algorithmsContainer.appendChild(algorithmCard);
  });
}

/**
 * Filter algorithms by category
 * @param {Array} algorithms - List of algorithms
 * @param {string} filter - Filter category
 * @param {string} searchTerm - Optional search term
 */
function filterAlgorithms(algorithms, filter, searchTerm = '') {
  let filteredAlgorithms = algorithms;
  
  // Apply category filter
  if (filter !== 'all') {
    filteredAlgorithms = algorithms.filter(algorithm => algorithm.category === filter);
  }
  
  // Apply search filter if provided
  if (searchTerm) {
    filteredAlgorithms = filteredAlgorithms.filter(algorithm => 
      algorithm.name.toLowerCase().includes(searchTerm) || 
      algorithm.description.toLowerCase().includes(searchTerm) ||
      algorithm.category.toLowerCase().includes(searchTerm)
    );
  }
  
  // Render filtered algorithms
  renderAlgorithmsList(filteredAlgorithms);
}

/**
 * Get all algorithms with implementations in the specified language
 * @param {string} language - Programming language
 * @returns {Array} List of algorithms
 */
function getAllAlgorithms(language) {
  // Base algorithm data
  const algorithms = [
    // Sorting Algorithms
    {
      id: 'quicksort',
      name: 'Quick Sort',
      category: 'sorting',
      description: 'A divide-and-conquer sorting algorithm that works by selecting a pivot element and partitioning the array around the pivot.',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)'
      },
      spaceComplexity: 'O(log n)',
      characteristics: ['Divide and Conquer', 'In-place', 'Unstable'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/quick-sort/'
    },
    {
      id: 'mergesort',
      name: 'Merge Sort',
      category: 'sorting',
      description: 'A divide-and-conquer sorting algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)'
      },
      spaceComplexity: 'O(n)',
      characteristics: ['Divide and Conquer', 'Stable', 'Not in-place'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/merge-sort/'
    },
    {
      id: 'heapsort',
      name: 'Heap Sort',
      category: 'sorting',
      description: 'A comparison-based sorting algorithm that uses a binary heap data structure. It divides the input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element.',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)'
      },
      spaceComplexity: 'O(1)',
      characteristics: ['In-place', 'Unstable', 'Selection Sort Variant'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/heap-sort/'
    },
    {
      id: 'timsort',
      name: 'Tim Sort',
      category: 'sorting',
      description: 'A hybrid sorting algorithm derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data. It's the default sorting algorithm in Python, Java, and many other languages.',
      timeComplexity: {
        best: 'O(n)',
        average: 'O(n log n)',
        worst: 'O(n log n)'
      },
      spaceComplexity: 'O(n)',
      characteristics: ['Hybrid', 'Stable', 'Adaptive'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/timsort/'
    },
    
    // Searching Algorithms
    {
      id: 'binarysearch',
      name: 'Binary Search',
      category: 'searching',
      description: 'A search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
      timeComplexity: {
        best: 'O(1)',
        average: 'O(log n)',
        worst: 'O(log n)'
      },
      spaceComplexity: 'O(1)',
      characteristics: ['Divide and Conquer', 'Requires sorted input', 'Efficient'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/binary-search/'
    },
    {
      id: 'linearsearch',
      name: 'Linear Search',
      category: 'searching',
      description: 'A simple search algorithm that checks each element of the list until the desired element is found or the list ends.',
      timeComplexity: {
        best: 'O(1)',
        average: 'O(n)',
        worst: 'O(n)'
      },
      spaceComplexity: 'O(1)',
      characteristics: ['Simple', 'Works on unsorted data', 'Sequential'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/linear-search/'
    },
    {
      id: 'jumpsearch',
      name: 'Jump Search',
      category: 'searching',
      description: 'A search algorithm for sorted arrays that works by jumping ahead by fixed steps and then performing a linear search.',
      timeComplexity: {
        best: 'O(1)',
        average: 'O(√n)',
        worst: 'O(√n)'
      },
      spaceComplexity: 'O(1)',
      characteristics: ['Requires sorted input', 'Block-based', 'Better than linear search'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/jump-search/'
    },
    
    // Graph Algorithms
    {
      id: 'dijkstra',
      name: 'Dijkstra\'s Algorithm',
      category: 'graph',
      description: 'An algorithm for finding the shortest paths between nodes in a weighted graph, which may represent, for example, road networks.',
      timeComplexity: {
        best: 'O(E + V log V)',
        average: 'O(E + V log V)',
        worst: 'O(E + V log V)'
      },
      spaceComplexity: 'O(V)',
      characteristics: ['Greedy', 'Shortest Path', 'Weighted Graphs'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/'
    },
    {
      id: 'dfs',
      name: 'Depth-First Search',
      category: 'graph',
      description: 'An algorithm for traversing or searching tree or graph data structures that explores as far as possible along each branch before backtracking.',
      timeComplexity: {
        best: 'O(V + E)',
        average: 'O(V + E)',
        worst: 'O(V + E)'
      },
      spaceComplexity: 'O(V)',
      characteristics: ['Graph Traversal', 'Recursive', 'Stack-based'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/'
    },
    {
      id: 'bfs',
      name: 'Breadth-First Search',
      category: 'graph',
      description: 'An algorithm for traversing or searching tree or graph data structures that explores all the vertices at the present depth before moving on to vertices at the next depth level.',
      timeComplexity: {
        best: 'O(V + E)',
        average: 'O(V + E)',
        worst: 'O(V + E)'
      },
      spaceComplexity: 'O(V)',
      characteristics: ['Graph Traversal', 'Queue-based', 'Shortest Path in Unweighted Graphs'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/'
    },
    {
      id: 'astar',
      name: 'A* Search Algorithm',
      category: 'graph',
      description: 'A graph traversal and path search algorithm that is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency.',
      timeComplexity: {
        best: 'O(E)',
        average: 'O(E)',
        worst: 'O(b^d)'
      },
      spaceComplexity: 'O(V)',
      characteristics: ['Heuristic', 'Informed Search', 'Pathfinding'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/a-search-algorithm/'
    },
    {
      id: 'bellmanford',
      name: 'Bellman-Ford Algorithm',
      category: 'graph',
      description: 'An algorithm that computes shortest paths from a single source vertex to all other vertices in a weighted digraph, and can handle graphs with negative weight edges.',
      timeComplexity: {
        best: 'O(V*E)',
        average: 'O(V*E)',
        worst: 'O(V*E)'
      },
      spaceComplexity: 'O(V)',
      characteristics: ['Dynamic Programming', 'Handles Negative Weights', 'Detects Negative Cycles'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/'
    },
    {
      id: 'kruskal',
      name: 'Kruskal\'s Algorithm',
      category: 'graph',
      description: 'A minimum spanning tree algorithm that finds an edge of the least possible weight that connects any two trees in the forest.',
      timeComplexity: {
        best: 'O(E log E)',
        average: 'O(E log E)',
        worst: 'O(E log E)'
      },
      spaceComplexity: 'O(E + V)',
      characteristics: ['Greedy', 'Minimum Spanning Tree', 'Union-Find'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/'
    },
    
    // Dynamic Programming Algorithms
    {
      id: 'knapsack',
      name: '0/1 Knapsack Problem',
      category: 'dynamic',
      description: 'A problem in combinatorial optimization where given a set of items, each with a weight and a value, determine which items to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.',
      timeComplexity: {
        best: 'O(nW)',
        average: 'O(nW)',
        worst: 'O(nW)'
      },
      spaceComplexity: 'O(nW)',
      characteristics: ['Dynamic Programming', 'Optimization', 'NP-Complete'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/'
    },
    {
      id: 'lcs',
      name: 'Longest Common Subsequence',
      category: 'dynamic',
      description: 'A problem of finding the longest subsequence common to all sequences in a set of sequences. It\'s a classic computer science problem, the basis of data comparison programs such as the diff utility, and has applications in bioinformatics.',
      timeComplexity: {
        best: 'O(m*n)',
        average: 'O(m*n)',
        worst: 'O(m*n)'
      },
      spaceComplexity: 'O(m*n)',
      characteristics: ['Dynamic Programming', 'String Comparison', 'Subsequence'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/'
    },
    {
      id: 'editdistance',
      name: 'Edit Distance (Levenshtein Distance)',
      category: 'dynamic',
      description: 'A way of quantifying how dissimilar two strings are by counting the minimum number of operations required to transform one string into the other.',
      timeComplexity: {
        best: 'O(m*n)',
        average: 'O(m*n)',
        worst: 'O(m*n)'
      },
      spaceComplexity: 'O(m*n)',
      characteristics: ['Dynamic Programming', 'String Manipulation', 'Text Similarity'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/edit-distance-dp-5/'
    },
    {
      id: 'mcm',
      name: 'Matrix Chain Multiplication',
      category: 'dynamic',
      description: 'An optimization problem that seeks to find the most efficient way to multiply a given sequence of matrices.',
      timeComplexity: {
        best: 'O(n³)',
        average: 'O(n³)',
        worst: 'O(n³)'
      },
      spaceComplexity: 'O(n²)',
      characteristics: ['Dynamic Programming', 'Optimization', 'Parenthesization'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/'
    },
    {
      id: 'lis',
      name: 'Longest Increasing Subsequence',
      category: 'dynamic',
      description: 'The problem of finding a subsequence of a given sequence in which the subsequence\'s elements are in sorted order, lowest to highest, and in which the subsequence is as long as possible.',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)'
      },
      spaceComplexity: 'O(n)',
      characteristics: ['Dynamic Programming', 'Binary Search Optimization', 'Subsequence'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/'
    },
    
    // String Algorithms
    {
      id: 'kmp',
      name: 'KMP String Matching',
      category: 'string',
      description: 'An efficient string-searching algorithm that uses information about the pattern to minimize the number of comparisons needed to find a match.',
      timeComplexity: {
        best: 'O(n)',
        average: 'O(n)',
        worst: 'O(n+m)'
      },
      spaceComplexity: 'O(m)',
      characteristics: ['Pattern Matching', 'Prefix Function', 'Linear Time'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/'
    },
    {
      id: 'rabin-karp',
      name: 'Rabin-Karp Algorithm',
      category: 'string',
      description: 'A string-searching algorithm that uses hashing to find any one of a set of pattern strings in a text.',
      timeComplexity: {
        best: 'O(n+m)',
        average: 'O(n+m)',
        worst: 'O(n*m)'
      },
      spaceComplexity: 'O(1)',
      characteristics: ['Pattern Matching', 'Hashing', 'Multiple Pattern Search'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/'
    },
    {
      id: 'z-algorithm',
      name: 'Z Algorithm',
      category: 'string',
      description: 'A linear time string matching algorithm that finds all occurrences of a pattern in a text in O(n+m) time, where n is the length of the text and m is the length of the pattern.',
      timeComplexity: {
        best: 'O(n+m)',
        average: 'O(n+m)',
        worst: 'O(n+m)'
      },
      spaceComplexity: 'O(n+m)',
      characteristics: ['Pattern Matching', 'Z-array', 'Linear Time'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/z-algorithm-linear-time-pattern-searching-algorithm/'
    },
    {
      id: 'manacher',
      name: 'Manacher\'s Algorithm',
      category: 'string',
      description: 'An algorithm that finds the longest palindromic substring in linear time.',
      timeComplexity: {
        best: 'O(n)',
        average: 'O(n)',
        worst: 'O(n)'
      },
      spaceComplexity: 'O(n)',
      characteristics: ['Palindrome', 'Linear Time', 'String Processing'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/manachers-algorithm-linear-time-longest-palindromic-substring-part-1/'
    },
    {
      id: 'trie',
      name: 'Trie (Prefix Tree)',
      category: 'string',
      description: 'A tree-like data structure used to store a dynamic set or associative array where the keys are usually strings.',
      timeComplexity: {
        best: 'O(m)',
        average: 'O(m)',
        worst: 'O(m)'
      },
      spaceComplexity: 'O(ALPHABET_SIZE * m * n)',
      characteristics: ['Tree Structure', 'Prefix Matching', 'Dictionary Operations'],
      learnMoreUrl: 'https://www.geeksforgeeks.org/trie-insert-and-search/'
    }
  ];
  
  // Add language-specific implementations
  return algorithms.map(algorithm => {
    return {
      ...algorithm,
      implementation: getImplementation(algorithm.id, language)
    };
  });
}

/**
 * Get algorithm implementation in the specified language
 * @param {string} algorithmId - Algorithm ID
 * @param {string} language - Programming language
 * @returns {string} Implementation code
 */
function getImplementation(algorithmId, language) {
  const implementations = {
    quicksort: {
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
      java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`
    },
    // Add more implementations for other algorithms and languages
    // This is just a sample - in a real app, you'd have implementations for all algorithms in all supported languages
  };
  
  // Return implementation if available, otherwise a placeholder
  return implementations[algorithmId]?.[language] || 
    `// Implementation for ${algorithmId} in ${language} not available yet.\n// Check the "Learn More" link for details.`;
}
