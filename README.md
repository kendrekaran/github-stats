# Github Wrapped Card

A beautiful, shareable GitHub stats card generator. Visualize your top languages, projects, and coding hours in a Spotify Wrapped-style card.

## Features

- 🎨 Beautiful, modern UI inspired by Spotify Wrapped
- 📊 Visualize your top programming languages
- ⭐ Showcase your most starred projects
- ⏱️ Calculate estimated coding hours
- 🎯 Domain inference based on your primary language
- 📤 Share your stats card as an image
- 🔍 Search any GitHub username

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd github-stats
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Create a `.env.local` file (optional but recommended):
```bash
cp .env.example .env.local
```

4. Add your GitHub token (optional):
   - Get a token from [GitHub Settings](https://github.com/settings/tokens)
   - Add it to `.env.local` as `NEXT_PUBLIC_GITHUB_TOKEN`
   - Without a token: 60 requests/hour per IP
   - With a token: 5,000 requests/hour

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Deployment

### Environment Variables

Set these environment variables in your production environment:

- `NEXT_PUBLIC_GITHUB_TOKEN` (optional): Your GitHub personal access token
- `NEXT_PUBLIC_SITE_URL` (required for production): Your production URL (e.g., `https://yourdomain.com`)

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_GITHUB_TOKEN` (optional)
   - `NEXT_PUBLIC_SITE_URL` (your Vercel domain)
4. Deploy!

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**: Connect your GitHub repo and deploy
- **Railway**: Add your repo and set environment variables
- **AWS Amplify**: Connect repository and configure build settings
- **Docker**: Build and run the containerized app

## Project Structure

```
github-stats/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles
├── components/
│   ├── SearchBar.tsx   # Search input component
│   ├── StatsCard.tsx   # Stats display card
│   └── ShareButton.tsx # Share functionality
├── utils/
│   ├── github.ts       # GitHub API integration
│   └── canvas.ts       # Image generation utilities
└── public/
    └── ogimage.png     # Open Graph image
```

## Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Motion** - Animations
- **html2canvas** - Image generation
- **GitHub API** - Fetching user stats

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

