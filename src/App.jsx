import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import useStore from './store/useStore'
import Sidebar from './components/Sidebar'
import TopicCard from './components/TopicCard'
import AddEditModal from './components/AddEditModal'
import DeleteConfirmDialog from './components/DeleteConfirmDialog'

const API_URL = 'https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/strivers-a2z-dsa-sheet'

function App() {
    const { topics, selectedTopic, initializeData, reorderTopics, reorderSubTopics, reorderQuestions } = useStore()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

    const filteredTopics = selectedTopic
        ? topics.filter(t => t.id === selectedTopic)
        : topics

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
                {/* Header */}
                <div className="mb-6">
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

                {topics.length === 0 && (
                    <div className="text-center py-20">
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
