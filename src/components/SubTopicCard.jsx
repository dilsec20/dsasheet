import { useState } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import useStore from '../store/useStore'
import QuestionCard from './QuestionCard'

const SubTopicCard = ({ subTopic, index, topicId }) => {
    const [isExpanded, setIsExpanded] = useState(true)
    const { openModal, openDeleteConfirm } = useStore()

    return (
        <Draggable draggableId={subTopic.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`glass-light rounded-lg overflow-hidden transition-all duration-300 ${snapshot.isDragging ? 'dragging' : ''
                        }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-3 border-b border-white/5">
                        <div className="flex items-center gap-2">
                            {/* Drag Handle */}
                            <div
                                {...provided.dragHandleProps}
                                className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/10 transition-colors"
                            >
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                </svg>
                            </div>

                            {/* Expand/Collapse Button */}
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-1 rounded hover:bg-white/10 transition-colors"
                            >
                                <svg
                                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Sub-topic Name */}
                            <h4 className="text-sm font-medium text-gray-200">{subTopic.name}</h4>

                            {/* Question Count */}
                            <span className="px-2 py-0.5 text-xs font-medium bg-white/5 text-gray-400 rounded-full">
                                {subTopic.questions.length}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => openModal('question', 'add', null, { topicId, subTopicId: subTopic.id })}
                                className="px-2 py-1 text-xs font-medium text-primary-400 hover:bg-primary-500/10 rounded transition-colors flex items-center gap-1"
                            >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add
                            </button>
                            <button
                                onClick={() => openModal('subtopic', 'edit', { ...subTopic, topicId })}
                                className="p-1 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => openDeleteConfirm('subtopic', subTopic.id, subTopic.name, topicId)}
                                className="p-1 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Questions */}
                    {isExpanded && (
                        <Droppable droppableId={`subtopic-questions-${subTopic.id}`} type="question">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`p-3 space-y-2 min-h-[40px] transition-colors ${snapshot.isDraggingOver ? 'bg-primary-500/10' : ''
                                        }`}
                                >
                                    {subTopic.questions.map((question, qIndex) => (
                                        <QuestionCard
                                            key={question.id}
                                            question={question}
                                            index={qIndex}
                                            topicId={topicId}
                                            subTopicId={subTopic.id}
                                        />
                                    ))}
                                    {provided.placeholder}
                                    {subTopic.questions.length === 0 && (
                                        <p className="text-center text-xs text-gray-600 py-2">
                                            No questions. Click "Add" to create one.
                                        </p>
                                    )}
                                </div>
                            )}
                        </Droppable>
                    )}
                </div>
            )}
        </Draggable>
    )
}

export default SubTopicCard
