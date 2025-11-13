# KBO Visualization

A real-time baseball game visualization application for the Korean Baseball Organization (KBO) league. This interactive web application displays live game scores, detailed statistics, and player information with an intuitive interface.

## Features

- **Live Game Scoreboard**: Real-time display of current game scores and status
- **Inning-by-Inning Breakdown**: Detailed scoring information for each inning
- **Multiple Game Cards**: View scores from multiple ongoing or completed games
- **Player Statistics**: Comprehensive player information and statistics
- **Interactive Charts**: Win probability charts and data visualizations
- **Responsive Design**: Collapsible sidebar for optimal viewing experience
- **Team Logos**: Visual representation of all KBO teams (Kiwoom, Lotte, Samsung, Doosan, KT, NC, SSG, Hanwha, LG, KIA)

## Technologies Used

- **React 19.1.0** - UI framework
- **Vite 6.3.5** - Build tool and development server
- **ECharts 5.6.0** - Advanced data visualization library
- **Recharts 2.15.3** - Charting library for React
- **Papa Parse 5.5.3** - CSV parsing library
- **ESLint** - Code linting and quality

## Prerequisites

- Node.js (version 14 or higher recommended)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kbo_final
```

2. Navigate to the project directory:
```bash
cd kbo_vis-main
```

3. Install dependencies:
```bash
npm install
```

## Usage

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be generated in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Lint Code

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
kbo_vis-main/
├── docs/                   # Production build output
│   ├── assets/            # Compiled CSS and JS
│   ├── data/              # CSV data files
│   └── images/            # Team logos and assets
├── public/                # Static assets
│   ├── data/              # Game data in CSV format
│   └── images/            # Team logos and images
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── Header.jsx     # Application header
│   │   ├── Player.jsx     # Player information display
│   │   ├── Scoreboard.jsx # Main scoreboard component
│   │   ├── Sidebar.jsx    # Sidebar with additional info
│   │   └── Popup.jsx      # Win probability chart popup
│   ├── styles/            # CSS stylesheets
│   │   ├── main.css
│   │   ├── header.css
│   │   ├── player.css
│   │   ├── scoreboard.css
│   │   ├── sidebar.css
│   │   └── popup.css
│   ├── App.jsx            # Main application component
│   ├── App.css            # Application styles
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
└── eslint.config.js       # ESLint configuration
```

## Components

### Header
Navigation and controls for the application, including sidebar toggle functionality.

### Player
Displays player statistics and information for the current game.

### Scoreboard
Main component showing:
- Current game score
- Inning-by-inning breakdown
- Pitcher information
- Additional game cards

### Sidebar
Collapsible sidebar with supplementary game information and statistics.

### Popup (Win Probability Chart)
Interactive chart showing win probability trends throughout the game.

## Data Format

The application uses CSV files for game data. Sample data is located in:
- `public/data/20250603WOLT02025.csv`

## Development

The project uses:
- **Vite** for fast development and building
- **ESLint** for code quality and consistency
- **Fast Refresh** for instant feedback during development

To contribute:
1. Create a new branch for your feature
2. Make your changes
3. Run `npm run lint` to ensure code quality
4. Test your changes with `npm run dev`
5. Submit a pull request

## Browser Support

This application works best in modern browsers that support ES6+ features:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

Please refer to the repository license or contact the maintainers for licensing information.

## Support

For issues, questions, or contributions, please open an issue in the GitHub repository.
