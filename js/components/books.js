/**
 * Books component for displaying recommended programming and DSA books
 */

/**
 * Render the books page
 * @param {HTMLElement} container - The container to render the books in
 */
function renderBooks(container) {
  // Get user profile for language preference
  const userProfile = Storage.get(Storage.KEYS.USER_PROFILE, { language: 'javascript' });
  const language = userProfile.language || 'javascript';
  
  // Get bookmarked books
  const bookmarkedBooks = Storage.get(Storage.KEYS.BOOKMARKED_BOOKS, []);
  
  // Render books container
  container.innerHTML = `
    <div class="max-w-4xl mx-auto fade-in">
      <div class="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-2xl font-bold text-white mb-2">Recommended Books</h2>
        <p class="text-gray-300">Free and high-quality books to master DSA and programming</p>
      </div>
      
      <div class="mb-6">
        <div class="flex flex-wrap gap-2 mb-4">
          <button class="book-filter-btn bg-primary-600 text-white px-4 py-2 rounded-md text-sm" data-filter="all">
            All Books
          </button>
          <button class="book-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="algorithms">
            Algorithms
          </button>
          <button class="book-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="data-structures">
            Data Structures
          </button>
          <button class="book-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="language-specific">
            Language Specific
          </button>
          <button class="book-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="system-design">
            System Design
          </button>
          <button class="book-filter-btn bg-gray-700 text-white px-4 py-2 rounded-md text-sm shadow-sm" data-filter="bookmarked">
            Bookmarked
          </button>
        </div>
        
        <div class="relative">
          <input type="text" id="book-search" placeholder="Search books..." 
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-white">
          <svg class="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div id="books-container" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Books will be rendered here -->
      </div>
    </div>
  `;
  
  // Get books
  const books = getAllBooks();
  
  // Render books
  renderBooksList(books, bookmarkedBooks);
  
  // Add event listeners for filter buttons
  document.querySelectorAll('.book-filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      document.querySelectorAll('.book-filter-btn').forEach(btn => {
        btn.classList.remove('bg-primary-600');
        btn.classList.add('bg-gray-700');
      });
      button.classList.remove('bg-gray-700');
      button.classList.add('bg-primary-600');
      
      // Filter books
      const filter = button.getAttribute('data-filter');
      filterBooks(books, filter, bookmarkedBooks);
    });
  });
  
  // Add event listener for search
  const searchInput = document.getElementById('book-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const activeFilter = document.querySelector('.book-filter-btn.bg-primary-600').getAttribute('data-filter');
      
      filterBooks(books, activeFilter, bookmarkedBooks, searchTerm);
    });
  }
}

/**
 * Render the books list
 * @param {Array} books - List of books
 * @param {Array} bookmarkedBooks - List of bookmarked book IDs
 * @param {string} searchTerm - Optional search term
 */
function renderBooksList(books, bookmarkedBooks, searchTerm = '') {
  const booksContainer = document.getElementById('books-container');
  if (!booksContainer) return;
  
  // Filter books by search term if provided
  let filteredBooks = books;
  if (searchTerm) {
    filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) || 
      book.author.toLowerCase().includes(searchTerm) ||
      book.description.toLowerCase().includes(searchTerm) ||
      book.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  // Clear container
  booksContainer.innerHTML = '';
  
  if (filteredBooks.length === 0) {
    booksContainer.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-gray-400">No books found matching your criteria.</p>
      </div>
    `;
    return;
  }
  
  // Render each book
  filteredBooks.forEach(book => {
    const isBookmarked = bookmarkedBooks.includes(book.id);
    
    const bookCard = document.createElement('div');
    bookCard.className = 'elegant-card overflow-hidden slide-up';
    bookCard.setAttribute('data-book-id', book.id);
    bookCard.setAttribute('data-book-category', book.category);
    
    bookCard.innerHTML = `
      <div class="flex h-full">
        <div class="w-1/3 bg-gray-700 p-4 flex items-center justify-center">
          <img src="${book.coverImage}" alt="${book.title}" class="max-h-48 object-contain">
        </div>
        <div class="w-2/3 p-5">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-semibold text-white">${book.title}</h3>
            <button class="bookmark-book-btn text-gray-400 hover:text-yellow-500 focus:outline-none transition" data-book-id="${book.id}">
              <svg class="w-5 h-5 ${isBookmarked ? 'text-yellow-500 fill-current' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
          
          <p class="text-sm text-gray-400 mb-2">by ${book.author}</p>
          
          <p class="text-gray-300 text-sm mb-3 line-clamp-3">${book.description}</p>
          
          <div class="flex flex-wrap gap-1 mb-3">
            ${book.tags.map(tag => `
              <span class="tag tag-primary">
                ${tag}
              </span>
            `).join('')}
          </div>
          
          <div class="flex justify-between items-center mt-auto">
            <span class="text-xs text-gray-400">${book.format} • ${book.pages} pages</span>
            
            <a href="${book.url}" target="_blank" rel="noopener" 
              class="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm">
              Read Book
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;
    
    booksContainer.appendChild(bookCard);
  });
  
  // Add event listeners for bookmark buttons
  document.querySelectorAll('.bookmark-book-btn').forEach(button => {
    button.addEventListener('click', () => {
      const bookId = button.getAttribute('data-book-id');
      toggleBookBookmark(bookId);
    });
  });
}

/**
 * Filter books by category
 * @param {Array} books - List of books
 * @param {string} filter - Filter category
 * @param {Array} bookmarkedBooks - List of bookmarked book IDs
 * @param {string} searchTerm - Optional search term
 */
function filterBooks(books, filter, bookmarkedBooks, searchTerm = '') {
  let filteredBooks = books;
  
  // Apply category filter
  if (filter !== 'all') {
    if (filter === 'bookmarked') {
      filteredBooks = books.filter(book => bookmarkedBooks.includes(book.id));
    } else {
      filteredBooks = books.filter(book => book.category === filter);
    }
  }
  
  // Apply search filter if provided
  if (searchTerm) {
    filteredBooks = filteredBooks.filter(book => 
      book.title.toLowerCase().includes(searchTerm) || 
      book.author.toLowerCase().includes(searchTerm) ||
      book.description.toLowerCase().includes(searchTerm) ||
      book.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  // Render filtered books
  renderBooksList(filteredBooks, bookmarkedBooks);
}

/**
 * Toggle bookmark status for a book
 * @param {string} bookId - Book ID
 */
function toggleBookBookmark(bookId) {
  // Get current bookmarks
  const bookmarkedBooks = Storage.get(Storage.KEYS.BOOKMARKED_BOOKS, []);
  
  // Toggle bookmark
  const isBookmarked = bookmarkedBooks.includes(bookId);
  let updatedBookmarks;
  
  if (isBookmarked) {
    updatedBookmarks = bookmarkedBooks.filter(id => id !== bookId);
  } else {
    updatedBookmarks = [...bookmarkedBooks, bookId];
  }
  
  // Save updated bookmarks
  Storage.save(Storage.KEYS.BOOKMARKED_BOOKS, updatedBookmarks);
  
  // Update UI
  const bookmarkBtn = document.querySelector(`.bookmark-book-btn[data-book-id="${bookId}"] svg`);
  if (bookmarkBtn) {
    if (isBookmarked) {
      bookmarkBtn.classList.remove('text-yellow-500', 'fill-current');
    } else {
      bookmarkBtn.classList.add('text-yellow-500', 'fill-current');
    }
  }
}

/**
 * Get all books
 * @returns {Array} List of books
 */
function getAllBooks() {
  return [
    // Community-Driven Repositories
    {
      id: 'book-1',
      title: 'GitHub – Free Programming Books',
      author: 'EbookFoundation',
      description: 'A crowd-maintained repository of over 9,000 free programming and tech books in multiple formats (PDF/EPUB/HTML), covering languages, frameworks, system design, DevOps, ML, and interview prep. Updated daily by contributors worldwide.',
      category: 'algorithms',
      tags: ['Open Source', 'Multiple Languages', 'Comprehensive'],
      url: 'https://github.com/EbookFoundation/free-programming-books',
      coverImage: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      format: 'Multiple',
      pages: 9000
    },
    {
      id: 'book-2',
      title: 'FreeComputerBooks.com',
      author: 'Various Authors',
      description: 'A comprehensive directory linking to free eBooks and lecture notes across programming, algorithms, AI, networks, embedded systems, and more. Organized by category and regularly refreshed.',
      category: 'data-structures',
      tags: ['Directory', 'Multiple Topics', 'Free Resources'],
      url: 'https://freecomputerbooks.com/',
      coverImage: 'https://freecomputerbooks.com/images/fcb88x31.gif',
      format: 'Multiple',
      pages: 1000
    },
    {
      id: 'book-3',
      title: 'Free Programming Books Collection',
      author: 'Rafiquzzaman420',
      description: 'An alternative GitHub collection with curated lists of free books for Java, Python, Go, Ruby, C/C++, web development, security, and more—each category linking to reputable sources.',
      category: 'language-specific',
      tags: ['GitHub', 'Multiple Languages', 'Curated'],
      url: 'https://github.com/Rafiquzzaman420/Free-Programming-Books',
      coverImage: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      format: 'Multiple',
      pages: 500
    },
    {
      id: 'book-4',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
      description: 'A comprehensive introduction to algorithms. Covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers.',
      category: 'algorithms',
      tags: ['Algorithms', 'Computer Science', 'CLRS'],
      url: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/readings/',
      coverImage: 'https://mitpress.mit.edu/sites/default/files/styles/large_book_cover/http/mitp-content-server.mit.edu%3A18180/books/covers/cover/%3Fcollid%3Dbooks_covers_0%26isbn%3D9780262033848%26type%3D.jpg',
      format: 'PDF',
      pages: 1312
    },
    
    {
      id: 'book-5',
      title: 'Algorithms, 4th Edition',
      author: 'Robert Sedgewick, Kevin Wayne',
      description: 'This book surveys the most important algorithms and data structures in use today. Applications to science, engineering, and industry are a key feature of the text.',
      category: 'algorithms',
      tags: ['Algorithms', 'Java', 'Data Structures'],
      url: 'https://algs4.cs.princeton.edu/home/',
      coverImage: 'https://algs4.cs.princeton.edu/cover.png',
      format: 'Online',
      pages: 976
    },
    {
      id: 'book-6',
      title: 'The Algorithm Design Manual',
      author: 'Steven S. Skiena',
      description: 'This book provides a comprehensive introduction to the modern study of computer algorithms. It presents many algorithms and covers them in considerable depth.',
      category: 'algorithms',
      tags: ['Algorithm Design', 'Problem Solving', 'Data Structures'],
      url: 'https://www.algorist.com/',
      coverImage: 'https://images.springer.com/sgw/books/medium/9781848000698.jpg',
      format: 'PDF',
      pages: 730
    },
    {
      id: 'book-7',
      title: 'Cracking the Coding Interview',
      author: 'Gayle Laakmann McDowell',
      description: 'A comprehensive book that helps you prepare for coding interviews. It contains 189 programming interview questions and solutions.',
      category: 'algorithms',
      tags: ['Interviews', 'Problem Solving', 'Career'],
      url: 'https://www.crackingthecodinginterview.com/',
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/41oYsXjLvZL._SX348_BO1,204,203,200_.jpg',
      format: 'PDF',
      pages: 708
    },
    {
      id: 'book-8',
      title: 'Grokking Algorithms',
      author: 'Aditya Bhargava',
      description: 'An illustrated guide for programmers and other curious people. It teaches you how to apply common algorithms to practical problems.',
      category: 'algorithms',
      tags: ['Algorithms', 'Illustrated', 'Beginner Friendly'],
      url: 'https://www.manning.com/books/grokking-algorithms',
      coverImage: 'https://images.manning.com/book/3/0b325da-eb26-4e50-8a2a-46042c647083/Bhargava-GA-HI.png',
      format: 'PDF',
      pages: 256
    },
    {
      id: 'book-9',
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      description: 'This book examines the key principles, algorithms, and trade-offs of data systems, and shows how to build data-intensive applications.',
      category: 'system-design',
      tags: ['System Design', 'Distributed Systems', 'Data Storage'],
      url: 'https://dataintensive.net/',
      coverImage: 'https://dataintensive.net/images/book-cover.png',
      format: 'PDF',
      pages: 624
    },
    {
      id: 'book-10',
      title: 'System Design Interview – An Insider\'s Guide',
      author: 'Alex Xu',
      description: 'A comprehensive guide to preparing for system design interviews. It covers the systematic approach to solving system design problems.',
      category: 'system-design',
      tags: ['System Design', 'Interviews', 'Architecture'],
      url: 'https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF',
      coverImage: 'https://m.media-amazon.com/images/I/41xedMOGmUL._SX398_BO1,204,203,200_.jpg',
      format: 'PDF',
      pages: 322
    },
    {
      id: 'book-11',
      title: 'Eloquent JavaScript',
      author: 'Marijn Haverbeke',
      description: 'A modern introduction to programming with JavaScript. It teaches the essential elements of programming, including syntax, control, and data structures.',
      category: 'language-specific',
      tags: ['JavaScript', 'Web Development', 'Programming'],
      url: 'https://eloquentjavascript.net/',
      coverImage: 'https://eloquentjavascript.net/img/cover.jpg',
      format: 'Online',
      pages: 472
    },
    {
      id: 'book-12',
      title: 'Python Data Science Handbook',
      author: 'Jake VanderPlas',
      description: 'This book provides a comprehensive introduction to the scientific Python ecosystem, covering NumPy, Pandas, Matplotlib, and machine learning.',
      category: 'language-specific',
      tags: ['Python', 'Data Science', 'Machine Learning'],
      url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
      coverImage: 'https://jakevdp.github.io/PythonDataScienceHandbook/figures/PDSH-cover.png',
      format: 'Online',
      pages: 548
    },
    {
      id: 'book-13',
      title: 'The Rust Programming Language',
      author: 'Steve Klabnik, Carol Nichols',
      description: 'The official book on the Rust programming language, written by the Rust team. It teaches concepts like ownership, borrowing, and lifetimes.',
      category: 'language-specific',
      tags: ['Rust', 'Systems Programming', 'Memory Safety'],
      url: 'https://doc.rust-lang.org/book/',
      coverImage: 'https://doc.rust-lang.org/book/img/ferris/not_desired_behavior.svg',
      format: 'Online',
      pages: 560
    },
    {
      id: 'book-14',
      title: 'Mastering Ethereum',
      author: 'Andreas M. Antonopoulos, Gavin Wood',
      description: 'A comprehensive guide to the Ethereum blockchain platform. It covers smart contracts, DApps, and the Solidity programming language.',
      category: 'language-specific',
      tags: ['Ethereum', 'Blockchain', 'Solidity', 'Smart Contracts'],
      url: 'https://github.com/ethereumbook/ethereumbook',
      coverImage: 'https://raw.githubusercontent.com/ethereumbook/ethereumbook/develop/images/cover.png',
      format: 'Online',
      pages: 423
    },
    {
      id: 'book-15',
      title: 'Open Data Structures',
      author: 'Pat Morin',
      description: 'An open content textbook that teaches the design and analysis of data structures. It covers arrays, linked lists, trees, and graphs.',
      category: 'data-structures',
      tags: ['Data Structures', 'Algorithms', 'Computer Science'],
      url: 'https://opendatastructures.org/',
      coverImage: 'https://opendatastructures.org/ods-java/img1.png',
      format: 'Online',
      pages: 336
    },
    {
      id: 'book-16',
      title: 'Think Data Structures',
      author: 'Allen B. Downey',
      description: 'This book teaches fundamental data structures and algorithms using Java. It emphasizes practical implementation and analysis.',
      category: 'data-structures',
      tags: ['Data Structures', 'Java', 'Algorithms'],
      url: 'https://greenteapress.com/wp/think-data-structures/',
      coverImage: 'https://greenteapress.com/thinkapjava/think-data-structures-2016-01-17.png',
      format: 'PDF',
      pages: 182
    },
    {
      id: 'book-17',
      title: 'Problem Solving with Algorithms and Data Structures using Python',
      author: 'Bradley N. Miller, David L. Ranum',
      description: 'This book focuses on fundamental abstract concepts of computer science as well as the Python programming language.',
      category: 'data-structures',
      tags: ['Python', 'Data Structures', 'Algorithms'],
      url: 'https://runestone.academy/runestone/books/published/pythonds/index.html',
      coverImage: 'https://runestone.academy/runestone/static/pythonds/_images/PythonDScover.jpg',
      format: 'Online',
      pages: 438
    },
    {
      id: 'book-18',
      title: 'Docker Deep Dive',
      author: 'Nigel Poulton',
      description: 'A comprehensive guide to Docker that covers everything from the basics to advanced topics like orchestration and security.',
      category: 'language-specific',
      tags: ['Docker', 'Containers', 'DevOps'],
      url: 'https://www.amazon.com/Docker-Deep-Dive-Nigel-Poulton/dp/1521822808',
      coverImage: 'https://m.media-amazon.com/images/I/41SzsmJa5-L._SX404_BO1,204,203,200_.jpg',
      format: 'PDF',
      pages: 354
    },
     // Publisher-Sponsored Free Series
    {
      id: 'book-19',
      title: 'Syncfusion Succinctly Series',
      author: 'Various Authors',
      description: 'Over 200 concise, peer-reviewed eBooks (≈100 pages each) on modern programming, data visualization, cloud, and data science—released monthly and available free in PDF and online-reader formats.',
      category: 'language-specific',
      tags: ['Multiple Topics', 'Concise', 'Free Series'],
      url: 'https://www.syncfusion.com/succinctly-free-ebooks',
      coverImage: 'https://cdn.syncfusion.com/content/images/downloads/ebooks/ebooks-landing.png',
      format: 'PDF',
      pages: 20000
    },
    {
      id: 'book-20',
      title: 'Think Python, 2nd Edition',
      author: 'Allen B. Downey',
      description: 'Freely available under Creative Commons, providing an in-depth introduction to Python with examples and exercises.',
      category: 'language-specific',
      tags: ['Python', 'Programming', 'Beginner Friendly'],
      url: 'https://greenteapress.com/wp/think-python-2e/',
      coverImage: 'https://greenteapress.com/wp/wp-content/uploads/2016/07/think_python2_medium.jpg',
      format: 'PDF',
      pages: 292
    },
    {
      id: 'book-21',
      title: 'Apress Open Access',
      author: 'Various Authors',
      description: 'Apress publishes select titles under open-access licenses, offering free online versions of professional-grade programming and architecture books, with the same editorial quality as their paid catalog.',
      category: 'system-design',
      tags: ['Open Access', 'Professional', 'Multiple Topics'],
      url: 'https://www.apress.com/gp/apress-open',
      coverImage: 'https://media.springernature.com/w306/springer-static/cover-hires/book/978-1-4842-5654-6',
      format: 'PDF',
      pages: 5000
    },
    {
      id: 'book-22',
      title: 'Bookboon – IT & Programming E-Books',
      author: 'Various Authors',
      description: 'Free-to-download eBooks on Java, C#, Python, algorithms, and IT management—designed for students and professionals, no credit card required.',
      category: 'language-specific',
      tags: ['Multiple Languages', 'IT Management', 'Free Download'],
      url: 'https://bookboon.com/en/it-programming-ebooks',
      coverImage: 'https://bookboon.com/favicon/android-chrome-192x192.png',
      format: 'PDF',
      pages: 3000
    },
    // Open-Education Textbooks
    {
      id: 'book-23',
      title: 'OpenStax Computer Science',
      author: 'OpenStax Contributors',
      description: 'A suite of peer-reviewed, openly licensed textbooks (e.g., Introduction to Computer Science, Principles of Data Science, Introduction to Python Programming), available free online with optional PDF downloads.',
      category: 'algorithms',
      tags: ['Textbooks', 'Computer Science', 'Open Education'],
      url: 'https://openstax.org/subjects/computer-science',
      coverImage: 'https://openstax.org/apps/archive/20210530.174253/resources/4d50234fc3e0922753614e7644dfc84ccde9500e',
      format: 'Online/PDF',
      pages: 1500
    },
    {
      id: 'book-24',
      title: 'Open Textbook Library (University of Minnesota)',
      author: 'Various Authors',
      description: 'A searchable library of open-access textbooks in computer science, algorithms, and software engineering—each resource peer reviewed and free to use and adapt.',
      category: 'data-structures',
      tags: ['Textbooks', 'Open Access', 'University'],
      url: 'https://open.umn.edu/opentextbooks/subjects/computer-science-information-systems',
      coverImage: 'https://open.umn.edu/themes/custom/open/logo.svg',
      format: 'Multiple',
      pages: 4000
    },
    {
      id: 'book-25',
      title: 'LibreTexts – Computing',
      author: 'LibreTexts Contributors',
      description: 'An extensive collection of openly licensed textbooks and modules on programming, data science, cybersecurity, and more, maintained by a consortium of universities.',
      category: 'algorithms',
      tags: ['Textbooks', 'Computing', 'University Consortium'],
      url: 'https://libretexts.org/subjects/computer-science',
      coverImage: 'https://libretexts.org/img/LibreTexts.png',
      format: 'Online',
      pages: 5000
    },
    
    // Additional Free/Open Books
    {
      id: 'book-26',
      title: 'The Architecture of Open Source Applications',
      author: 'Amy Brown, Greg Wilson',
      description: 'Describes the architecture of 25+ major open source applications. Learn how large-scale software projects are structured from the people who built them.',
      category: 'system-design',
      tags: ['Open Source', 'Architecture', 'Case Studies'],
      url: 'https://aosabook.org/en/index.html',
      coverImage: 'https://aosabook.org/images/cover1.jpg',
      format: 'Online/PDF',
      pages: 432
    },
    {
      id: 'book-27',
      title: 'Competitive Programmer\'s Handbook',
      author: 'Antti Laaksonen',
      description: 'A comprehensive guide to competitive programming. Covers algorithms, data structures, and techniques used in programming contests like ICPC and Google Code Jam.',
      category: 'algorithms',
      tags: ['Competitive Programming', 'Algorithms', 'Problem Solving'],
      url: 'https://cses.fi/book/book.pdf',
      coverImage: 'https://cses.fi/logo.png',
      format: 'PDF',
      pages: 284
    },
    {
      id: 'book-28',
      title: 'Operating Systems: Three Easy Pieces',
      author: 'Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau',
      description: 'A free online operating systems book covering virtualization, concurrency, and persistence. Used in many university OS courses.',
      category: 'system-design',
      tags: ['Operating Systems', 'Computer Science', 'Systems Programming'],
      url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
      coverImage: 'https://pages.cs.wisc.edu/~remzi/OSTEP/book-cover.jpg',
      format: 'Online/PDF',
      pages: 600
    },
    {
      id: 'book-29',
      title: 'Crafting Interpreters',
      author: 'Robert Nystrom',
      description: 'A hands-on guide to implementing programming languages. Build two complete interpreters for a language called Lox from scratch.',
      category: 'language-specific',
      tags: ['Interpreters', 'Compilers', 'Programming Languages'],
      url: 'https://craftinginterpreters.com/',
      coverImage: 'https://craftinginterpreters.com/image/header.png',
      format: 'Online',
      pages: 500
    },
    {
      id: 'book-30',
      title: 'Dive Into Design Patterns',
      author: 'Alexander Shvets',
      description: 'An in-depth exploration of design patterns with real-world examples in multiple programming languages. Covers creational, structural, and behavioral patterns.',
      category: 'system-design',
      tags: ['Design Patterns', 'Software Architecture', 'Object-Oriented Programming'],
      url: 'https://refactoring.guru/design-patterns/book',
      coverImage: 'https://refactoring.guru/images/content-public/logos/logo-new.png?id=97d554614702483f31e38b32e82d8e34',
      format: 'Online',
      pages: 406
    },
    {
      id: 'book-31',
      title: 'Interactive Data Structures Visualizations',
      author: 'VisuAlgo Team',
      description: 'Not a traditional book but an interactive visualization tool for learning data structures and algorithms. Covers sorting, trees, graphs, and more with step-by-step animations.',
      category: 'data-structures',
      tags: ['Visualization', 'Interactive', 'Educational'],
      url: 'https://visualgo.net/',
      coverImage: 'https://visualgo.net/img/png/visualgo-logo.png',
      format: 'Online',
      pages: 100
    }
  ];
}
