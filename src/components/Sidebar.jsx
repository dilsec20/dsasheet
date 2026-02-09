import useStore from '../store/useStore'

const Sidebar = () => {
    const { topics, selectedTopic, setSelectedTopic, openModal } = useStore()

    const totalQuestions = topics.reduce((acc, t) => {
        return acc + t.questions.length + t.subTopics.reduce((a, st) => a + st.questions.length, 0)
    }, 0)

    return (
        <aside className="w-72 h-screen glass border-r border-white/10 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
                <h1 className="text-lg font-bold gradient-text">Striver's A2Z DSA</h1>
                <p className="text-xs text-gray-400 mt-1">
                    {topics.length} steps • {totalQuestions} questions
                </p>
            </div>

            {/* Add Topic Button */}
            <div className="p-3">
                <button
                    onClick={() => openModal('topic', 'add')}
                    className="w-full px-4 py-2.5 rounded-lg btn-primary flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Topic
                </button>
            </div>

            {/* Topics List */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                <button
                    onClick={() => setSelectedTopic(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${selectedTopic === null
                        ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                        : 'text-gray-300 hover:bg-white/5'
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <span className="text-sm font-medium">All Topics</span>
                </button>

                {topics.map((topic) => {
                    const count = topic.questions.length + topic.subTopics.reduce((a, st) => a + st.questions.length, 0)
                    return (
                        <button
                            key={topic.id}
                            onClick={() => setSelectedTopic(topic.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between group ${selectedTopic === topic.id
                                ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                                : 'text-gray-300 hover:bg-white/5'
                                }`}
                        >
                            <span className="text-sm truncate flex-1">{topic.name}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${selectedTopic === topic.id ? 'bg-primary-500/30' : 'bg-white/10'
                                }`}>
                                {count}
                            </span>
                        </button>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                <p className="text-xs text-gray-500 text-center">
                    Drag & drop to reorder
                </p>
            </div>
        </aside>
    )
}

export default Sidebar
