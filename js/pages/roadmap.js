/**
 * Roadmap page component
 */

/**
 * Render the roadmap page
 * @param {HTMLElement} container - The container to render the roadmap page in
 */
function renderRoadmapPage(container) {
  // Get user profile
  const userProfile = Storage.get(Storage.KEYS.USER_PROFILE);
  
  if (!userProfile) {
    container.innerHTML = `
      <div class="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md p-6 fade-in">
        <h2 class="text-2xl font-bold text-white mb-4">Roadmap Not Found</h2>
        <p class="text-gray-300 mb-6">Please complete the assessment to generate your personalized roadmap.</p>
        <a href="#/assessment" class="bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition">
          Take Assessment
        </a>
      </div>
    `;
    return;
  }
  
  // Get roadmap progress or generate new roadmap if it doesn't exist
  let roadmapProgress = Storage.get(Storage.KEYS.ROADMAP_PROGRESS);
  if (!roadmapProgress) {
    // Generate roadmap based on user profile
    const roadmapData = generateRoadmap(userProfile);
    roadmapProgress = formatRoadmapForStorage(roadmapData);
    Storage.save(Storage.KEYS.ROADMAP_PROGRESS, roadmapProgress);
  }
  
  // Render roadmap using the component
  renderRoadmap(container, userProfile, roadmapProgress);
}

/**
 * Generate roadmap based on user profile
 * @param {Object} userProfile - User profile data
 * @returns {Array} Roadmap data
 */
function generateRoadmap(userProfile) {
  const { level, language } = userProfile;
  
  // Get roadmap data based on level and language
  let roadmapData;
  
  switch (level) {
    case 'expert':
      roadmapData = getExpertRoadmap(language);
      break;
    case 'advanced':
      roadmapData = getAdvancedRoadmap(language);
      break;
    case 'intermediate':
      roadmapData = getIntermediateRoadmap(language);
      break;
    case 'beginner':
      roadmapData = getBeginnerRoadmap(language);
      break;
    default:
      roadmapData = getNewbieRoadmap(language);
  }
  
  return roadmapData;
}

/**
 * Format roadmap data for storage
 * @param {Array} roadmapData - Raw roadmap data
 * @returns {Array} Formatted roadmap data
 */
function formatRoadmapForStorage(roadmapData) {
  // Add completed flags to resources
  return roadmapData.map(week => ({
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
}
/**
 * Get newbie roadmap
 * @param {string} language - Programming language
 * @returns {Array} Roadmap data
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
          description: "Learn the basics of programming and get familiar with your chosen language.",
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
            },
            {
              title: "Introduction to Programming",
              url: getLanguageVideoUrl(language, "introduction"),
              type: "video"
            },
            {
              title: "Hello World Program",
              url: getLanguagePracticeUrl(language, "hello-world"),
              type: "practice"
            }
          ]
        },
        {
          day: 2,
          title: "Control Flow",
          description: "Learn about conditional statements and loops to control program flow.",
          resources: [
            {
              title: "Conditionals and Loops",
              url: getLanguageResourceUrl(language, "control-flow"),
              type: "tutorial"
            },
            {
              title: "Control Flow Documentation",
              url: getLanguageDocUrl(language, "control-flow"),
              type: "documentation"
            },
            {
              title: "If Statements and Loops",
              url: getLanguageVideoUrl(language, "control-flow"),
              type: "video"
            },
            {
              title: "Practice: Simple Problems",
              url: getLanguagePracticeUrl(language, "control-flow"),
              type: "practice"
            }
          ]
        },
        {
          day: 3,
          title: "Functions and Methods",
          description: "Learn how to create and use functions to organize your code.",
          resources: [
            {
              title: "Functions Tutorial",
              url: getLanguageResourceUrl(language, "functions"),
              type: "tutorial"
            },
            {
              title: "Functions Documentation",
              url: getLanguageDocUrl(language, "functions"),
              type: "documentation"
            },
            {
              title: "Functions and Methods",
              url: getLanguageVideoUrl(language, "functions"),
              type: "video"
            },
            {
              title: "Practice: Function Exercises",
              url: getLanguagePracticeUrl(language, "functions"),
              type: "practice"
            }
          ]
        },
        {
          day: 4,
          title: "Arrays and Lists",
          description: "Learn about arrays and lists, the most basic data structures.",
          resources: [
            {
              title: "Arrays and Lists Tutorial",
              url: getLanguageResourceUrl(language, "arrays"),
              type: "tutorial"
            },
            {
              title: "Arrays Documentation",
              url: getLanguageDocUrl(language, "arrays"),
              type: "documentation"
            },
            {
              title: "Working with Arrays",
              url: getLanguageVideoUrl(language, "arrays"),
              type: "video"
            },
            {
              title: "Practice: Array Problems",
              url: getLanguagePracticeUrl(language, "arrays"),
              type: "practice"
            }
          ]
        },
        {
          day: 5,
          title: "Basic Problem Solving",
          description: "Apply what you've learned to solve simple programming problems.",
          resources: [
            {
              title: "Problem Solving Techniques",
              url: "https://www.geeksforgeeks.org/how-to-approach-a-coding-problem/",
              type: "tutorial"
            },
            {
              title: "Basic Algorithm Documentation",
              url: getLanguageDocUrl(language, "algorithms"),
              type: "documentation"
            },
            {
              title: "Problem Solving Strategies",
              url: getLanguageVideoUrl(language, "problem-solving"),
              type: "video"
            },
            {
              title: "Practice: Simple Problems",
              url: "https://www.codewars.com/kata/search/" + language + "?q=&r[]=-8&beta=false",
              type: "practice"
            }
          ]
        }
      ]
    },
    {
      week: 2,
      title: "Basic Data Structures",
      days: [
        {
          day: 1,
          title: "Arrays and Strings",
          description: "Dive deeper into arrays and learn about string manipulation.",
          resources: [
            {
              title: "String Manipulation",
              url: getLanguageResourceUrl(language, "strings"),
              type: "tutorial"
            },
            {
              title: "String Documentation",
              url: getLanguageDocUrl(language, "string"),
              type: "documentation"
            },
            {
              title: "String Operations",
              url: getLanguageVideoUrl(language, "strings"),
              type: "video"
            },
            {
              title: "Practice: String Problems",
              url: getLanguagePracticeUrl(language, "strings"),
              type: "practice"
            }
          ]
        },
        {
          day: 2,
          title: "Introduction to Time Complexity",
          description: "Learn the basics of analyzing algorithm efficiency.",
          resources: [
            {
              title: "Time Complexity Basics",
              url: "https://www.geeksforgeeks.org/understanding-time-complexity-simple-examples/",
              type: "tutorial"
            },
            {
              title: "Big O Notation",
              url: "https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-o-notation",
              type: "documentation"
            },
            {
              title: "Understanding Time Complexity",
              url: "https://www.youtube.com/watch?v=D6xkbGLQesk",
              type: "video"
            },
            {
              title: "Time Complexity Quiz",
              url: "https://www.geeksforgeeks.org/quiz-corner/#Time%20Complexity%20Quiz",
              type: "practice"
            }
          ]
        },
        {
          day: 3,
          title: "Basic Searching",
          description: "Learn about linear search and its applications.",
          resources: [
            {
              title: "Linear Search Tutorial",
              url: "https://www.geeksforgeeks.org/linear-search/",
              type: "tutorial"
            },
            {
              title: "Searching Algorithms",
              url: "https://www.geeksforgeeks.org/searching-algorithms/",
              type: "documentation"
            },
            {
              title: "Linear Search Explained",
              url: "https://www.youtube.com/watch?v=4GPdGsB3OSc",
              type: "video"
            },
            {
              title: "Practice: Search Problems",
              url: getLanguagePracticeUrl(language, "search"),
              type: "practice"
            }
          ]
        },
        {
          day: 4,
          title: "Basic Sorting",
          description: "Learn about simple sorting algorithms like bubble sort.",
          resources: [
            {
              title: "Bubble Sort Tutorial",
              url: "https://www.geeksforgeeks.org/bubble-sort/",
              type: "tutorial"
            },
            {
              title: "Sorting Algorithms",
              url: "https://www.geeksforgeeks.org/sorting-algorithms/",
              type: "documentation"
            },
            {
              title: "Bubble Sort Visualization",
              url: "https://www.youtube.com/watch?v=Cq7SMsQBEUw",
              type: "video"
            },
            {
              title: "Implement Bubble Sort",
              url: getLanguagePracticeUrl(language, "bubble-sort"),
              type: "practice"
            }
          ]
        },
        {
          day: 5,
          title: "Mini Project",
          description: "Apply what you've learned in a small project.",
          resources: [
            {
              title: "Simple Calculator Project",
              url: `https://www.geeksforgeeks.org/simple-calculator-using-${language}/`,
              type: "tutorial"
            },
            {
              title: "Project Ideas",
              url: `https://github.com/karan/Projects-Solutions`,
              type: "documentation"
            },
            {
              title: "Building Your First Project",
              url: getLanguageVideoUrl(language, "simple-project"),
              type: "video"
            },
            {
              title: "To-Do List Application",
              url: `https://github.com/search?q=${language}+todo+app+beginner`,
              type: "project"
            }
          ]
        }
      ]
    },
    {
      week: 3,
      title: "Basic Data Structures",
      days: [
        {
          day: 1,
          title: "Introduction to Lists",
          description: "Learn about lists and their operations.",
          resources: [
            {
              title: "Lists Tutorial",
              url: getLanguageResourceUrl(language, "lists"),
              type: "tutorial"
            },
            {
              title: "Lists Documentation",
              url: getLanguageDocUrl(language, "list"),
              type: "documentation"
            },
            {
              title: "Working with Lists",
              url: getLanguageVideoUrl(language, "lists"),
              type: "video"
            },
            {
              title: "Practice: List Problems",
              url: getLanguagePracticeUrl(language, "lists"),
              type: "practice"
            }
          ]
        },
        {
          day: 2,
          title: "Introduction to Stacks",
          description: "Learn about stacks and their applications.",
          resources: [
            {
              title: "Stack Data Structure",
              url: "https://www.geeksforgeeks.org/stack-data-structure/",
              type: "tutorial"
            },
            {
              title: "Stack Implementation",
              url: getLanguageResourceUrl(language, "stack"),
              type: "documentation"
            },
            {
              title: "Stack Explained",
              url: "https://www.youtube.com/watch?v=F1F2imiOJfk",
              type: "video"
            },
            {
              title: "Implement a Stack",
              url: getLanguagePracticeUrl(language, "stack"),
              type: "practice"
            }
          ]
        },
        {
          day: 3,
          title: "Introduction to Queues",
          description: "Learn about queues and their applications.",
          resources: [
            {
              title: "Queue Data Structure",
              url: "https://www.geeksforgeeks.org/queue-data-structure/",
              type: "tutorial"
            },
            {
              title: "Queue Implementation",
              url: getLanguageResourceUrl(language, "queue"),
              type: "documentation"
            },
            {
              title: "Queue Explained",
              url: "https://www.youtube.com/watch?v=XuCbpw6Bj1U",
              type: "video"
            },
            {
              title: "Implement a Queue",
              url: getLanguagePracticeUrl(language, "queue"),
              type: "practice"
            }
          ]
        },
        {
          day: 4,
          title: "Simple Recursion",
          description: "Learn about recursion and its basic applications.",
          resources: [
            {
              title: "Recursion Basics",
              url: "https://www.geeksforgeeks.org/recursion/",
              type: "tutorial"
            },
            {
              title: "Recursion Examples",
              url: getLanguageResourceUrl(language, "recursion"),
              type: "documentation"
            },
            {
              title: "Recursion Explained",
              url: "https://www.youtube.com/watch?v=KEEKn7Me-ms",
              type: "video"
            },
            {
              title: "Practice: Recursion Problems",
              url: getLanguagePracticeUrl(language, "recursion"),
              type: "practice"
            }
          ]
        },
        {
          day: 5,
          title: "Review and Practice",
          description: "Review what you've learned and practice with problems.",
          resources: [
            {
              title: "Data Structures Review",
              url: "https://www.geeksforgeeks.org/data-structures/",
              type: "tutorial"
            },
            {
              title: "Basic DSA Cheat Sheet",
              url: "https://www.geeksforgeeks.org/complete-roadmap-to-learn-dsa-from-scratch/",
              type: "documentation"
            },
            {
              title: "DSA for Beginners",
              url: "https://www.youtube.com/watch?v=5_5oE5lgrhw",
              type: "video"
            },
            {
              title: "Practice: Mixed Problems",
              url: "https://www.hackerrank.com/domains/data-structures",
              type: "practice"
            }
          ]
        }
      ]
    },
    {
      week: 4,
      title: "Introduction to Algorithms",
      days: [
        {
          day: 1,
          title: "Algorithm Basics",
          description: "Learn what algorithms are and how to analyze them.",
          resources: [
            {
              title: "Introduction to Algorithms",
              url: "https://www.geeksforgeeks.org/introduction-to-algorithms/",
              type: "tutorial"
            },
            {
              title: "Algorithm Analysis",
              url: "https://www.khanacademy.org/computing/computer-science/algorithms",
              type: "documentation"
            },
            {
              title: "Algorithm Basics",
              url: "https://www.youtube.com/watch?v=0IAPZzGSbME",
              type: "video"
            },
            {
              title: "Algorithm Quiz",
              url: "https://www.geeksforgeeks.org/algorithms-gq/",
              type: "practice"
            }
          ]
        },
        {
          day: 2,
          title: "Binary Search",
          description: "Learn about binary search and its applications.",
          resources: [
            {
              title: "Binary Search Tutorial",
              url: "https://www.geeksforgeeks.org/binary-search/",
              type: "tutorial"
            },
            {
              title: "Binary Search Implementation",
              url: getLanguageResourceUrl(language, "binary-search"),
              type: "documentation"
            },
            {
              title: "Binary Search Explained",
              url: "https://www.youtube.com/watch?v=P3YID7liBug",
              type: "video"
            },
            {
              title: "Practice: Binary Search Problems",
              url: "https://leetcode.com/tag/binary-search/",
              type: "practice"
            }
          ]
        },
        {
          day: 3,
          title: "Selection and Insertion Sort",
          description: "Learn about selection and insertion sort algorithms.",
          resources: [
            {
              title: "Selection Sort Tutorial",
              url: "https://www.geeksforgeeks.org/selection-sort/",
              type: "tutorial"
            },
            {
              title: "Insertion Sort Tutorial",
              url: "https://www.geeksforgeeks.org/insertion-sort/",
              type: "documentation"
            },
            {
              title: "Selection and Insertion Sort Visualization",
              url: "https://www.youtube.com/watch?v=g-PGLbMth_g",
              type: "video"
            },
            {
              title: "Implement Sorting Algorithms",
              url: getLanguagePracticeUrl(language, "sorting"),
              type: "practice"
            }
          ]
        },
        {
          day: 4,
          title: "Basic Problem-Solving Techniques",
          description: "Learn strategies for solving algorithmic problems.",
          resources: [
            {
              title: "Problem-Solving Strategies",
              url: "https://www.geeksforgeeks.org/how-to-approach-a-coding-problem/",
              type: "tutorial"
            },
            {
              title: "Algorithm Design Techniques",
              url: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/",
              type: "documentation"
            },
            {
              title: "How to Solve Coding Problems",
              url: "https://www.youtube.com/watch?v=GKgAVjJxh9w",
              type: "video"
            },
            {
              title: "Practice: Easy Problems",
              url: "https://leetcode.com/problemset/all/?difficulty=Easy",
              type: "practice"
            }
          ]
        },
        {
          day: 5,
          title: "Final Project",
          description: "Apply everything you've learned in a project.",
          resources: [
            {
              title: "Simple Game Project",
              url: `https://www.geeksforgeeks.org/projects-${language}/`,
              type: "tutorial"
            },
            {
              title: "Project Ideas for Beginners",
              url: "https://github.com/karan/Projects",
              type: "documentation"
            },
            {
              title: "Building a Simple Game",
              url: getLanguageVideoUrl(language, "simple-game"),
              type: "video"
            },
            {
              title: "Number Guessing Game",
              url: `https://github.com/search?q=${language}+number+guessing+game`,
              type: "project"
            }
          ]
        }
      ]
    }
  ];
}
/**
 * Get beginner roadmap
 * @param {string} language - Programming language
 * @returns {Array} Roadmap data
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
          description: "Learn advanced array operations and string manipulation techniques.",
          resources: [
            {
              title: "Array Manipulation Techniques",
              url: getLanguageResourceUrl(language, "arrays-advanced"),
              type: "tutorial"
            },
            {
              title: "String Algorithms",
              url: getLanguageResourceUrl(language, "string-algorithms"),
              type: "documentation"
            },
            {
              title: "Advanced Array Operations",
              url: getLanguageVideoUrl(language, "arrays-advanced"),
              type: "video"
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
          description: "Learn about linked lists and their implementations.",
          resources: [
            {
              title: "Introduction to Linked Lists",
              url: "https://www.geeksforgeeks.org/linked-list-set-1-introduction/",
              type: "tutorial"
            },
            {
              title: "Linked List Implementation",
              url: getLanguageResourceUrl(language, "linked-list"),
              type: "documentation"
            },
            {
              title: "Linked Lists Explained",
              url: "https://www.youtube.com/watch?v=_jQhALI4ujg",
              type: "video"
            },
            {
              title: "Practice: Linked List Problems",
              url: "https://leetcode.com/tag/linked-list/",
              type: "practice"
            }
          ]
        },
        {
          day: 3,
          title: "Stacks and Queues",
          description: "Learn about stacks, queues, and their applications.",
          resources: [
            {
              title: "Stack Data Structure",
              url: "https://www.geeksforgeeks.org/stack-data-structure/",
              type: "tutorial"
            },
            {
              title: "Queue Data Structure",
              url: "https://www.geeksforgeeks.org/queue-data-structure/",
              type: "documentation"
            },
            {
              title: "Stacks and Queues Explained",
              url: "https://www.youtube.com/watch?v=wjI1WNcIntg",
              type: "video"
            },
            {
              title: "Practice: Stack and Queue Problems",
              url: "https://leetcode.com/tag/stack/",
              type: "practice"
            }
          ]
        },
        {
          day: 4,
          title: "Recursion Fundamentals",
          description: "Learn about recursion and how to solve problems recursively.",
          resources: [
            {
              title: "Recursion Tutorial",
              url: "https://www.geeksforgeeks.org/recursion/",
              type: "tutorial"
            },
            {
              title: "Recursion Examples",
              url: getLanguageResourceUrl(language, "recursion"),
              type: "documentation"
            },
            {
              title: "Recursion Explained",
              url: "https://www.youtube.com/watch?v=IJDJ0kBx2LM",
              type: "video"
            },
            {
              title: "Practice: Recursion Problems",
              url: "https://leetcode.com/tag/recursion/",
              type: "practice"
            }
          ]
        },
        {
          day: 5,
          title: "Time and Space Complexity",
          description: "Learn how to analyze algorithm efficiency.",
          resources: [
            {
              title: "Big O Notation",
              url: "https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/",
              type: "tutorial"
            },
            {
              title: "Time Complexity Analysis",
              url: "https://www.geeksforgeeks.org/time-complexity-and-space-complexity/",
              type: "documentation"
            },
            {
              title: "Understanding Big O",
              url: "https://www.youtube.com/watch?v=v4cd1O4zkGw",
              type: "video"
            },
            {
              title: "Complexity Analysis Quiz",
              url: "https://www.geeksforgeeks.org/quiz-corner/#Time%20Complexity%20Quiz",
              type: "practice"
            }
          ]
        }
      ]
    },
    {
      week: 2,
      title: "Basic Algorithms",
      days: [
        {
          day: 1,
          title: "Searching Algorithms",
          description: "Learn about linear and binary search algorithms.",
          resources: [
            {
              title: "Linear and Binary Search",
              url: "https://www.geeksforgeeks.org/searching-algorithms/",
              type: "tutorial"
            },
            {
              title: "Binary Search Implementation",
              url: getLanguageResourceUrl(language, "binary-search"),
              type: "documentation"
            },
            {
              title: "Binary Search Explained",
              url: "https://www.youtube.com/watch?v=P3YID7liBug",
              type: "video"
            },
            {
              title: "Practice: Searching Problems",
              url: "https://leetcode.com/tag/binary-search/",
              type: "practice"
            }
          ]
        },
        {
          day: 2,
          title: "Basic Sorting",
          description: "Learn about bubble, selection, and insertion sort algorithms.",
          resources: [
            {
              title: "Bubble, Selection, and Insertion Sort",
              url: "https://www.geeksforgeeks.org/sorting-algorithms/",
              type: "tutorial"
            },
            {
              title: "Sorting Algorithm Implementations",
              url: getLanguageResourceUrl(language, "sorting-algorithms"),
              type: "documentation"
            },
            {
              title: "Visualizing Sorting Algorithms",
              url: "https://www.youtube.com/watch?v=kPRA0W1kECg",
              type: "video"
            },
            {
              title: "Practice: Implement Sorting Algorithms",
              url: getLanguagePracticeUrl(language, "sorting"),
              type: "practice"
            }
          ]
        },
        {
          day: 3,
          title: "Introduction to Trees",
          description: "Learn about tree data structures and their applications.",
          resources: [
            {
              title: "Tree Data Structure",
              url: "https://www.geeksforgeeks.org/introduction-to-tree-data-structure/",
              type: "tutorial"
            },
            {
              title: "Binary Tree Implementation",
              url: getLanguageResourceUrl(language, "binary-tree"),
              type: "documentation"
            },
            {
              title: "Tree Data Structures Explained",
              url: "https://www.youtube.com/watch?v=oSWTXtMglKE",
              type: "video"
            },
            {
              title: "Practice: Tree Problems",
              url: "https://leetcode.com/tag/tree/",
              type: "practice"
            }
          ]
        },
        {
          day: 4,
          title: "Binary Search Trees",
          description: "Learn about binary search trees and their operations.",
          resources: [
            {
              title: "Binary Search Tree",
              url: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/",
              type: "tutorial"
            },
            {
              title: "BST Implementation",
              url: getLanguageResourceUrl(language, "binary-search-tree"),
              type: "documentation"
            },
            {
              title: "Binary Search Trees Explained",
              url: "https://www.youtube.com/watch?v=pYT9F8_LFTM",
              type: "video"
            },
            {
              title: "Practice: BST Problems",
              url: "https://leetcode.com/tag/binary-search-tree/",
              type: "practice"
            }
          ]
        },
        {
          day: 5,
          title: "Tree Traversals",
          description: "Learn about different ways to traverse trees.",
          resources: [
            {
              title: "Tree Traversal Algorithms",
              url: "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/",
              type: "tutorial"
            },
            {
              title: "Implementing Tree Traversals",
              url: getLanguageResourceUrl(language, "tree-traversal"),
              type: "documentation"
            },
            {
              title: "Tree Traversals Explained",
              url: "https://www.youtube.com/watch?v=9RHO6jU--GU",
              type: "video"
            },
            {
              title: "Practice: Tree Traversal Problems",
              url: "https://leetcode.com/tag/tree/",
              type: "practice"
            }
          ]
        }
      ]
    },
    {
      week: 3,
      title: "Intermediate Algorithms",
      days: [
        {
          day: 1,
          title: "Merge Sort",
          description: "Learn about the merge sort algorithm and its implementation.",
          resources: [
            {
              title: "Merge Sort Tutorial",
              url: "https://www.geeksforgeeks.org/merge-sort/",
              type: "tutorial"
            },
            {
              title: "Merge Sort Implementation",
              url: getLanguageResourceUrl(language, "merge-sort"),
              type: "documentation"
            },
            {
              title: "Merge Sort Explained",
              url: "https://www.youtube.com/watch?v=KF2j-9iSf4Q",
              type: "video"
            },
            {
              title: "Practice: Implement Merge Sort",
              url: getLanguagePracticeUrl(language, "merge-sort"),
              type: "practice"
            }
          ]
        },
        {
          day: 2,
          title: "Quick Sort",
          description: "Learn about the quick sort algorithm and its implementation.",
          resources: [
            {
              title: "Quick Sort Tutorial",
              url: "https://www.geeksforgeeks.org/quick-sort/",
              type: "tutorial"
            },
            {
              title: "Quick Sort Implementation",
              url: getLanguageResourceUrl(language, "quick-sort"),
              type: "documentation"
            },
            {
              title: "Quick Sort Explained",
              url: "https://www.youtube.com/watch?v=Hoixgm4-P4M",
              type: "video"
            },
            {
              title: "Practice: Implement Quick Sort",
              url: getLanguagePracticeUrl(language, "quick-sort"),
              type: "practice"
            }
          ]
        },
        {
          day: 3,
          title: "Hash Tables",
          description: "Learn about hash tables and their applications.",
          resources: [
            {
              title: "Hash Table Tutorial",
              url: "https://www.geeksforgeeks.org/hashing-data-structure/",
              type: "tutorial"
            },
            {
              title: "Hash Table Implementation",
              url: getLanguageResourceUrl(language, "hash-table"),
              type: "documentation"
            },
            {
              title: "Hash Tables Explained",
              url: "https://www.youtube.com/watch?v=shs0KM3wKv8",
              type: "video"
            },
            {
              title: "Practice: Hash Table Problems",
              url: "https://leetcode.com/tag/hash-table/",
              type: "practice"
            }
          ]
        },
        {
          day: 4,
          title: "Introduction to Graphs",
          description: "Learn about graph data structures and their representations.",
          resources: [
            {
              title: "Graph Data Structure",
              url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
              type: "tutorial"
            },
            {
              title: "Graph Representations",
              url: "https://www.geeksforgeeks.org/graph-and-its-representations/",
              type: "documentation"
            },
            {
              title: "Graphs Explained",
              url: "https://www.youtube.com/watch?v=gXgEDyodOJU",
              type: "video"
            },
            {
              title: "Practice: Graph Problems",
              url: "https://leetcode.com/tag/graph/",
              type: "practice"
            }
          ]
        },
        {
          day: 5,
          title: "Graph Traversals",
          description: "Learn about breadth-first search (BFS) and depth-first search (DFS).",
          resources: [
            {
              title: "BFS and DFS Tutorial",
              url: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/",
              type: "tutorial"
            },
            {
              title: "Implementing Graph Traversals",
              url: getLanguageResourceUrl(language, "graph-traversal"),
              type: "documentation"
            },
            {
              title: "BFS and DFS Explained",
              url: "https://www.youtube.com/watch?v=pcKY4hjDrxk",
              type: "video"
            },
            {
              title: "Practice: Graph Traversal Problems",
              url: "https://leetcode.com/tag/depth-first-search/",
              type: "practice"
            }
          ]
        }
      ]
    },
    {
      week: 4,
      title: "Advanced Topics",
      days: [
        {
          day: 1,
          title: "Introduction to Dynamic Programming",
          description: "Learn about dynamic programming and its applications.",
          resources: [
            {
              title: "Dynamic Programming Tutorial",
              url: "https://www.geeksforgeeks.org/dynamic-programming/",
              type: "tutorial"
            },
            {
              title: "DP Problem Patterns",
              url: "https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns",
              type: "documentation"
            },
            {
              title: "Dynamic Programming Explained",
              url: "https://www.youtube.com/watch?v=oBt53YbR9Kk",
              type: "video"
            },
            {
              title: "Practice: Simple DP Problems",
              url: "https://leetcode.com/tag/dynamic-programming/",
              type: "practice"
            }
          ]
        },
        {
          day: 2,
          title: "Greedy Algorithms",
          description: "Learn about greedy algorithms and their applications.",
          resources: [
            {
              title: "Greedy Algorithms Tutorial",
              url: "https://www.geeksforgeeks.org/greedy-algorithms/",
              type: "tutorial"
            },
            {
              title: "Greedy Algorithm Examples",
              url: "https://www.geeksforgeeks.org/greedy-algorithms-examples/",
              type: "documentation"
            },
            {
              title: "Greedy Algorithms Explained",
              url: "https://www.youtube.com/watch?v=HzeK7g8cD0Y",
              type: "video"
            },
            {
              title: "Practice: Greedy Algorithm Problems",
              url: "https://leetcode.com/tag/greedy/",
              type: "practice"
            }
          ]
        },
        {
          day: 3,
          title: "Divide and Conquer",
          description: "Learn about divide and conquer algorithms.",
          resources: [
            {
              title: "Divide and Conquer Tutorial",
              url: "https://www.geeksforgeeks.org/divide-and-conquer-algorithm-introduction/",
              type: "tutorial"
            },
            {
              title: "Divide and Conquer Examples",
              url: "https://www.geeksforgeeks.org/divide-and-conquer/",
              type: "documentation"
            },
            {
              title: "Divide and Conquer Explained",
              url: "https://www.youtube.com/watch?v=2Rr2tW9zvRg",
              type: "video"
            },
            {
              title: "Practice: Divide and Conquer Problems",
              url: "https://leetcode.com/tag/divide-and-conquer/",
              type: "practice"
            }
          ]
        },
        {
          day: 4,
          title: "Backtracking",
          description: "Learn about backtracking algorithms and their applications.",
          resources: [
            {
              title: "Backtracking Tutorial",
              url: "https://www.geeksforgeeks.org/backtracking-algorithms/",
              type: "tutorial"
            },
            {
              title: "Backtracking Examples",
              url: "https://www.geeksforgeeks.org/backtracking-introduction/",
              type: "documentation"
            },
            {
              title: "Backtracking Explained",
              url: "https://www.youtube.com/watch?v=DKCbsiDBN6c",
              type: "video"
            },
            {
              title: "Practice: Backtracking Problems",
              url: "https://leetcode.com/tag/backtracking/",
              type: "practice"
            }
          ]
        },
        {
          day: 5,
          title: "Final Project",
          description: "Apply what you've learned in a comprehensive project.",
          resources: [
            {
              title: "Data Structure Visualization",
              url: `https://github.com/search?q=${language}+data+structure+visualization`,
              type: "tutorial"
            },
            {
              title: "Project Ideas",
              url: "https://github.com/karan/Projects",
              type: "documentation"
            },
            {
              title: "Building a Project",
              url: getLanguageVideoUrl(language, "dsa-project"),
              type: "video"
            },
            {
              title: "Pathfinding Visualizer",
              url: `https://github.com/search?q=${language}+pathfinding+visualizer`,
              type: "project"
            }
          ]
        }
      ]
    }
  ];
}
/**
 * Get language-specific video URL
 * @param {string} language - Programming language
 * @param {string} topic - Topic
 * @returns {string} Video URL
 */
function getLanguageVideoUrl(language, topic) {
  return `https://www.youtube.com/results?search_query=${language}+${topic.replace(/-/g, '+')}`;
}

/**
 * Get language-specific practice URL
 * @param {string} language - Programming language
 * @param {string} topic - Topic
 * @returns {string} Practice URL
 */
function getLanguagePracticeUrl(language, topic) {
  return `https://leetcode.com/problemset/all/?search=${topic.replace(/-/g, '+')}&page=1`;
}

/**
 * Get language documentation URL
 * @param {string} language - Programming language
 * @param {string} topic - Topic
 * @returns {string} Documentation URL
 */
function getLanguageDocUrl(language, topic) {
  switch (language) {
    case 'java':
      return `https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/${topic}.html`;
    case 'python':
      return `https://docs.python.org/3/library/${topic}.html`;
    case 'javascript':
      return `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${capitalizeFirstLetter(topic)}`;
    case 'cpp':
      return `https://en.cppreference.com/w/cpp/container/${topic}`;
    case 'csharp':
      return `https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.${capitalizeFirstLetter(topic)}`;
    default:
      return `https://www.geeksforgeeks.org/${language}-${topic}/`;
  }
}

/**
 * Get language resource URL
 * @param {string} language - Programming language
 * @param {string} topic - Topic
 * @returns {string} Resource URL
 */
function getLanguageResourceUrl(language, topic) {
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
      return `https://www.geeksforgeeks.org/${language}-${topic}/`;
  }
}

/**
 * Get language basics URL
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
