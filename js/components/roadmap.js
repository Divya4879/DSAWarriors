/**
 * Roadmap component for displaying personalized learning path
 */

/**
 * Render the roadmap
 * @param {HTMLElement} container - The container to render the roadmap in
 * @param {Object} userProfile - User profile data
 * @param {Array} roadmapProgress - Roadmap progress data
 */
function renderRoadmap(container, userProfile, roadmapProgress) {
  // Render roadmap container
  container.innerHTML = `
    <div class="max-w-4xl mx-auto fade-in">
      <div class="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-2xl font-bold text-white mb-2">Your Learning Roadmap</h2>
            <p class="text-gray-300">Personalized for ${userProfile.name} - ${capitalizeFirstLetter(userProfile.level)} level in ${userProfile.language.charAt(0).toUpperCase() + userProfile.language.slice(1)}</p>
          </div>
          <div class="mt-4 md:mt-0">
            <span class="px-3 py-1 bg-primary-600 text-white text-sm rounded-full">
              ${calculateProgress(roadmapProgress)}% Complete
            </span>
          </div>
        </div>
      </div>
      
      <div id="roadmap-container" class="space-y-6">
        <!-- Roadmap weeks will be rendered here -->
      </div>
    </div>
  `;
  
  // Render roadmap weeks
  const roadmapContainer = document.getElementById('roadmap-container');
  if (roadmapContainer) {
    roadmapProgress.forEach((week, weekIndex) => {
      const weekElement = document.createElement('div');
      weekElement.className = 'bg-gray-800 rounded-lg shadow-md overflow-hidden';
      
      // Calculate week progress
      const totalDays = week.days.length;
      const completedDays = week.days.filter(day => day.completed).length;
      const weekProgress = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
      
      weekElement.innerHTML = `
        <div class="p-4 bg-gray-700 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 class="text-lg font-semibold text-white">Week ${week.week}: ${week.title}</h3>
            <p class="text-sm text-gray-300">${totalDays} days - ${weekProgress}% complete</p>
          </div>
          <button class="week-toggle mt-2 md:mt-0 text-gray-300 hover:text-white focus:outline-none" data-week="${weekIndex}">
            <svg class="w-5 h-5 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <div class="week-content p-4 hidden">
          <div class="space-y-4">
            ${week.days.map((day, dayIndex) => `
              <div class="day-item bg-gray-700 rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <input type="checkbox" id="day-${weekIndex}-${dayIndex}" class="day-checkbox h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600 rounded" 
                      data-week="${weekIndex}" data-day="${dayIndex}" ${day.completed ? 'checked' : ''}>
                    <label for="day-${weekIndex}-${dayIndex}" class="ml-2 text-white font-medium">
                      Day ${day.day}: ${day.title}
                    </label>
                  </div>
                  <span class="text-xs px-2 py-1 rounded-full ${day.completed ? 'bg-green-800 text-green-200' : 'bg-gray-600 text-gray-300'}">
                    ${day.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                
                <p class="text-gray-300 text-sm mb-3">${day.description || ''}</p>
                
                <div class="space-y-2">
                  ${day.resources.map((resource, resourceIndex) => `
                    <div class="flex items-center justify-between bg-gray-800 rounded p-3">
                      <div class="flex items-center">
                        <input type="checkbox" id="resource-${weekIndex}-${dayIndex}-${resourceIndex}" 
                          class="resource-checkbox h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600 rounded"
                          data-week="${weekIndex}" data-day="${dayIndex}" data-resource="${resourceIndex}" ${resource.completed ? 'checked' : ''}>
                        <label for="resource-${weekIndex}-${dayIndex}-${resourceIndex}" class="ml-2 text-gray-300">
                          ${resource.title}
                        </label>
                      </div>
                      <div class="flex items-center">
                        <span class="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300 mr-2">
                          ${resource.type}
                        </span>
                        <a href="${resource.url}" target="_blank" rel="noopener" class="text-primary-400 hover:text-primary-300">
                          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      
      roadmapContainer.appendChild(weekElement);
    });
    
    // Add event listeners for week toggles
    document.querySelectorAll('.week-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const weekIndex = toggle.getAttribute('data-week');
        const weekContent = toggle.closest('.bg-gray-800').querySelector('.week-content');
        const icon = toggle.querySelector('svg');
        
        weekContent.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
      });
    });
    
    // Add event listeners for day checkboxes
    document.querySelectorAll('.day-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const weekIndex = parseInt(checkbox.getAttribute('data-week'));
        const dayIndex = parseInt(checkbox.getAttribute('data-day'));
        
        // Update roadmap progress
        roadmapProgress[weekIndex].days[dayIndex].completed = checkbox.checked;
        
        // If day is marked as completed, mark all resources as completed
        if (checkbox.checked) {
          roadmapProgress[weekIndex].days[dayIndex].resources.forEach((resource, resourceIndex) => {
            resource.completed = true;
            const resourceCheckbox = document.getElementById(`resource-${weekIndex}-${dayIndex}-${resourceIndex}`);
            if (resourceCheckbox) {
              resourceCheckbox.checked = true;
            }
          });
        }
        
        // Save updated roadmap progress
        Storage.save(Storage.KEYS.ROADMAP_PROGRESS, roadmapProgress);
        
        // Update UI
        const dayItem = checkbox.closest('.day-item');
        const statusBadge = dayItem.querySelector('.rounded-full');
        
        if (checkbox.checked) {
          statusBadge.classList.remove('bg-gray-600', 'text-gray-300');
          statusBadge.classList.add('bg-green-800', 'text-green-200');
          statusBadge.textContent = 'Completed';
        } else {
          statusBadge.classList.remove('bg-green-800', 'text-green-200');
          statusBadge.classList.add('bg-gray-600', 'text-gray-300');
          statusBadge.textContent = 'Pending';
        }
        
        // Update week progress
        const weekElement = checkbox.closest('.bg-gray-800');
        const weekProgressText = weekElement.querySelector('.text-sm.text-gray-300');
        const totalDays = roadmapProgress[weekIndex].days.length;
        const completedDays = roadmapProgress[weekIndex].days.filter(day => day.completed).length;
        const weekProgress = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
        
        weekProgressText.textContent = `${totalDays} days - ${weekProgress}% complete`;
        
        // Update overall progress
        const overallProgressBadge = document.querySelector('.bg-primary-600.text-white.text-sm.rounded-full');
        if (overallProgressBadge) {
          overallProgressBadge.textContent = `${calculateProgress(roadmapProgress)}% Complete`;
        }
      });
    });
    
    // Add event listeners for resource checkboxes
    document.querySelectorAll('.resource-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const weekIndex = parseInt(checkbox.getAttribute('data-week'));
        const dayIndex = parseInt(checkbox.getAttribute('data-day'));
        const resourceIndex = parseInt(checkbox.getAttribute('data-resource'));
        
        // Update roadmap progress
        roadmapProgress[weekIndex].days[dayIndex].resources[resourceIndex].completed = checkbox.checked;
        
        // Check if all resources for the day are completed
        const allResourcesCompleted = roadmapProgress[weekIndex].days[dayIndex].resources.every(resource => resource.completed);
        
        // Update day completion status if all resources are completed
        if (allResourcesCompleted) {
          roadmapProgress[weekIndex].days[dayIndex].completed = true;
          const dayCheckbox = document.getElementById(`day-${weekIndex}-${dayIndex}`);
          if (dayCheckbox) {
            dayCheckbox.checked = true;
            
            // Update day status badge
            const dayItem = dayCheckbox.closest('.day-item');
            const statusBadge = dayItem.querySelector('.rounded-full');
            
            statusBadge.classList.remove('bg-gray-600', 'text-gray-300');
            statusBadge.classList.add('bg-green-800', 'text-green-200');
            statusBadge.textContent = 'Completed';
          }
        }
        
        // Save updated roadmap progress
        Storage.save(Storage.KEYS.ROADMAP_PROGRESS, roadmapProgress);
        
        // Update week progress
        const weekElement = checkbox.closest('.bg-gray-800');
        const weekProgressText = weekElement.querySelector('.text-sm.text-gray-300');
        const totalDays = roadmapProgress[weekIndex].days.length;
        const completedDays = roadmapProgress[weekIndex].days.filter(day => day.completed).length;
        const weekProgress = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
        
        weekProgressText.textContent = `${totalDays} days - ${weekProgress}% complete`;
        
        // Update overall progress
        const overallProgressBadge = document.querySelector('.bg-primary-600.text-white.text-sm.rounded-full');
        if (overallProgressBadge) {
          overallProgressBadge.textContent = `${calculateProgress(roadmapProgress)}% Complete`;
        }
      });
    });
    
    // Expand the first week by default
    const firstWeekToggle = document.querySelector('.week-toggle');
    if (firstWeekToggle) {
      firstWeekToggle.click();
    }
  }
}

/**
 * Calculate overall roadmap progress
 * @param {Array} roadmapProgress - Roadmap progress data
 * @returns {number} Progress percentage
 */
function calculateProgress(roadmapProgress) {
  let totalResources = 0;
  let completedResources = 0;
  
  roadmapProgress.forEach(week => {
    week.days.forEach(day => {
      totalResources += day.resources.length;
      completedResources += day.resources.filter(resource => resource.completed).length;
    });
  });
  
  return totalResources > 0 ? Math.round((completedResources / totalResources) * 100) : 0;
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
