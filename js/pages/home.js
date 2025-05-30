/**
 * Home page component
 */

/**
 * Render the home page
 * @param {HTMLElement} container - The container to render the home page in
 */
function renderHomePage(container) {
  const userProfile = Storage.get(Storage.KEYS.USER_PROFILE);
  
  container.innerHTML = `
    <div class="max-w-4xl mx-auto fade-in">
      <div class="bg-gray-800 rounded-lg shadow-md p-8 mb-8">
        <h1 class="text-3xl font-bold text-white mb-4">DSA Learning Roadmap</h1>
        <p class="text-xl text-gray-300 mb-6">A personalized guide to mastering Data Structures and Algorithms</p>
        
        ${userProfile ? `
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-300 mb-2">Welcome back, <span class="font-semibold text-white">${userProfile.name}</span>!</p>
              <p class="text-gray-400">Your current level: <span class="text-primary-400 font-medium">${capitalizeFirstLetter(userProfile.level)}</span></p>
            </div>
            <a href="#/roadmap" class="bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition">
              Continue Learning
            </a>
          </div>
        ` : `
          <div class="flex items-center justify-between">
            <p class="text-gray-300">Get started with your personalized DSA learning journey</p>
            <a href="#/assessment" class="bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition">
              Start Assessment
            </a>
          </div>
        `}
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-white mb-3">Features</h2>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Skill assessment with 10 MCQ questions</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Personalized 30-day learning roadmap</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Curated free learning resources</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Progress tracking and bookmarking</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-white mb-3">Supported Languages</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center">
              <span class="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-md mr-3">
                <svg class="w-5 h-5 text-blue-600" viewBox="0 0 128 128">
                  <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"></path><path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"></path><path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"></path><path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.866 28.42 81.722 22.195 76.491 1.587z"></path><path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"></path>
                </svg>
              </span>
              <span class="text-gray-300">Java</span>
            </div>
            <div class="flex items-center">
              <span class="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-md mr-3">
                <svg class="w-5 h-5 text-blue-600" viewBox="0 0 128 128">
                  <path fill="#FFD845" d="M49.33 62h29.159C86.606 62 93 55.132 93 46.981V19.183c0-7.912-6.632-13.856-14.555-15.176-5.014-.835-10.195-1.215-15.187-1.191-4.99.023-9.612.448-13.805 1.191C37.098 6.188 35 10.758 35 19.183V30h29v4H23.776c-8.484 0-15.914 5.108-18.237 14.811-2.681 11.12-2.8 17.919 0 29.53C7.614 86.983 12.569 93 21.054 93H31V79.952C31 70.315 39.428 62 49.33 62zm-1.838-39.11c-3.026 0-5.478-2.479-5.478-5.545 0-3.079 2.451-5.581 5.478-5.581 3.015 0 5.479 2.502 5.479 5.581-.001 3.066-2.465 5.545-5.479 5.545zm74.789 25.921C120.183 40.363 116.178 34 107.682 34H97v12.981C97 57.031 88.206 65 78.489 65H49.33C41.342 65 35 72.326 35 80.326v27.8c0 7.91 6.745 12.564 14.462 14.834 9.242 2.717 17.994 3.208 29.051 0C85.862 120.067 93 116.072 93 108.126V97H64v-4h43.682c8.484 0 11.647-5.776 14.599-14.66 3.047-9.145 2.916-17.799 0-29.529zm-41.955 55.606c3.027 0 5.479 2.479 5.479 5.547 0 3.076-2.451 5.579-5.479 5.579-3.015 0-5.478-2.502-5.478-5.579 0-3.068 2.463-5.547 5.478-5.547z"></path>
                </svg>
              </span>
              <span class="text-gray-300">Python</span>
            </div>
            <div class="flex items-center">
              <span class="w-8 h-8 flex items-center justify-center bg-yellow-100 rounded-md mr-3">
                <svg class="w-5 h-5 text-yellow-600" viewBox="0 0 128 128">
                  <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"></path><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"></path>
                </svg>
              </span>
              <span class="text-gray-300">JavaScript</span>
            </div>
            <div class="flex items-center">
              <span class="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-md mr-3">
                <svg class="w-5 h-5 text-blue-600" viewBox="0 0 128 128">
                  <path fill="#659AD3" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"></path><path fill="#03599C" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"></path><path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z"></path>
                </svg>
              </span>
              <span class="text-gray-300">C++</span>
            </div>
            <div class="flex items-center">
              <span class="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-md mr-3">
                <svg class="w-5 h-5 text-purple-600" viewBox="0 0 128 128">
                  <path fill="#68217A" d="M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"></path><path fill="#68217A" d="M102.1 61.3c0 1.1-.2 2.4-1 3.5l-48.3 28.1c-.8.5-1.9.7-3.1.7-1.2 0-2.3-.3-3.1-.7l-48-27.9c-1.7-1-2.9-3.5-2.9-5.4v-55.7c0-.9.1-1.9.6-2.8l106.8 62c0 1.1-.2 2.4-1 3.5z"></path><path fill="#fff" d="M85.3 76.1c-4.2 7.4-12.2 12.4-21.3 12.4-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z"></path>
                </svg>
              </span>
              <span class="text-gray-300">C#</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-white mb-4">How It Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex flex-col items-center text-center">
            <div class="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center mb-3">
              <span class="text-white font-bold">1</span>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Take the Assessment</h3>
            <p class="text-gray-300">Complete a 10-question assessment to determine your current skill level</p>
          </div>
          <div class="flex flex-col items-center text-center">
            <div class="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center mb-3">
              <span class="text-white font-bold">2</span>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Get Your Roadmap</h3>
            <p class="text-gray-300">Receive a personalized learning path based on your current level</p>
          </div>
          <div class="flex flex-col items-center text-center">
            <div class="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center mb-3">
              <span class="text-white font-bold">3</span>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">Track Your Progress</h3>
            <p class="text-gray-300">Follow your roadmap and mark your progress as you learn</p>
          </div>
        </div>
      </div>
    </div>
  `;
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
