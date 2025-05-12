# DSA Learning Roadmap

A personalized guide to mastering Data Structures and Algorithms with the best curated free resources.
![Project landing page](https://github.com/user-attachments/assets/bd5b4245-62e4-49b7-a5ff-1efd369aea3e)
![Project Assessment Results](https://github.com/user-attachments/assets/c5c3c557-814b-4b18-841b-b2f6bfceaef5)

You can check it out live at :- [DSAWarriors](https://dsawarriors.netlify.app/#)

## Features

- **Skill Assessment**: Evaluate your current DSA knowledge level with carefully crafted questions
- **Personalized Roadmap**: Get a customized 4 weeks learning plan
- **Curated Resources**: Access the best free learning materials
- **Progress Tracking**: Mark completed items and track your journey
- **Project Ideas**: Apply your knowledge with practical projects
- **Algorithm Analysis**: Learn time and space complexity with examples
- **Recommended Books**: Free programming, system design and DSA books
- **Tech Blogs**: Curated articles from top tech writers
- **Multiple Languages**: Support for Java, Python, JavaScript, C++, C#, Rust, Solidity, and Docker

## Tech Stack

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- LocalStorage for data persistence
- Dark theme UI with elegant design

## Project Structure

```
dsa-roadmap-guide/
├── index.html              # Main entry point
├── css/
│   └── style.css           # Custom styles beyond Tailwind
├── js/
│   ├── app.js              # Main application entry point
│   ├── utils/
│   │   ├── storage.js      # LocalStorage utilities
│   │   ├── router.js       # Simple client-side router
│   │   └── api.js          # API utilities
│   ├── components/
│   │   ├── navbar.js       # Navigation component
│   │   ├── footer.js       # Footer component
│   │   ├── assessment.js   # Assessment form component
│   │   ├── roadmap.js      # Roadmap display component
│   │   ├── resources.js    # Resources listing component
│   │   ├── projects.js     # Projects listing component
│   │   ├── blogs.js        # Blog posts component
│   │   ├── books.js        # Recommended books component
│   │   └── algorithms.js   # Algorithm explanations component
│   ├── data/
│   │   ├── questions.js    # Assessment questions
│   │   └── roadmaps.js     # Roadmap templates
│   └── pages/
│       ├── home.js         # Home page
│       ├── assessment.js   # Assessment page
│       ├── roadmap.js      # Roadmap page
│       ├── resources.js    # Resources page
│       ├── projects.js     # Projects page
│       ├── blogs.js        # Blogs page
│       ├── books.js        # Books page
│       └── algorithms.js   # Algorithms page
└── assets/
   └── icons/
       └── favicon.png     # Site favicon
```

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser
3. Take the assessment to generate your personalized roadmap
4. Follow the daily tasks and track your progress

## Deployment

This project can be deployed on any static hosting service:

1. Netlify: Simply connect your GitHub repository to Netlify
2. GitHub Pages: Enable GitHub Pages in your repository settings
3. Vercel: Connect your repository for automatic deployment

## Customization

- **Assessment Questions**: Modify the question sets in `js/data/questions.js` to customize the assessment
- **Roadmap Templates**: Update the roadmap templates in `js/data/roadmaps.js` for different skill levels
- **Resources**: Modify the resource lists in `js/components/resources.js` to add more learning materials
- **Projects**: Add more project ideas in `js/components/projects.js`
- **Algorithms**: Add more algorithm explanations in `js/components/algorithms.js`
- **Books & Blogs**: Update the curated lists in their respective component files

## Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/)
- [DevIcons](https://devicon.dev/) - Programming language icons
- [Heroicons](https://heroicons.com/) - Beautiful UI icons
- [Amazon Q Developer](https://aws.amazon.com/q) - This whole project itself(code part)
