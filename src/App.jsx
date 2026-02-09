import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import useStore from './store/useStore'
import Sidebar from './components/Sidebar'
import TopicCard from './components/TopicCard'
import AddEditModal from './components/AddEditModal'
import DeleteConfirmDialog from './components/DeleteConfirmDialog'
import StatsPanel from './components/StatsPanel'

const API_URL = 'https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/strivers-a2z-dsa-sheet'

function App() {
    const {
        topics,
        selectedTopic,
        searchQuery,
        filters,
        setSearchQuery,
        setFilter,
        initializeData,
        reorderTopics,
        reorderSubTopics,
        reorderQuestions,
        progress
    } = useStore()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showStats, setShowStats] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch(API_URL)
                const data = await response.json()

                if (data.status.success && data.data.questions) {
                    initializeData(data.data.questions)
                } else {
                    setError('Failed to load questions from API')
                }
            } catch (err) {
                console.error('Error fetching data:', err)
                setError('Failed to connect to server. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [initializeData])

    const handleDragEnd = (result) => {
        const { destination, source, type } = result

        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        if (type === 'topic') {
            reorderTopics(source.index, destination.index)
        } else if (type === 'subtopic') {
            const topicId = source.droppableId.replace('subtopics-', '')
            reorderSubTopics(topicId, source.index, destination.index)
        } else if (type === 'question') {
            const sourceDroppable = source.droppableId
            const destDroppable = destination.droppableId

            if (sourceDroppable === destDroppable) {
                if (sourceDroppable.startsWith('topic-questions-')) {
                    const topicId = sourceDroppable.replace('topic-questions-', '')
                    reorderQuestions(topicId, null, source.index, destination.index)
                } else if (sourceDroppable.startsWith('subtopic-questions-')) {
                    const subTopicId = sourceDroppable.replace('subtopic-questions-', '')
                    const topic = topics.find(t => t.subTopics.some(st => st.id === subTopicId))
                    if (topic) {
                        reorderQuestions(topic.id, subTopicId, source.index, destination.index)
                    }
                }
            }
        }
    }

    // Filter topics based on selection, search, and filters
    const getFilteredTopics = () => {
        let filtered = selectedTopic
            ? topics.filter(t => t.id === selectedTopic)
            : [...topics]

        // Apply search and difficulty/status filters to questions within topics
        if (searchQuery || filters.difficulty !== 'all' || filters.status !== 'all') {
            filtered = filtered.map(topic => {
                const filterQuestions = (questions) => {
                    return questions.filter(q => {
                        // Search filter
                        if (searchQuery && !q.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                            return false
                        }
                        // Difficulty filter
                        if (filters.difficulty !== 'all' && q.difficulty !== filters.difficulty) {
                            return false
                        }
                        // Status filter
                        if (filters.status !== 'all') {
                            const isSolved = progress[q.id]?.solved
                            if (filters.status === 'solved' && !isSolved) return false
                            if (filters.status === 'unsolved' && isSolved) return false
                        }
                        return true
                    })
                }

                return {
                    ...topic,
                    questions: filterQuestions(topic.questions),
                    subTopics: topic.subTopics.map(st => ({
                        ...st,
                        questions: filterQuestions(st.questions)
                    })).filter(st => st.questions.length > 0 || !searchQuery)
                }
            }).filter(t =>
                t.questions.length > 0 ||
                t.subTopics.some(st => st.questions.length > 0) ||
                (!searchQuery && filters.difficulty === 'all' && filters.status === 'all')
            )
        }

        return filtered
    }

    const filteredTopics = getFilteredTopics()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading Striver's A2Z DSA Sheet...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center glass p-8 rounded-xl">
                    <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-white mb-2">Error Loading Data</h2>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 btn-primary rounded-lg"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 p-6 overflow-y-auto">
                {/* Header with Search & Filters */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">
                                {selectedTopic ? topics.find(t => t.id === selectedTopic)?.name : "Striver's A2Z DSA Sheet"}
                            </h2>
                            <p className="text-gray-400">
                                {selectedTopic
                                    ? `Manage questions in this topic`
                                    : `Manage all ${topics.length} topics and their questions`
                                }
                            </p>
                        </div>
                        <button
                            onClick={() => setShowStats(!showStats)}
                            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${showStats ? 'bg-primary-500 text-white' : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Stats
                        </button>
                    </div>

                    {/* Stats Panel (collapsible) */}
                    {showStats && <StatsPanel />}

                    {/* Search & Filter Bar */}
                    <div className="flex flex-wrap gap-3">
                        {/* Search */}
                        <div className="flex-1 min-w-64 relative">
                            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                            />
                        </div>

                        {/* Difficulty Filter */}
                        <select
                            value={filters.difficulty}
                            onChange={(e) => setFilter('difficulty', e.target.value)}
                            className="px-4 py-2.5 bg-dark-800 border border-white/10 rounded-lg text-gray-300 focus:outline-none focus:border-primary-500 cursor-pointer"
                        >
                            <option value="all">All Difficulty</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>

                        {/* Status Filter */}
                        <select
                            value={filters.status}
                            onChange={(e) => setFilter('status', e.target.value)}
                            className="px-4 py-2.5 bg-dark-800 border border-white/10 rounded-lg text-gray-300 focus:outline-none focus:border-primary-500 cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="solved">✓ Solved</option>
                            <option value="unsolved">○ Unsolved</option>
                        </select>
                    </div>
                </div>

                {/* Topics Grid */}
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="topics" type="topic">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`space-y-4 ${snapshot.isDraggingOver ? 'bg-primary-500/5 rounded-xl p-2 -m-2' : ''}`}
                            >
                                {filteredTopics.map((topic, index) => (
                                    <TopicCard key={topic.id} topic={topic} index={index} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {filteredTopics.length === 0 && (
                    <div className="text-center py-20">
                        {searchQuery || filters.difficulty !== 'all' || filters.status !== 'all' ? (
                            <>
                                <svg className="w-20 h-20 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-300 mb-2">No matching questions</h3>
                                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('')
                                        setFilter('difficulty', 'all')
                                        setFilter('status', 'all')
                                    }}
                                    className="px-6 py-2.5 rounded-lg btn-primary"
                                >
                                    Clear Filters
                                </button>
                            </>
                        ) : (
                            <>
                                <svg className="w-20 h-20 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-300 mb-2">No topics yet</h3>
                                <p className="text-gray-500 mb-4">Get started by creating your first topic</p>
                                <button
                                    onClick={() => useStore.getState().openModal('topic', 'add')}
                                    className="px-6 py-2.5 rounded-lg btn-primary"
                                >
                                    Create Topic
                                </button>
                            </>
                        )}
                    </div>
                )}
            </main>

            {/* Modals */}
            <AddEditModal />
            <DeleteConfirmDialog />
        </div>
    )
}

export default App
