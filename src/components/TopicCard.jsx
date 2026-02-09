import { useState } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import useStore from '../store/useStore'
import SubTopicCard from './SubTopicCard'
import QuestionCard from './QuestionCard'

const TopicCard = ({ topic, index }) => {
    const [isExpanded, setIsExpanded] = useState(true)
    const { openModal, openDeleteConfirm } = useStore()

    const totalQuestions = topic.questions.length +
        topic.subTopics.reduce((acc, st) => acc + st.questions.length, 0)

    return (
        <Draggable draggableId={topic.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`glass rounded-xl mb-4 overflow-hidden transition-all duration-300 ${snapshot.isDragging ? 'dragging' : ''
                        }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            {/* Drag Handle */}
                            <div
                                {...provided.dragHandleProps}
                                className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/10 transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                </svg>
                            </div>

                            {/* Expand/Collapse Button */}
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-1 rounded hover:bg-white/10 transition-colors"
                            >
                                <svg
                                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Topic Name */}
                            <h3 className="text-lg font-semibold text-white">{topic.name}</h3>

                            {/* Question Count Badge */}
                            <span className="px-2 py-0.5 text-xs font-medium bg-primary-500/20 text-primary-300 rounded-full">
                                {totalQuestions} questions
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => openModal('subtopic', 'add', null, topic.id)}
                                className="px-3 py-1.5 text-xs font-medium btn-secondary rounded-lg flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Sub-topic
                            </button>
                            <button
                                onClick={() => openModal('question', 'add', null, topic.id)}
                                className="px-3 py-1.5 text-xs font-medium btn-primary rounded-lg flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Question
                            </button>
                            <button
                                onClick={() => openModal('topic', 'edit', topic)}
                                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => openDeleteConfirm('topic', topic.id, topic.name)}
                                className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    {isExpanded && (
                        <div className="p-4 animate-fade-in">
                            {/* Direct Questions (no sub-topic) */}
                            {topic.questions.length > 0 && (
                                <Droppable droppableId={`topic-questions-${topic.id}`} type="question">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`space-y-2 mb-4 p-3 rounded-lg transition-colors ${snapshot.isDraggingOver ? 'bg-primary-500/10 border border-dashed border-primary-500/30' : ''
                                                }`}
                                        >
                                            {topic.questions.map((question, qIndex) => (
                                                <QuestionCard
                                                    key={question.id}
                                                    question={question}
                                                    index={qIndex}
                                                    topicId={topic.id}
                                                    subTopicId={null}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            )}

                            {/* Sub-topics */}
                            <Droppable droppableId={`subtopics-${topic.id}`} type="subtopic">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`space-y-3 ${snapshot.isDraggingOver ? 'bg-primary-500/5 rounded-lg' : ''
                                            }`}
                                    >
                                        {topic.subTopics.map((subTopic, stIndex) => (
                                            <SubTopicCard
                                                key={subTopic.id}
                                                subTopic={subTopic}
                                                index={stIndex}
                                                topicId={topic.id}
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            {topic.questions.length === 0 && topic.subTopics.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <p>No questions yet. Add a question or sub-topic to get started.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    )
}

export default TopicCard
