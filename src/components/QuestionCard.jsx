import { Draggable } from '@hello-pangea/dnd'
import useStore from '../store/useStore'

const platformIcons = {
    leetcode: '🟡',
    geeksforgeeks: '🟢',
    codestudio: '🟠',
    interviewbit: '🔵',
    spoj: '⚪',
    codeforces: '🔴',
    unknown: '⚫',
}

const getDifficultyClass = (difficulty) => {
    const d = difficulty?.toLowerCase() || 'medium'
    if (d === 'easy' || d === 'basic') return 'badge-easy'
    if (d === 'medium') return 'badge-medium'
    if (d === 'hard') return 'badge-hard'
    return 'badge-basic'
}

const QuestionCard = ({ question, index, topicId, subTopicId }) => {
    const { openModal, openDeleteConfirm } = useStore()

    return (
        <Draggable draggableId={question.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`group flex items-center gap-3 p-3 bg-dark-800/50 rounded-lg border border-white/5 hover:border-primary-500/30 transition-all duration-200 ${snapshot.isDragging ? 'dragging shadow-xl' : 'hover-lift'
                        }`}
                >
                    {/* Drag Handle */}
                    <div
                        {...provided.dragHandleProps}
                        className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        </svg>
                    </div>

                    {/* Platform Icon */}
                    <span className="text-lg" title={question.platform}>
                        {platformIcons[question.platform] || platformIcons.unknown}
                    </span>

                    {/* Question Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h5 className="text-sm font-medium text-gray-200 truncate">
                                {question.title}
                            </h5>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getDifficultyClass(question.difficulty)}`}>
                                {question.difficulty}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                            {question.platform}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {question.problemUrl && (
                            <a
                                href={question.problemUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-primary-400 transition-colors"
                                title="Open Problem"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                        {question.resource && (
                            <a
                                href={question.resource}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors"
                                title="Watch Video"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </a>
                        )}
                        <button
                            onClick={() => openModal('question', 'edit', { ...question, topicId, subTopicId })}
                            className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            title="Edit"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => openDeleteConfirm('question', question.id, question.title, { topicId, subTopicId })}
                            className="p-1.5 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default QuestionCard
