# DSA Learning Roadmap

A personalized guide to mastering Data Structures and Algorithms with curated free resources.

## Features

- **Skill Assessment**: Evaluate your current DSA knowledge level with AI-generated questions
- **Personalized Roadmap**: Get a customized 30-day learning plan
- **Curated Resources**: Access the best free learning materials
- **Progress Tracking**: Mark completed items and track your journey
- **Project Ideas**: Apply your knowledge with practical projects
- **Algorithm Analysis**: Learn time and space complexity with examples
- **Recommended Books**: Free programming and DSA books
- **Tech Blogs**: Curated articles from top tech writers
- **Multiple Languages**: Support for Java, Python, JavaScript, C++, C#, Rust, Solidity, and Docker

## Tech Stack

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- LocalStorage for data persistence
- Groq AI API for skill assessment and question generation
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
│   │   └── api.js          # Groq AI API integration
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

- **API Key**: Add your Groq AI API key in `js/app.js` if you want to use the AI-powered assessment
- **Resources**: Modify the resource lists in `js/components/resources.js` to add more learning materials
- **Projects**: Add more project ideas in `js/components/projects.js`
- **Algorithms**: Add more algorithm explanations in `js/components/algorithms.js`
- **Books & Blogs**: Update the curated lists in their respective component files

## Setting Up Groq API

To enable the AI-powered assessment feature:

1. Sign up for a free account at [Groq](https://console.groq.com/)
2. Generate an API key from your Groq dashboard
3. Add the API key to `js/app.js` in the API.init() function:

```javascript
API.init({
  groqApiKey: 'YOUR_GROQ_API_KEY_HERE'
});
```

For production deployment, it's recommended to:
- Use environment variables to store the API key
- Implement a backend service to handle API calls securely
- Never expose your API key in client-side code

## License

This project is open source and available under the MIT License.

## Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/)
- [Groq AI](https://groq.com/)
- [DevIcons](https://devicon.dev/) - Programming language icons
- [Heroicons](https://heroicons.com/) - Beautiful UI icons
