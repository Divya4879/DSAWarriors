/**
 * Assessment page component
 */

/**
 * Render the assessment page
 * @param {HTMLElement} container - The container to render the assessment page in
 */
function renderAssessmentPage(container) {
  // Get languages data
  const languages = [
    { id: 'java', name: 'Java' },
    { id: 'python', name: 'Python' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'cpp', name: 'C++' },
    { id: 'csharp', name: 'C#' }
  ];
  
  // Get existing user profile if any
  const userProfile = Storage.get(Storage.KEYS.USER_PROFILE, {});
  
  container.innerHTML = `
    <div class="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-md p-6 fade-in">
      <h2 class="text-2xl font-bold text-white mb-6">Skill Assessment</h2>
      
      <form id="assessment-form" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
          <input type="text" id="name" name="name" value="${userProfile.name || ''}" 
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-white" 
            required>
        </div>
        
        <div>
          <label for="language" class="block text-sm font-medium text-gray-300 mb-1">Preferred Programming Language</label>
          <select id="language" name="language" 
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-white" 
            required>
            <option value="" disabled ${!userProfile.language ? 'selected' : ''}>Select a language</option>
            ${languages.map(lang => `
              <option value="${lang.id}" ${userProfile.language === lang.id ? 'selected' : ''}>${lang.name}</option>
            `).join('')}
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Your Skill Level</label>
          <div class="space-y-2">
            <div class="flex items-center">
              <input type="radio" id="newbie" name="level" value="newbie" 
                ${userProfile.level === 'newbie' ? 'checked' : ''} 
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600">
              <label for="newbie" class="ml-2 block text-sm text-gray-300">
                Newbie (Just starting with programming)
              </label>
            </div>
            <div class="flex items-center">
              <input type="radio" id="beginner" name="level" value="beginner" 
                ${userProfile.level === 'beginner' ? 'checked' : ''} 
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600">
              <label for="beginner" class="ml-2 block text-sm text-gray-300">
                Beginner (Basic programming knowledge)
              </label>
            </div>
            <div class="flex items-center">
              <input type="radio" id="intermediate" name="level" value="intermediate" 
                ${userProfile.level === 'intermediate' ? 'checked' : ''} 
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600">
              <label for="intermediate" class="ml-2 block text-sm text-gray-300">
                Intermediate (Familiar with basic DSA)
              </label>
            </div>
            <div class="flex items-center">
              <input type="radio" id="advanced" name="level" value="advanced" 
                ${userProfile.level === 'advanced' ? 'checked' : ''} 
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600">
              <label for="advanced" class="ml-2 block text-sm text-gray-300">
                Advanced (Experienced with complex algorithms)
              </label>
            </div>
            <div class="flex items-center">
              <input type="radio" id="expert" name="level" value="expert" 
                ${userProfile.level === 'expert' ? 'checked' : ''} 
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600">
              <label for="expert" class="ml-2 block text-sm text-gray-300">
                Expert (Mastery of advanced DSA concepts)
              </label>
            </div>
          </div>
        </div>
        
        <div class="pt-4">
          <button type="submit" class="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition">
            Start Assessment
          </button>
        </div>
      </form>
    </div>
  `;
  
  // Add event listener to form submission
  const form = document.getElementById('assessment-form');
  if (form) {
    form.addEventListener('submit', handleAssessmentFormSubmit);
  }
}

/**
 * Handle assessment form submission
 * @param {Event} event - The form submission event
 */
function handleAssessmentFormSubmit(event) {
  event.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value;
  const language = document.getElementById('language').value;
  const level = document.querySelector('input[name="level"]:checked')?.value || 'beginner';
  
  // Create user profile
  const userProfile = {
    name,
    language,
    level,
    lastUpdated: new Date().toISOString()
  };
  
  // Save user profile
  Storage.save(Storage.KEYS.USER_PROFILE, userProfile);
  
  // Show loading state
  const container = document.getElementById('content');
  container.innerHTML = `
    <div class="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-md p-6 fade-in">
      <div class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
        <p class="mt-4 text-gray-300">Generating assessment questions based on your level...</p>
      </div>
    </div>
  `;
  
  // Get questions based on level and language
  const questions = getQuestions(level, language);
  
  // Save questions to storage
  Storage.save(Storage.KEYS.ASSESSMENT_QUESTIONS, questions);
  
  // Render the questions after a short delay to show loading state
  setTimeout(() => {
    renderQuestions(container, questions, userProfile);
  }, 500);
}
/**
 * Render assessment questions
 * @param {HTMLElement} container - The container to render the questions in
 * @param {Array} questions - The questions to render
 * @param {Object} userProfile - The user profile
 */
function renderQuestions(container, questions, userProfile) {
  container.innerHTML = `
    <div class="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-md p-6 fade-in">
      <h2 class="text-2xl font-bold text-white mb-2">DSA Assessment</h2>
      <p class="text-gray-300 mb-6">Answer the following 10 multiple-choice questions to help us create your personalized learning roadmap.</p>
      
      <form id="questions-form" class="space-y-8">
        <div class="space-y-6">
          ${questions.map((q, index) => `
            <div class="bg-gray-700 rounded-lg p-4">
              <p class="text-white font-medium mb-3">${index + 1}. ${q.question}</p>
              <div class="space-y-2">
                ${q.options.map((option, optIndex) => `
                  <div class="flex items-center">
                    <input type="radio" id="q${index}_opt${optIndex}" name="q${index}" value="${optIndex}" 
                      class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600" required>
                    <label for="q${index}_opt${optIndex}" class="ml-2 block text-sm text-gray-300">
                      ${option}
                    </label>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="pt-4">
          <button type="submit" class="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition">
            Submit Answers
          </button>
        </div>
      </form>
    </div>
  `;
  
  // Add event listener to form submission
  const form = document.getElementById('questions-form');
  if (form) {
    form.addEventListener('submit', (event) => handleQuestionsSubmit(event, questions, userProfile));
  }
}
/**
 * Handle questions form submission
 * @param {Event} event - The form submission event
 * @param {Array} questions - The questions
 * @param {Object} userProfile - The user profile
 */
function handleQuestionsSubmit(event, questions, userProfile) {
  event.preventDefault();
  
  // Collect answers
  const answers = questions.map((q, index) => {
    const selectedOption = document.querySelector(`input[name="q${index}"]:checked`)?.value;
    return {
      question: q.question,
      selectedOption: selectedOption !== undefined ? parseInt(selectedOption) : null,
      correctOption: q.correctAnswer,
      isCorrect: selectedOption !== undefined && parseInt(selectedOption) === q.correctAnswer,
      explanation: q.explanation
    };
  });
  
  // Calculate score
  const totalQuestions = questions.length;
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const score = (correctAnswers / totalQuestions) * 100;
  
  // Determine adjusted level based on score
  let adjustedLevel = userProfile.level;
  
  if (correctAnswers <= 4) {
    adjustedLevel = 'newbie';
  } else if (correctAnswers < 8) {
    // Move one level down if less than 8 correct answers
    switch (userProfile.level) {
      case 'expert':
        adjustedLevel = 'advanced';
        break;
      case 'advanced':
        adjustedLevel = 'intermediate';
        break;
      case 'intermediate':
        adjustedLevel = 'beginner';
        break;
      case 'beginner':
        adjustedLevel = 'newbie';
        break;
      default:
        adjustedLevel = 'newbie';
    }
  }
  
  // Create assessment results
  const assessmentResults = {
    answers,
    score,
    originalLevel: userProfile.level,
    adjustedLevel,
    timestamp: new Date().toISOString()
  };
  
  // Save assessment results
  Storage.save(Storage.KEYS.ASSESSMENT_RESULTS, assessmentResults);
  
  // Update user profile with adjusted level
  userProfile.level = adjustedLevel;
  Storage.save(Storage.KEYS.USER_PROFILE, userProfile);
  
  // Generate roadmap based on adjusted level
  generateInitialRoadmap(userProfile);
  
  // Show loading state
  const container = document.getElementById('content');
  container.innerHTML = `
    <div class="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-md p-6 fade-in">
      <div class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
        <p class="mt-4 text-gray-300">Analyzing your answers...</p>
      </div>
    </div>
  `;
  
  // Render results after a short delay
  setTimeout(() => {
    renderAssessmentResults(container, assessmentResults, userProfile, questions);
  }, 800);
}
/**
 * Render assessment results
 * @param {HTMLElement} container - The container to render the results in
 * @param {Object} results - The assessment results
 * @param {Object} userProfile - The user profile
 * @param {Array} questions - The questions
 */
function renderAssessmentResults(container, results, userProfile, questions) {
  // Check if results object has the expected properties
  if (!results || !results.answers || typeof results.score !== 'number') {
    console.error('Invalid assessment results:', results);
    // Fallback to assessment form if results are invalid
    renderAssessmentPage(container);
    return;
  }

  const { answers, score, originalLevel, adjustedLevel } = results;
  
  // Create a safe version of the score for display
  const displayScore = Math.round(score);
  
  container.innerHTML = `
    <div class="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-md p-6 fade-in">
      <h2 class="text-2xl font-bold text-white mb-2">Assessment Results</h2>
      
      <div class="bg-gray-700 rounded-lg p-4 mb-6">
        <h3 class="text-xl font-semibold text-white mb-2">Your Performance</h3>
        <div class="flex items-center mb-4">
          <div class="w-full bg-gray-600 rounded-full h-4">
            <div class="bg-primary-600 h-4 rounded-full" style="width: ${displayScore}%"></div>
          </div>
          <span class="ml-3 text-white font-medium">${displayScore}%</span>
        </div>
        <p class="text-gray-300">You answered ${answers.filter(a => a.isCorrect).length} out of ${answers.length} questions correctly.</p>
        
        ${originalLevel !== adjustedLevel ? `
          <div class="mt-4 p-3 bg-gray-600 rounded-lg">
            <p class="text-yellow-300 font-medium">Your level has been adjusted based on your performance.</p>
            <p class="text-gray-300 mt-1">Original level: <span class="font-medium">${capitalizeFirstLetter(originalLevel)}</span></p>
            <p class="text-gray-300">Adjusted level: <span class="font-medium">${capitalizeFirstLetter(adjustedLevel)}</span></p>
          </div>
        ` : `
          <p class="text-green-400 mt-4">Your self-assessment was accurate! You'll continue at the ${capitalizeFirstLetter(adjustedLevel)} level.</p>
        `}
      </div>
      
      <div class="space-y-6 mb-6">
        <h3 class="text-xl font-semibold text-white">Question Review</h3>
        ${answers.map((a, index) => `
          <div class="bg-gray-700 rounded-lg p-4">
            <p class="text-white font-medium mb-2">${index + 1}. ${a.question}</p>
            <div class="mb-2">
              <span class="text-sm ${a.isCorrect ? 'text-green-400' : 'text-red-400'}">
                ${a.isCorrect ? '✓ Correct' : '✗ Incorrect'}
              </span>
            </div>
            <p class="text-gray-300 text-sm mb-2">
              <span class="font-medium">Your answer:</span> 
              ${a.selectedOption !== null ? questions[index].options[a.selectedOption] : 'Not answered'}
            </p>
            <p class="text-green-400 text-sm mb-2">
              <span class="font-medium">Correct answer:</span> 
              ${questions[index].options[a.correctOption]}
            </p>
            <p class="text-gray-300 text-sm">
              <span class="font-medium">Explanation:</span> 
              ${a.explanation}
            </p>
          </div>
        `).join('')}
      </div>
      
      <div class="pt-6">
        <div class="flex justify-between">
          <button id="view-roadmap" class="bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition">
            View My Roadmap
          </button>
          <button id="retake-assessment" class="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition">
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners to buttons
  const viewRoadmapButton = document.getElementById('view-roadmap');
  if (viewRoadmapButton) {
    viewRoadmapButton.addEventListener('click', () => {
      window.location.hash = '#/roadmap';
    });
  }
  
  const retakeAssessmentButton = document.getElementById('retake-assessment');
  if (retakeAssessmentButton) {
    retakeAssessmentButton.addEventListener('click', () => {
      renderAssessmentPage(document.getElementById('content'));
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

/**
 * Generate initial roadmap based on assessment
 * @param {Object} userProfile - User profile data
 */
function generateInitialRoadmap(userProfile) {
  // Get roadmap template based on skill level
  let roadmapTemplate;
  
  switch (userProfile.level) {
    case 'expert':
      roadmapTemplate = getExpertRoadmap(userProfile.language);
      break;
    case 'advanced':
      roadmapTemplate = getAdvancedRoadmap(userProfile.language);
      break;
    case 'intermediate':
      roadmapTemplate = getIntermediateRoadmap(userProfile.language);
      break;
    case 'beginner':
      roadmapTemplate = getBeginnerRoadmap(userProfile.language);
      break;
    default:
      roadmapTemplate = getNewbieRoadmap(userProfile.language);
  }
  
  // Initialize progress for each roadmap item
  const roadmapWithProgress = roadmapTemplate.map(week => ({
    ...week,
    days: week.days.map(day => ({
      ...day,
      completed: false,
      resources: day.resources.map(resource => ({
        ...resource,
        completed: false
      }))
    }))
  }));
  
  // Save roadmap progress
  Storage.save(Storage.KEYS.ROADMAP_PROGRESS, roadmapWithProgress);
}
/**
 * Get questions based on level and language
 * @param {string} level - Skill level
 * @param {string} language - Programming language
 * @returns {Array} Array of questions
 */
function getQuestions(level, language) {
  // Return appropriate questions based on level
  switch (level) {
    case 'expert':
      return getExpertQuestions(language);
    case 'advanced':
      return getAdvancedQuestions(language);
    case 'intermediate':
      return getIntermediateQuestions(language);
    case 'beginner':
      return getBeginnerQuestions(language);
    default:
      return getNewbieQuestions(language);
  }
}
/**
 * Get newbie questions
 * @param {string} language - Programming language
 * @returns {Array} Array of questions
 */
function getNewbieQuestions(language) {
  return [
    {
      question: "What does DSA stand for?",
      options: [
        "Data Storage and Access",
        "Data Structures and Algorithms",
        "Digital System Architecture",
        "Development System Analysis"
      ],
      correctAnswer: 1,
      explanation: "DSA stands for Data Structures and Algorithms, which are fundamental concepts in computer science for organizing and processing data efficiently."
    },
    {
      question: "Which of the following is NOT a basic data structure?",
      options: [
        "Array",
        "String",
        "Database",
        "Stack"
      ],
      correctAnswer: 2,
      explanation: "A database is not a basic data structure but rather a system for storing and organizing data. Arrays, strings, and stacks are all basic data structures."
    },
    {
      question: "What is the primary purpose of an algorithm?",
      options: [
        "To create user interfaces",
        "To solve problems step by step",
        "To store data efficiently",
        "To connect to databases"
      ],
      correctAnswer: 1,
      explanation: "An algorithm is a step-by-step procedure designed to solve a specific problem or perform a specific task."
    },
    {
      question: "Which of these represents the correct way to access the first element of an array in most programming languages?",
      options: [
        "array(1)",
        "array[0]",
        "array.first()",
        "array.get(1)"
      ],
      correctAnswer: 1,
      explanation: "In most programming languages (including Java, Python, JavaScript, C++, and C#), arrays are zero-indexed, meaning the first element is accessed with index 0."
    },
    {
      question: "What is the time complexity of accessing an element in an array by its index?",
      options: [
        "O(n)",
        "O(log n)",
        "O(1)",
        "O(n²)"
      ],
      correctAnswer: 2,
      explanation: "Accessing an element in an array by its index is a constant time operation O(1) because the memory address can be calculated directly from the index."
    },
    {
      question: "Which of the following is an example of a linear data structure?",
      options: [
        "Tree",
        "Graph",
        "Array",
        "Binary Search Tree"
      ],
      correctAnswer: 2,
      explanation: "An array is a linear data structure where elements are stored in contiguous memory locations. Trees, graphs, and binary search trees are non-linear data structures."
    },
    {
      question: "What does the term 'iteration' mean in programming?",
      options: [
        "Creating a new function",
        "Repeating a set of instructions",
        "Fixing bugs in code",
        "Converting code to machine language"
      ],
      correctAnswer: 1,
      explanation: "Iteration refers to the process of repeating a set of instructions multiple times, typically using loops like for, while, or do-while."
    },
    {
      question: "Which of these is NOT a common way to represent an algorithm?",
      options: [
        "Flowchart",
        "Pseudocode",
        "Database schema",
        "Programming language code"
      ],
      correctAnswer: 2,
      explanation: "A database schema is used to define the structure of a database, not to represent algorithms. Flowcharts, pseudocode, and actual code are common ways to represent algorithms."
    },
    {
      question: "What is a variable in programming?",
      options: [
        "A fixed value that never changes",
        "A named storage location for data",
        "A type of algorithm",
        "A section of code that repeats"
      ],
      correctAnswer: 1,
      explanation: "A variable is a named storage location that can hold data values which may change during program execution."
    },
    {
      question: "Which of the following best describes a 'bug' in programming?",
      options: [
        "A feature that users don't like",
        "An error or flaw that causes incorrect behavior",
        "A piece of code that runs slowly",
        "A security vulnerability"
      ],
      correctAnswer: 1,
      explanation: "A bug is an error, flaw, or fault in a program that causes it to produce incorrect or unexpected results or behave in unintended ways."
    }
  ];
}
/**
 * Get beginner questions
 * @param {string} language - Programming language
 * @returns {Array} Array of questions
 */
function getBeginnerQuestions(language) {
  return [
    {
      question: "What is the time complexity of searching for an element in an unsorted array?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      correctAnswer: 2,
      explanation: "In an unsorted array, you need to check each element until you find the target, which takes O(n) time in the worst case."
    },
    {
      question: "Which data structure operates on a LIFO (Last In, First Out) principle?",
      options: [
        "Queue",
        "Stack",
        "Linked List",
        "Tree"
      ],
      correctAnswer: 1,
      explanation: "A stack follows LIFO principle where the last element added is the first one to be removed."
    },
    {
      question: "What is the space complexity of an algorithm that creates an array of size n?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      correctAnswer: 2,
      explanation: "Creating an array of size n requires O(n) space."
    },
    {
      question: "Which sorting algorithm has the best average-case time complexity?",
      options: [
        "Bubble Sort",
        "Insertion Sort",
        "Quick Sort",
        "Selection Sort"
      ],
      correctAnswer: 2,
      explanation: "Quick Sort has an average time complexity of O(n log n), which is better than O(n²) for the other options listed."
    },
    {
      question: "What data structure would you use to check if a string is a palindrome?",
      options: [
        "Queue",
        "Stack",
        "Binary Tree",
        "Hash Table"
      ],
      correctAnswer: 1,
      explanation: "A stack can be used to reverse the first half of the string and then compare with the second half."
    },
    {
      question: "Which of the following is NOT a characteristic of a linked list?",
      options: [
        "Dynamic size",
        "Random access",
        "Efficient insertion/deletion",
        "Sequential access"
      ],
      correctAnswer: 1,
      explanation: "Linked lists do not support random access (accessing elements by index in constant time) unlike arrays."
    },
    {
      question: "What is recursion in programming?",
      options: [
        "A loop that runs infinitely",
        "A function that calls itself",
        "A method to optimize code",
        "A way to store data"
      ],
      correctAnswer: 1,
      explanation: "Recursion is when a function calls itself to solve a smaller instance of the same problem."
    },
    {
      question: `In ${language}, what would be the output of iterating through an array of size 5 with indices starting from 0 to 5?`,
      options: [
        "All elements will be processed",
        "The first 5 elements will be processed",
        "An error will occur due to index out of bounds",
        "The last element will be skipped"
      ],
      correctAnswer: 2,
      explanation: "An array of size 5 has indices from 0 to 4. Trying to access index 5 would result in an index out of bounds error."
    },
    {
      question: "What is the primary advantage of using a binary search over a linear search?",
      options: [
        "Binary search works on unsorted arrays",
        "Binary search is easier to implement",
        "Binary search is more efficient for large datasets",
        "Binary search uses less memory"
      ],
      correctAnswer: 2,
      explanation: "Binary search has a time complexity of O(log n) compared to O(n) for linear search, making it much more efficient for large datasets."
    },
    {
      question: "Which of these is NOT a common operation performed on a queue?",
      options: [
        "Enqueue",
        "Dequeue",
        "Peek",
        "Push"
      ],
      correctAnswer: 3,
      explanation: "Push is an operation associated with stacks, not queues. The common queue operations are enqueue (add), dequeue (remove), and peek (view the front element)."
    }
  ];
}
/**
 * Get intermediate questions
 * @param {string} language - Programming language
 * @returns {Array} Array of questions
 */
function getIntermediateQuestions(language) {
  return [
    {
      question: "What is the time complexity of the best binary search tree operations?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      correctAnswer: 1,
      explanation: "In a balanced binary search tree, operations like search, insert, and delete take O(log n) time."
    },
    {
      question: "Which algorithm is used to find the shortest path in a weighted graph?",
      options: [
        "Depth-First Search",
        "Breadth-First Search",
        "Dijkstra's Algorithm",
        "Quick Sort"
      ],
      correctAnswer: 2,
      explanation: "Dijkstra's algorithm is specifically designed to find the shortest path in a weighted graph with non-negative weights."
    },
    {
      question: "What is the time complexity of the quicksort algorithm in the worst case?",
      options: [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(2ⁿ)"
      ],
      correctAnswer: 2,
      explanation: "Quicksort has a worst-case time complexity of O(n²) when the pivot selection consistently results in unbalanced partitions."
    },
    {
      question: "Which data structure is most efficient for implementing a priority queue?",
      options: [
        "Array",
        "Linked List",
        "Binary Search Tree",
        "Heap"
      ],
      correctAnswer: 3,
      explanation: "A heap provides O(log n) time for insertion and deletion of the highest-priority element, making it ideal for priority queues."
    },
    {
      question: "What is the space complexity of a recursive algorithm with maximum recursion depth n?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      correctAnswer: 2,
      explanation: "The space complexity is O(n) due to the call stack storing information for each recursive call."
    },
    {
      question: "Which of the following is NOT a balanced binary search tree?",
      options: [
        "AVL Tree",
        "Red-Black Tree",
        "B-Tree",
        "Binary Tree"
      ],
      correctAnswer: 3,
      explanation: "A regular binary tree has no balancing mechanism, while AVL trees, Red-Black trees, and B-trees all maintain balance through specific rules."
    },
    {
      question: "What is the primary purpose of hashing in data structures?",
      options: [
        "To encrypt data",
        "To compress data",
        "To provide fast data retrieval",
        "To sort data efficiently"
      ],
      correctAnswer: 2,
      explanation: "Hashing is primarily used to provide fast data retrieval (average O(1) time) by mapping keys to array indices."
    },
    {
      question: "Which of these is NOT a common collision resolution technique in hash tables?",
      options: [
        "Separate Chaining",
        "Linear Probing",
        "Quadratic Probing",
        "Binary Search"
      ],
      correctAnswer: 3,
      explanation: "Binary search is not a collision resolution technique. Common techniques include separate chaining (using linked lists) and open addressing methods like linear and quadratic probing."
    },
    {
      question: "What is dynamic programming?",
      options: [
        "Writing code that changes at runtime",
        "A method to solve problems by breaking them into simpler subproblems",
        "Programming that adapts to user input",
        "Using multiple programming languages in one project"
      ],
      correctAnswer: 1,
      explanation: "Dynamic programming is a method for solving complex problems by breaking them down into simpler overlapping subproblems and storing their solutions to avoid redundant calculations."
    },
    {
      question: "Which traversal of a binary tree visits the root node first?",
      options: [
        "In-order",
        "Pre-order",
        "Post-order",
        "Level-order"
      ],
      correctAnswer: 1,
      explanation: "Pre-order traversal visits the root node first, then the left subtree, and finally the right subtree (Root-Left-Right)."
    }
  ];
}
/**
 * Get advanced questions
 * @param {string} language - Programming language
 * @returns {Array} Array of questions
 */
function getAdvancedQuestions(language) {
  return [
    {
      question: "What is the time complexity of the Bellman-Ford algorithm for finding shortest paths?",
      options: [
        "O(V)",
        "O(E)",
        "O(V + E)",
        "O(V × E)"
      ],
      correctAnswer: 3,
      explanation: "Bellman-Ford has a time complexity of O(V × E) where V is the number of vertices and E is the number of edges."
    },
    {
      question: "Which of the following is NOT an NP-complete problem?",
      options: [
        "Traveling Salesman Problem",
        "Finding the shortest path in a weighted graph",
        "Graph Coloring",
        "Boolean Satisfiability Problem"
      ],
      correctAnswer: 1,
      explanation: "Finding the shortest path in a weighted graph can be solved in polynomial time using algorithms like Dijkstra's or Bellman-Ford."
    },
    {
      question: "What is the amortized time complexity of insertion in a dynamic array?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      correctAnswer: 0,
      explanation: "While some insertions require O(n) time for resizing, the amortized time complexity is O(1) when considering the cost averaged over a sequence of operations."
    },
    {
      question: "Which data structure is most efficient for implementing a union-find (disjoint set) operation?",
      options: [
        "Binary Search Tree",
        "Hash Table",
        "Disjoint-Set Forest with Path Compression",
        "Red-Black Tree"
      ],
      correctAnswer: 2,
      explanation: "Disjoint-Set Forest with Path Compression and Union by Rank provides near-constant time operations for union and find."
    },
    {
      question: "What is the time complexity of the Floyd-Warshall algorithm for all-pairs shortest paths?",
      options: [
        "O(V²)",
        "O(V³)",
        "O(V × E)",
        "O(V × E × log V)"
      ],
      correctAnswer: 1,
      explanation: "Floyd-Warshall has a time complexity of O(V³) where V is the number of vertices."
    },
    {
      question: "Which of the following is NOT a balanced tree data structure?",
      options: [
        "AVL Tree",
        "Red-Black Tree",
        "Splay Tree",
        "B+ Tree"
      ],
      correctAnswer: 2,
      explanation: "Splay trees are self-adjusting but not strictly balanced. They reorganize themselves to bring frequently accessed elements closer to the root."
    },
    {
      question: "What is the primary purpose of the A* search algorithm?",
      options: [
        "Sorting data efficiently",
        "Finding the shortest path using heuristics",
        "Balancing binary trees",
        "Compressing data"
      ],
      correctAnswer: 1,
      explanation: "A* is a pathfinding algorithm that uses heuristics to find the shortest path more efficiently than algorithms like Dijkstra's by prioritizing paths that appear to lead closer to the goal."
    },
    {
      question: "Which of these is NOT a common use of a trie data structure?",
      options: [
        "Autocomplete suggestions",
        "Spell checking",
        "Sorting algorithms",
        "IP routing"
      ],
      correctAnswer: 2,
      explanation: "Tries are not typically used for sorting algorithms. They are commonly used for efficient string operations like autocomplete, spell checking, and IP routing (CIDR)."
    },
    {
      question: "What is the primary advantage of a B-tree over a binary search tree?",
      options: [
        "B-trees use less memory",
        "B-trees are simpler to implement",
        "B-trees are better for disk access patterns",
        "B-trees have faster search times for all cases"
      ],
      correctAnswer: 2,
      explanation: "B-trees are designed to work efficiently with disk-based storage by reducing the number of disk accesses, as they have a higher branching factor and are more balanced."
    },
    {
      question: "Which of the following algorithms can detect negative cycles in a graph?",
      options: [
        "Dijkstra's Algorithm",
        "Prim's Algorithm",
        "Bellman-Ford Algorithm",
        "Kruskal's Algorithm"
      ],
      correctAnswer: 2,
      explanation: "Bellman-Ford can detect negative cycles in a graph, while Dijkstra's cannot handle negative weights. Prim's and Kruskal's are for finding minimum spanning trees, not shortest paths."
    }
  ];
}
/**
 * Get expert questions
 * @param {string} language - Programming language
 * @returns {Array} Array of questions
 */
function getExpertQuestions(language) {
  return [
    {
      question: "Which of the following problems is NOT in the P complexity class?",
      options: [
        "Finding the shortest path in a graph with non-negative weights",
        "Determining if a number is prime",
        "The traveling salesman problem (TSP)",
        "Sorting an array of integers"
      ],
      correctAnswer: 2,
      explanation: "The traveling salesman problem is NP-hard, not in P. The other problems can be solved in polynomial time."
    },
    {
      question: "What is the time complexity of the best known algorithm for matrix multiplication?",
      options: [
        "O(n²)",
        "O(n²log n)",
        "O(n^2.373)",
        "O(n³)"
      ],
      correctAnswer: 2,
      explanation: "The current best known algorithm for matrix multiplication has a time complexity of approximately O(n^2.373) using the Coppersmith–Winograd algorithm with optimizations."
    },
    {
      question: "Which of the following data structures would be most efficient for implementing a cache with LRU (Least Recently Used) eviction policy?",
      options: [
        "Array",
        "Binary Search Tree",
        "Hash Table with Doubly Linked List",
        "Heap"
      ],
      correctAnswer: 2,
      explanation: "An LRU cache is typically implemented using a hash table for O(1) lookups combined with a doubly linked list to maintain access order and perform efficient removals."
    },
    {
      question: "What is the primary purpose of a Bloom filter?",
      options: [
        "To sort data efficiently",
        "To test if an element is definitely not in a set",
        "To compress data",
        "To encrypt data securely"
      ],
      correctAnswer: 1,
      explanation: "A Bloom filter is a space-efficient probabilistic data structure used to test whether an element is definitely not in a set (no false negatives) or possibly in the set (may have false positives)."
    },
    {
      question: "Which of the following is NOT a property of a Red-Black tree?",
      options: [
        "Every node is either red or black",
        "The root is always black",
        "Every path from root to leaf has the same number of black nodes",
        "Red nodes must have two black children"
      ],
      correctAnswer: 3,
      explanation: "In a Red-Black tree, red nodes must have black children (not necessarily two), but the actual property is that no red node can have a red parent (no consecutive red nodes)."
    },
    {
      question: "What is the time complexity of finding the k-th smallest element in an unsorted array using the optimal algorithm?",
      options: [
        "O(n log n)",
        "O(n)",
        "O(k log n)",
        "O(log n)"
      ],
      correctAnswer: 1,
      explanation: "Using the QuickSelect algorithm (a variant of QuickSort), the average time complexity is O(n) to find the k-th smallest element in an unsorted array."
    },
    {
      question: "Which of the following algorithms is used for string pattern matching with the best average-case performance?",
      options: [
        "Naive string matching",
        "Knuth-Morris-Pratt (KMP)",
        "Boyer-Moore",
        "Rabin-Karp"
      ],
      correctAnswer: 2,
      explanation: "Boyer-Moore has the best average-case performance for string pattern matching, as it can skip multiple characters based on the bad character and good suffix heuristics."
    },
    {
      question: "What is the primary advantage of a Skip List over a balanced binary search tree?",
      options: [
        "Lower space complexity",
        "Simpler implementation with similar average-case performance",
        "Better worst-case performance",
        "Guaranteed O(1) operations"
      ],
      correctAnswer: 1,
      explanation: "Skip Lists offer a simpler implementation with probabilistic balancing while maintaining O(log n) average-case performance for search, insert, and delete operations, similar to balanced BSTs."
    },
    {
      question: "Which of the following is NOT a common use case for a segment tree?",
      options: [
        "Range sum queries",
        "Range minimum queries",
        "Sorting algorithms",
        "Range update operations"
      ],
      correctAnswer: 2,
      explanation: "Segment trees are not typically used for sorting algorithms. They excel at range queries (sum, min, max) and range updates with efficient O(log n) operations."
    },
    {
      question: "What is the space complexity of a suffix tree for a string of length n?",
      options: [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(2ⁿ)"
      ],
      correctAnswer: 0,
      explanation: "A suffix tree for a string of length n has O(n) space complexity, as it contains at most 2n-1 nodes."
    }
  ];
}
/**
 * Get newbie roadmap template
 * @param {string} language - Programming language
 * @returns {Array} Roadmap template
 */
function getNewbieRoadmap(language) {
  return [
    {
      week: 1,
      title: "Programming Basics",
      days: [
        {
          day: 1,
          title: "Introduction to Programming",
          resources: [
            {
              title: `${language.charAt(0).toUpperCase() + language.slice(1)} Basics`,
              url: getLanguageBasicsUrl(language),
              type: "documentation"
            },
            {
              title: "Variables and Data Types",
              url: getLanguageResourceUrl(language, "basics"),
              type: "tutorial"
            }
          ]
        },
        {
          day: 2,
          title: "Control Flow",
          resources: [
            {
              title: "Conditionals and Loops",
              url: getLanguageResourceUrl(language, "control-flow"),
              type: "tutorial"
            },
            {
              title: "Practice: Simple Problems",
              url: "https://www.w3schools.com/",
              type: "practice"
            }
          ]
        }
      ]
    }
  ];
}

/**
 * Get beginner roadmap template
 * @param {string} language - Programming language
 * @returns {Array} Roadmap template
 */
function getBeginnerRoadmap(language) {
  return [
    {
      week: 1,
      title: "Data Structures Fundamentals",
      days: [
        {
          day: 1,
          title: "Arrays and Strings",
          resources: [
            {
              title: "Array Manipulation Techniques",
              url: getLanguageResourceUrl(language, "arrays"),
              type: "tutorial"
            },
            {
              title: "Practice: Array Problems",
              url: "https://leetcode.com/tag/array/",
              type: "practice"
            }
          ]
        },
        {
          day: 2,
          title: "Linked Lists",
          resources: [
            {
              title: "Introduction to Linked Lists",
              url: "https://www.geeksforgeeks.org/linked-list-set-1-introduction/",
              type: "tutorial"
            },
            {
              title: "Implementing a Linked List",
              url: getLanguageResourceUrl(language, "linked-list"),
              type: "tutorial"
            }
          ]
        }
      ]
    }
  ];
}
/**
 * Get intermediate roadmap template
 * @param {string} language - Programming language
 * @returns {Array} Roadmap template
 */
function getIntermediateRoadmap(language) {
  return [
    {
      week: 1,
      title: "Advanced Data Structures",
      days: [
        {
          day: 1,
          title: "Trees",
          resources: [
            {
              title: "Binary Trees and Binary Search Trees",
              url: "https://www.geeksforgeeks.org/binary-tree-data-structure/",
              type: "tutorial"
            },
            {
              title: "Tree Traversal Algorithms",
              url: "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/",
              type: "tutorial"
            }
          ]
        },
        {
          day: 2,
          title: "Heaps",
          resources: [
            {
              title: "Binary Heap",
              url: "https://www.geeksforgeeks.org/binary-heap/",
              type: "tutorial"
            },
            {
              title: "Priority Queue Implementation",
              url: getLanguageResourceUrl(language, "priority-queue"),
              type: "tutorial"
            }
          ]
        }
      ]
    }
  ];
}

/**
 * Get advanced roadmap template
 * @param {string} language - Programming language
 * @returns {Array} Roadmap template
 */
function getAdvancedRoadmap(language) {
  return [
    {
      week: 1,
      title: "Advanced Algorithms",
      days: [
        {
          day: 1,
          title: "Advanced Graph Algorithms",
          resources: [
            {
              title: "Shortest Path Algorithms",
              url: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/",
              type: "tutorial"
            },
            {
              title: "Minimum Spanning Tree",
              url: "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/",
              type: "tutorial"
            }
          ]
        },
        {
          day: 2,
          title: "Advanced Dynamic Programming",
          resources: [
            {
              title: "DP Patterns and Techniques",
              url: "https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns",
              type: "tutorial"
            },
            {
              title: "Practice: DP Problems",
              url: "https://leetcode.com/tag/dynamic-programming/",
              type: "practice"
            }
          ]
        }
      ]
    }
  ];
}
/**
 * Get expert roadmap template
 * @param {string} language - Programming language
 * @returns {Array} Roadmap template
 */
function getExpertRoadmap(language) {
  return [
    {
      week: 1,
      title: "Advanced Algorithm Techniques",
      days: [
        {
          day: 1,
          title: "Network Flow Algorithms",
          resources: [
            {
              title: "Maximum Flow - Ford-Fulkerson Algorithm",
              url: "https://www.geeksforgeeks.org/ford-fulkerson-algorithm-for-maximum-flow-problem/",
              type: "tutorial"
            },
            {
              title: "Bipartite Matching",
              url: "https://www.geeksforgeeks.org/maximum-bipartite-matching/",
              type: "tutorial"
            }
          ]
        },
        {
          day: 2,
          title: "Advanced String Algorithms",
          resources: [
            {
              title: "Suffix Trees and Arrays",
              url: "https://www.geeksforgeeks.org/suffix-tree-application-1-substring-check/",
              type: "tutorial"
            },
            {
              title: "Aho-Corasick Algorithm",
              url: "https://www.geeksforgeeks.org/aho-corasick-algorithm-pattern-searching/",
              type: "tutorial"
            }
          ]
        }
      ]
    }
  ];
}

/**
 * Get URL for language basics
 * @param {string} language - Programming language
 * @returns {string} URL
 */
function getLanguageBasicsUrl(language) {
  switch (language) {
    case 'java':
      return 'https://docs.oracle.com/javase/tutorial/';
    case 'python':
      return 'https://docs.python.org/3/tutorial/';
    case 'javascript':
      return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide';
    case 'cpp':
      return 'https://www.learncpp.com/';
    case 'csharp':
      return 'https://docs.microsoft.com/en-us/dotnet/csharp/';
    default:
      return 'https://www.w3schools.com/';
  }
}

/**
 * Get URL for specific language resource
 * @param {string} language - Programming language
 * @param {string} topic - Topic
 * @returns {string} URL
 */
function getLanguageResourceUrl(language, topic) {
  // This would be expanded in a real application with more specific resources
  switch (language) {
    case 'java':
      return `https://www.geeksforgeeks.org/java-programming-examples/#${topic}`;
    case 'python':
      return `https://www.geeksforgeeks.org/python-programming-examples/#${topic}`;
    case 'javascript':
      return `https://www.w3schools.com/js/${topic}.asp`;
    case 'cpp':
      return `https://www.geeksforgeeks.org/c-plus-plus/#${topic}`;
    case 'csharp':
      return `https://www.geeksforgeeks.org/csharp-programming-language/#${topic}`;
    default:
      return 'https://www.geeksforgeeks.org/';
  }
}
