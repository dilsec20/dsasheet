# 📚 Interactive Question Management Sheet
An interactive, modern web app to manage and track DSA questions with drag-and-drop reordering and full CRUD operations.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)

## ✨ Features

- 📋 **456 Questions** across **18 Topics** - Complete A2Z DSA Sheet
- ✅ **Progress Tracking** - Mark questions as solved (persists in localStorage!)
- 🔍 **Search & Filter** - Find questions by name, difficulty, or status
- 📊 **Stats Dashboard** - Track completion by difficulty and topic
- 🔄 **Drag & Drop** - Reorder topics, subtopics, and questions
- ➕ **Full CRUD** - Add, edit, delete at all levels
- 💾 **Auto-Save** - Progress saved to localStorage
- 📤 **Export/Import** - Backup and restore your progress
- 🎨 **Premium UI** - Dark theme with glassmorphism
- ⚡ **Live Data** - Fetches from Codolio API
- 📱 **Responsive** - Works on all screen sizes

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite** | Build Tool |
| **Zustand** | State Management |
| **@hello-pangea/dnd** | Drag & Drop |
| **Tailwind CSS** | Styling |

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/dilsec20/dsasheet.git
cd dsasheet

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── AddEditModal.jsx    # Create/edit forms
│   ├── DeleteConfirmDialog.jsx
│   ├── QuestionCard.jsx    # Question display
│   ├── Sidebar.jsx         # Navigation
│   ├── SubTopicCard.jsx    # Subtopic container
│   └── TopicCard.jsx       # Topic container
├── store/
│   └── useStore.js         # Zustand state
├── data/
│   └── initialData.js      # Fallback data
├── App.jsx                 # Main app
└── index.css               # Global styles
```

## 📸 Screenshots

### Main Dashboard
- Glassmorphism cards with gradient accents
- Expandable topics and subtopics
- Platform icons (LeetCode, GFG, Coding Ninjas)

### Drag & Drop
- Reorder topics in sidebar
- Move questions between subtopics
- Smooth animations

## 🌐 API

Data fetched from:
```
https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/strivers-a2z-dsa-sheet
```

## 📄 License

MIT License - feel free to use and modify!

---

Made with ❤️ for DSA enthusiasts
