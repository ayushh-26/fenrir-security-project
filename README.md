# APS — Fenrir Security Frontend Challenge

A security scanning dashboard built as part of the Fenrir Security frontend design challenge.
Recreates three screens from a B2B SaaS cybersecurity product with full dark/light mode,
responsive layout, and interactive components.

## Live URL

https://aps-fenrir-security.vercel.app/

## Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Runs on `http://localhost:5173` by default.

## Tech Stack

- React 18 + Vite
- Tailwind CSS v4 with @tailwindcss/postcss
- React Router v6 for navigation
- Framer Motion for page transitions and animations
- Lucide React for icons
- Sonner for toast notifications
- clsx for conditional class merging

## Project Structure
```
src/
├── components/
│   ├── ui/           # Reusable primitives: Button, Badge, StatusChip, Input, Modal, Skeleton
│   ├── layout/       # Sidebar, TopBar, AppLayout, PageTransition
│   ├── dashboard/    # OrgStatsBar, SeverityCard, ScanTable, ScanRow, TableToolbar
│   └── scan/         # ProgressRing, StepTracker, LiveConsole, FindingLog, StatusBar
├── pages/            # LoginPage, DashboardPage, ScanDetailPage
├── data/             # scans.js, findings.js, logs.js (all mock)
├── context/          # ThemeContext — global dark/light state
└── styles/           # globals.css with Tailwind @theme config
```

## Screens

**Login Page**
Split layout with dark gradient background on the left showing the product tagline and feature
list, and a signup form card on the right. Includes full form validation, password show/hide
toggle, social login buttons, and terms checkbox.

**Dashboard**
Full app layout with sidebar navigation, org stats bar, four severity counters, and a paginated
scan table. Includes live search, status filter dropdown, New Scan modal, and Export/Stop actions.

**Scan Detail**
Shows a circular progress ring, horizontal step tracker, and metadata row at the top. Bottom
section splits into a live terminal console on the left and a finding log on the right. Status
bar at the bottom shows agent and severity stats.

## Interactions

- Dark and light mode toggle — instant switch, saved to localStorage
- Login form validates all fields — checks empty fields, email format, password length
- Clicking any scan row navigates to its detail page
- New Scan button opens a modal with name, type, and target fields
- Stop Scan shows a confirmation modal before stopping, disabled on completed scans
- Export Report gives a toast with the filename
- Filter dropdown filters table by scan status, combinable with search
- Search filters scans by name or type in real time
- Status filter shows an active badge, clearable with one click
- Tabs in the live console switch between Activity Log and Verification Loops
- Console tabs support arrow key navigation
- Scan table rows support keyboard navigation — Tab to focus, Enter to open
- Pagination on the scan table with page count display
- Breadcrumb on scan detail is clickable, navigates back to dashboard

## Responsive

- Sidebar collapses on mobile with a hamburger menu and animated slide-in overlay
- Scan table converts to stacked cards on screens below 768px
- Scan metadata grid goes from 6 columns on desktop to 2 columns on mobile
- All layouts tested at 375px mobile and 1280px and above desktop

## Bonus

- Skeleton loaders on dashboard severity cards and scan table during simulated 900ms load
- Page transitions between all three screens using Framer Motion AnimatePresence
- Reusable component library — Badge, StatusChip, Button, Input, Modal, Skeleton
- ARIA labels on all interactive elements — inputs, buttons, table rows, tabs, nav links
- Keyboard support throughout — Tab, Enter, Arrow keys, Space on checkbox
- Pages lazy loaded with React.lazy and Suspense for faster initial load
- Favicon matches the app logo — teal circle with white dot

## Known Limitations

- No real backend — all data is hardcoded mock data in the data folder
- Social login buttons show a placeholder toast, not implemented
- Sidebar pages like Projects, Schedule, Notifications redirect to Dashboard
- Stop Scan only updates local UI state, resets on page refresh
- New Scan adds a toast confirmation but does not persist to the scan list
