/**
 * Algorithms page component
 */

/**
 * Render the algorithms page
 * @param {HTMLElement} container - The container to render the algorithms page in
 */
function renderAlgorithmsPage(container) {
  console.log("Rendering algorithms page directly");
  
  // Get user profile for language preference
  const userProfile = Storage.get(Storage.KEYS.USER_PROFILE, { language: 'javascript' });
  const language = userProfile.language || 'javascript';
  
  // Render algorithms container directly
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
            <span>Explore more algorithm resources on GitHub</span>
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
      </div>
      
      <div id="algorithms-list" class="space-y-6">
        <!-- Quick Sort -->
<div class="elegant-card p-6 slide-up" data-algorithm-category="sorting">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-xl font-semibold text-white">Quick Sort</h3>
    <span class="tag tag-primary">Sorting</span>
  </div>

  <p class="text-gray-300 mb-4">A divide-and-conquer sorting algorithm that works by selecting a pivot element and partitioning the array around the pivot.</p>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Time & Space Complexity</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Time Complexity</h5>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Best:</span>
            <span class="text-xs font-mono text-green-400">O(n log n)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Average:</span>
            <span class="text-xs font-mono text-yellow-400">O(n log n)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Worst:</span>
            <span class="text-xs font-mono text-red-400">O(n²)</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Space Complexity</h5>
        <div class="flex justify-between">
          <span class="text-xs text-gray-300">Auxiliary:</span>
          <span class="text-xs font-mono text-blue-400">O(log n)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Implementation</h4>
    <div class="code-block text-xs">
      <pre><code>function quickSort(arr, low = 0, high = arr.length - 1) {
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
}</code></pre>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4">
    <div class="flex items-center">
      <span class="text-xs text-gray-400">Key characteristics:</span>
      <span class="ml-2 text-xs text-primary-400">Divide and Conquer, In-place, Unstable</span>
    </div>

    <a href="https://www.geeksforgeeks.org/quick-sort/" target="_blank" rel="noopener"
      class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
      Learn More
      <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>

<!-- Merge Sort -->
<div class="elegant-card p-6 slide-up" data-algorithm-category="sorting">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-xl font-semibold text-white">Merge Sort</h3>
    <span class="tag tag-primary">Sorting</span>
  </div>

  <p class="text-gray-300 mb-4">A divide-and-conquer sorting algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.</p>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Time & Space Complexity</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Time Complexity</h5>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Best:</span>
            <span class="text-xs font-mono text-green-400">O(n log n)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Average:</span>
            <span class="text-xs font-mono text-yellow-400">O(n log n)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Worst:</span>
            <span class="text-xs font-mono text-red-400">O(n log n)</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Space Complexity</h5>
        <div class="flex justify-between">
          <span class="text-xs text-gray-300">Auxiliary:</span>
          <span class="text-xs font-mono text-blue-400">O(n)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Implementation</h4>
    <div class="code-block text-xs">
      <pre><code>function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}</code></pre>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4">
    <div class="flex items-center">
      <span class="text-xs text-gray-400">Key characteristics:</span>
      <span class="ml-2 text-xs text-primary-400">Divide and Conquer, Stable, Not in-place</span>
    </div>

    <a href="https://www.geeksforgeeks.org/merge-sort/" target="_blank" rel="noopener"
      class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
      Learn More
      <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>

<!-- Binary Search -->
<div class="elegant-card p-6 slide-up" data-algorithm-category="searching">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-xl font-semibold text-white">Binary Search</h3>
    <span class="tag tag-primary">Searching</span>
  </div>

  <p class="text-gray-300 mb-4">A search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.</p>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Time & Space Complexity</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Time Complexity</h5>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Best:</span>
            <span class="text-xs font-mono text-green-400">O(1)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Average:</span>
            <span class="text-xs font-mono text-yellow-400">O(log n)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Worst:</span>
            <span class="text-xs font-mono text-red-400">O(log n)</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Space Complexity</h5>
        <div class="flex justify-between">
          <span class="text-xs text-gray-300">Auxiliary:</span>
          <span class="text-xs font-mono text-blue-400">O(1)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Implementation</h4>
    <div class="code-block text-xs">
      <pre><code>function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // Target not found
}</code></pre>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4">
    <div class="flex items-center">
      <span class="text-xs text-gray-400">Key characteristics:</span>
      <span class="ml-2 text-xs text-primary-400">Divide and Conquer, Requires sorted input, Efficient</span>
    </div>

    <a href="https://www.geeksforgeeks.org/binary-search/" target="_blank" rel="noopener"
      class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
      Learn More
      <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>

<!-- Linear Search -->
<div class="elegant-card p-6 slide-up" data-algorithm-category="searching">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-xl font-semibold text-white">Linear Search</h3>
    <span class="tag tag-primary">Searching</span>
  </div>

  <p class="text-gray-300 mb-4">A simple search algorithm that checks each element of the list until the desired element is found or the list ends.</p>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Time & Space Complexity</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Time Complexity</h5>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Best:</span>
            <span class="text-xs font-mono text-green-400">O(1)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Average:</span>
            <span class="text-xs font-mono text-yellow-400">O(n)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Worst:</span>
            <span class="text-xs font-mono text-red-400">O(n)</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Space Complexity</h5>
        <div class="flex justify-between">
          <span class="text-xs text-gray-300">Auxiliary:</span>
          <span class="text-xs font-mono text-blue-400">O(1)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Implementation</h4>
    <div class="code-block text-xs">
      <pre><code>function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1; // Target not found
}</code></pre>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4">
    <div class="flex items-center">
      <span class="text-xs text-gray-400">Key characteristics:</span>
      <span class="ml-2 text-xs text-primary-400">Simple, Works on unsorted data, Sequential</span>
    </div>

    <a href="https://www.geeksforgeeks.org/linear-search/" target="_blank" rel="noopener"
      class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
      Learn More
      <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>

<!-- Dijkstra's Algorithm -->
<div class="elegant-card p-6 slide-up" data-algorithm-category="graph">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-xl font-semibold text-white">Dijkstra's Algorithm</h3>
    <span class="tag tag-primary">Graph</span>
  </div>

  <p class="text-gray-300 mb-4">An algorithm for finding the shortest paths between nodes in a weighted graph, which may represent, for example, road networks.</p>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Time & Space Complexity</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Time Complexity</h5>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Best:</span>
            <span class="text-xs font-mono text-green-400">O(E + V log V)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Average:</span>
            <span class="text-xs font-mono text-yellow-400">O(E + V log V)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Worst:</span>
            <span class="text-xs font-mono text-red-400">O(E + V log V)</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Space Complexity</h5>
        <div class="flex justify-between">
          <span class="text-xs text-gray-300">Auxiliary:</span>
          <span class="text-xs font-mono text-blue-400">O(V)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Implementation</h4>
    <div class="code-block text-xs">
      <pre><code>function dijkstra(graph, start) {
  const distances = {};
  const visited = {};
  const previous = {};
  const pq = new PriorityQueue();

  // Initialize distances
  for (let vertex in graph) {
    if (vertex === start) {
      distances[vertex] = 0;
      pq.enqueue(vertex, 0);
    } else {
      distances[vertex] = Infinity;
      pq.enqueue(vertex, Infinity);
    }
    previous[vertex] = null;
  }

  while (!pq.isEmpty()) {
    const current = pq.dequeue().element;

    if (visited[current]) continue;
    visited[current] = true;

    for (let neighbor in graph[current]) {
      const distance = graph[current][neighbor];
      const totalDistance = distances[current] + distance;

      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
        previous[neighbor] = current;
        pq.enqueue(neighbor, totalDistance);
      }
    }
  }

  return { distances, previous };
}</code></pre>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4">
    <div class="flex items-center">
      <span class="text-xs text-gray-400">Key characteristics:</span>
      <span class="ml-2 text-xs text-primary-400">Greedy, Shortest Path, Weighted Graphs</span>
    </div>

    <a href="https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/" target="_blank" rel="noopener"
      class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
      Learn More
      <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>

<!-- Breadth-First Search -->
<div class="elegant-card p-6 slide-up" data-algorithm-category="graph">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-xl font-semibold text-white">Breadth-First Search</h3>
    <span class="tag tag-primary">Graph</span>
  </div>

  <p class="text-gray-300 mb-4">An algorithm for traversing or searching tree or graph data structures that explores all the vertices at the present depth before moving on to vertices at the next depth level.</p>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Time & Space Complexity</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Time Complexity</h5>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Best:</span>
            <span class="text-xs font-mono text-green-400">O(V + E)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Average:</span>
            <span class="text-xs font-mono text-yellow-400">O(V + E)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Worst:</span>
            <span class="text-xs font-mono text-red-400">O(V + E)</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Space Complexity</h5>
        <div class="flex justify-between">
          <span class="text-xs text-gray-300">Auxiliary:</span>
          <span class="text-xs font-mono text-blue-400">O(V)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Implementation</h4>
    <div class="code-block text-xs">
      <pre><code>function bfs(graph, start) {
  const queue = [start];
  const visited = { [start]: true };
  const result = [];

  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);

    for (const neighbor of graph[current]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }

  return result;
}</code></pre>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4">
    <div class="flex items-center">
      <span class="text-xs text-gray-400">Key characteristics:</span>
      <span class="ml-2 text-xs text-primary-400">Graph Traversal, Queue-based, Shortest Path in Unweighted Graphs</span>
    </div>

    <a href="https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/" target="_blank" rel="noopener"
      class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
      Learn More
      <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>

<!-- Depth-First Search -->
<div class="elegant-card p-6 slide-up" data-algorithm-category="graph">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-xl font-semibold text-white">Depth-First Search</h3>
    <span class="tag tag-primary">Graph</span>
  </div>

  <p class="text-gray-300 mb-4">An algorithm for traversing or searching tree or graph data structures that explores as far as possible along each branch before backtracking.</p>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Time & Space Complexity</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Time Complexity</h5>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Best:</span>
            <span class="text-xs font-mono text-green-400">O(V + E)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Average:</span>
            <span class="text-xs font-mono text-yellow-400">O(V + E)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Worst:</span>
            <span class="text-xs font-mono text-red-400">O(V + E)</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Space Complexity</h5>
        <div class="flex justify-between">
          <span class="text-xs text-gray-300">Auxiliary:</span>
          <span class="text-xs font-mono text-blue-400">O(V)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Implementation</h4>
    <div class="code-block text-xs">
      <pre><code>function dfs(graph, start) {
  const visited = {};
  const result = [];

  function dfsHelper(vertex) {
    if (!vertex) return;

    visited[vertex] = true;
    result.push(vertex);

    for (const neighbor of graph[vertex]) {
      if (!visited[neighbor]) {
        dfsHelper(neighbor);
      }
    }
  }

  dfsHelper(start);
  return result;
}</code></pre>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4">
    <div class="flex items-center">
      <span class="text-xs text-gray-400">Key characteristics:</span>
      <span class="ml-2 text-xs text-primary-400">Graph Traversal, Recursive, Stack-based</span>
    </div>

    <a href="https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/" target="_blank" rel="noopener"
      class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
      Learn More
      <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>

<!-- 0/1 Knapsack Problem -->
<div class="elegant-card p-6 slide-up" data-algorithm-category="dynamic">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-xl font-semibold text-white">0/1 Knapsack Problem</h3>
    <span class="tag tag-primary">Dynamic Programming</span>
  </div>

  <p class="text-gray-300 mb-4">A problem in combinatorial optimization where given a set of items, each with a weight and a value, determine which items to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.</p>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Time & Space Complexity</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Time Complexity</h5>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Best:</span>
            <span class="text-xs font-mono text-green-400">O(nW)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Average:</span>
            <span class="text-xs font-mono text-yellow-400">O(nW)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Worst:</span>
            <span class="text-xs font-mono text-red-400">O(nW)</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Space Complexity</h5>
        <div class="flex justify-between">
          <span class="text-xs text-gray-300">Auxiliary:</span>
          <span class="text-xs font-mono text-blue-400">O(nW)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Implementation</h4>
    <div class="code-block text-xs">
      <pre><code>function knapsack(values, weights, capacity) {
  const n = values.length;
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(
          values[i-1] + dp[i-1][w - weights[i-1]],
          dp[i-1][w]
        );
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }

  return dp[n][capacity];
}</code></pre>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4">
    <div class="flex items-center">
      <span class="text-xs text-gray-400">Key characteristics:</span>
      <span class="ml-2 text-xs text-primary-400">Dynamic Programming, Optimization, NP-Complete</span>
    </div>

    <a href="https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/" target="_blank" rel="noopener"
      class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
      Learn More
      <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>

<!-- Longest Common Subsequence -->
<div class="elegant-card p-6 slide-up" data-algorithm-category="dynamic">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-xl font-semibold text-white">Longest Common Subsequence</h3>
    <span class="tag tag-primary">Dynamic Programming</span>
  </div>

  <p class="text-gray-300 mb-4">A problem of finding the longest subsequence common to all sequences in a set of sequences. It's a classic computer science problem, the basis of data comparison programs such as the diff utility, and has applications in bioinformatics.</p>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Time & Space Complexity</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Time Complexity</h5>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Best:</span>
            <span class="text-xs font-mono text-green-400">O(m*n)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Average:</span>
            <span class="text-xs font-mono text-yellow-400">O(m*n)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Worst:</span>
            <span class="text-xs font-mono text-red-400">O(m*n)</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Space Complexity</h5>
        <div class="flex justify-between">
          <span class="text-xs text-gray-300">Auxiliary:</span>
          <span class="text-xs font-mono text-blue-400">O(m*n)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Implementation</h4>
    <div class="code-block text-xs">
      <pre><code>function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}</code></pre>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4">
    <div class="flex items-center">
      <span class="text-xs text-gray-400">Key characteristics:</span>
      <span class="ml-2 text-xs text-primary-400">Dynamic Programming, String Comparison, Subsequence</span>
    </div>

    <a href="https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/" target="_blank" rel="noopener"
      class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
      Learn More
      <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>

<!-- KMP String Matching -->
<div class="elegant-card p-6 slide-up" data-algorithm-category="string">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-xl font-semibold text-white">KMP String Matching</h3>
    <span class="tag tag-primary">String</span>
  </div>

  <p class="text-gray-300 mb-4">An efficient string-searching algorithm that uses information about the pattern to minimize the number of comparisons needed to find a match.</p>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Time & Space Complexity</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Time Complexity</h5>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Best:</span>
            <span class="text-xs font-mono text-green-400">O(n)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Average:</span>
            <span class="text-xs font-mono text-yellow-400">O(n)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Worst:</span>
            <span class="text-xs font-mono text-red-400">O(n+m)</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Space Complexity</h5>
        <div class="flex justify-between">
          <span class="text-xs text-gray-300">Auxiliary:</span>
          <span class="text-xs font-mono text-blue-400">O(m)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Implementation</h4>
    <div class="code-block text-xs">
      <pre><code>function kmpSearch(text, pattern) {
  if (pattern.length === 0) return 0;

  // Compute LPS array (Longest Proper Prefix which is also Suffix)
  const lps = computeLPSArray(pattern);
  const matches = [];

  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }

    if (j === pattern.length) {
      // Found a match
      matches.push(i - j);
      j = lps[j - 1];
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  return matches;
}

function computeLPSArray(pattern) {
  const lps = [0];
  let len = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}</code></pre>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4">
    <div class="flex items-center">
      <span class="text-xs text-gray-400">Key characteristics:</span>
      <span class="ml-2 text-xs text-primary-400">Pattern Matching, Prefix Function, Linear Time</span>
    </div>

    <a href="https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/" target="_blank" rel="noopener"
      class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
      Learn More
      <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>

<!-- Rabin-Karp Algorithm -->
<div class="elegant-card p-6 slide-up" data-algorithm-category="string">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-xl font-semibold text-white">Rabin-Karp Algorithm</h3>
    <span class="tag tag-primary">String</span>
  </div>

  <p class="text-gray-300 mb-4">A string-searching algorithm that uses hashing to find any one of a set of pattern strings in a text.</p>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Time & Space Complexity</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Time Complexity</h5>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Best:</span>
            <span class="text-xs font-mono text-green-400">O(n+m)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Average:</span>
            <span class="text-xs font-mono text-yellow-400">O(n+m)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Worst:</span>
            <span class="text-xs font-mono text-red-400">O(n*m)</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Space Complexity</h5>
        <div class="flex justify-between">
          <span class="text-xs text-gray-300">Auxiliary:</span>
          <span class="text-xs font-mono text-blue-400">O(1)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Implementation</h4>
    <div class="code-block text-xs">
      <pre><code>function rabinKarp(text, pattern) {
  const d = 256; // Number of characters in the input alphabet
  const q = 101; // A prime number
  const m = pattern.length;
  const n = text.length;
  const matches = [];

  // Calculate hash value for pattern and first window of text
  let p = 0; // hash value for pattern
  let t = 0; // hash value for text
  let h = 1;

  // Calculate h = d^(m-1) % q
  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % q;
  }

  // Calculate initial hash values
  for (let i = 0; i < m; i++) {
    p = (d * p + pattern.charCodeAt(i)) % q;
    t = (d * t + text.charCodeAt(i)) % q;
  }

  // Slide the pattern over text one by one
  for (let i = 0; i <= n - m; i++) {
    // Check if hash values match
    if (p === t) {
      // Check for characters one by one
      let j;
      for (j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) break;
      }

      // If pattern is found at current position
      if (j === m) {
        matches.push(i);
      }
    }

    // Calculate hash value for next window
    if (i < n - m) {
      t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;

      // We might get negative value, converting it to positive
      if (t < 0) t = (t + q);
    }
  }

  return matches;
}</code></pre>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4">
    <div class="flex items-center">
      <span class="text-xs text-gray-400">Key characteristics:</span>
      <span class="ml-2 text-xs text-primary-400">Pattern Matching, Hashing, Multiple Pattern Search</span>
    </div>

    <a href="https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/" target="_blank" rel="noopener"
      class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
      Learn More
      <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>

<!-- Z Algorithm -->
<div class="elegant-card p-6 slide-up" data-algorithm-category="string">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-xl font-semibold text-white">Z Algorithm</h3>
    <span class="tag tag-primary">String</span>
  </div>

  <p class="text-gray-300 mb-4">A linear time string matching algorithm that finds all occurrences of a pattern in a text in O(n+m) time, where n is the length of the text and m is the length of the pattern.</p>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Time & Space Complexity</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Time Complexity</h5>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Best:</span>
            <span class="text-xs font-mono text-green-400">O(n+m)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Average:</span>
            <span class="text-xs font-mono text-yellow-400">O(n+m)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Worst:</span>
            <span class="text-xs font-mono text-red-400">O(n+m)</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Space Complexity</h5>
        <div class="flex justify-between">
          <span class="text-xs text-gray-300">Auxiliary:</span>
          <span class="text-xs font-mono text-blue-400">O(n+m)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Implementation</h4>
    <div class="code-block text-xs">
      <pre><code>function zAlgorithm(text, pattern) {
  // Concatenate pattern and text with a special character in between
  const concat = pattern + '$' + text;
  const n = concat.length;

  // Create Z array
  const Z = new Array(n).fill(0);

  // [L,R] make a window which matches with prefix of concat
  let L = 0, R = 0;

  for (let i = 1; i < n; i++) {
    // If i > R, then we need to compute Z[i] explicitly
    if (i > R) {
      L = R = i;

      // R-L = 0 in starting, so it will start checking from 0'th index
      while (R < n && concat[R - L] === concat[R]) {
        R++;
      }

      Z[i] = R - L;
      R--;
    } else {
      // k = i-L so k corresponds to number which matches in [L,R] interval
      const k = i - L;

      // If Z[k] is less than remaining interval then Z[i] will be equal to Z[k]
      if (Z[k] < R - i + 1) {
        Z[i] = Z[k];
      } else {
        // Otherwise we need to do more comparisons
        L = i;
        while (R < n && concat[R - L] === concat[R]) {
          R++;
        }

        Z[i] = R - L;
        R--;
      }
    }
  }

  // Find matches
  const matches = [];
  for (let i = 0; i < n; i++) {
    if (Z[i] === pattern.length) {
      matches.push(i - pattern.length - 1);
    }
  }

  return matches;
}</code></pre>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4">
    <div class="flex items-center">
      <span class="text-xs text-gray-400">Key characteristics:</span>
      <span class="ml-2 text-xs text-primary-400">Pattern Matching, Z-array, Linear Time</span>
    </div>

    <a href="https://www.geeksforgeeks.org/z-algorithm-linear-time-pattern-searching-algorithm/" target="_blank" rel="noopener"
      class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
      Learn More
      <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>

<!-- Manacher's Algorithm -->
<div class="elegant-card p-6 slide-up" data-algorithm-category="string">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-xl font-semibold text-white">Manacher's Algorithm</h3>
    <span class="tag tag-primary">String</span>
  </div>

  <p class="text-gray-300 mb-4">An algorithm that finds the longest palindromic substring in linear time.</p>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Time & Space Complexity</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Time Complexity</h5>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Best:</span>
            <span class="text-xs font-mono text-green-400">O(n)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Average:</span>
            <span class="text-xs font-mono text-yellow-400">O(n)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-xs text-gray-300">Worst:</span>
            <span class="text-xs font-mono text-red-400">O(n)</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-700 p-3 rounded-md">
        <h5 class="text-xs font-medium text-gray-400 mb-1">Space Complexity</h5>
        <div class="flex justify-between">
          <span class="text-xs text-gray-300">Auxiliary:</span>
          <span class="text-xs font-mono text-blue-400">O(n)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-4">
    <h4 class="text-sm font-semibold text-gray-300 mb-2">Implementation</h4>
    <div class="code-block text-xs">
      <pre><code>function manacher(s) {
  // Transform string to handle even length palindromes
  // Insert special character between each character and at boundaries
  const t = '#' + s.split('').join('#') + '#';
  const n = t.length;

  // Array to store palindrome lengths
  const p = new Array(n).fill(0);

  let center = 0;
  let right = 0;

  for (let i = 0; i < n; i++) {
    // Mirror index
    const mirror = 2 * center - i;

    // If current position is within right boundary
    // Use the value from mirror if possible
    if (i < right) {
      p[i] = Math.min(right - i, p[mirror]);
    }

    // Expand around center i
    let a = i + (1 + p[i]);
    let b = i - (1 + p[i]);

    while (a < n && b >= 0 && t[a] === t[b]) {
      p[i]++;
      a++;
      b--;
    }

    // If palindrome centered at i expands past right,
    // adjust center and right boundary
    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }
  }

  // Find the maximum palindrome length and its center
  let maxLen = 0;
  let centerIndex = 0;

  for (let i = 0; i < n; i++) {
    if (p[i] > maxLen) {
      maxLen = p[i];
      centerIndex = i;
    }
  }

  // Extract the palindrome
  const start = (centerIndex - maxLen) / 2;
  return s.substring(start, start + maxLen);
}</code></pre>
    </div>
  </div>

  <div class="flex justify-between items-center mt-4">
    <div class="flex items-center">
      <span class="text-xs text-gray-400">Key characteristics:</span>
      <span class="ml-2 text-xs text-primary-400">Palindrome, Linear Time, String Processing</span>
    </div>

    <a href="https://www.geeksforgeeks.org/manachers-algorithm-linear-time-longest-palindromic-substring-part-1/" target="_blank" rel="noopener"
      class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
      Learn More
      <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>
  `;
  
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
      const algorithmCards = document.querySelectorAll('[data-algorithm-category]');
      
      algorithmCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-algorithm-category') === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
