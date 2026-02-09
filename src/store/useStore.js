import { create } from 'zustand'

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 11)

const useStore = create((set, get) => ({
    topics: [],
    selectedTopic: null,
    modal: {
        isOpen: false,
        type: null, // 'topic' | 'subtopic' | 'question'
        mode: null, // 'add' | 'edit'
        data: null,
        parentId: null,
    },
    deleteConfirm: {
        isOpen: false,
        type: null,
        id: null,
        parentId: null,
        name: '',
    },

    // Initialize with data
    initializeData: (questions) => {
        const topicsMap = new Map()

        questions.forEach((q, index) => {
            const topicName = q.topic || 'Uncategorized'
            const subTopicName = q.subTopic || null

            if (!topicsMap.has(topicName)) {
                topicsMap.set(topicName, {
                    id: generateId(),
                    name: topicName,
                    order: topicsMap.size,
                    subTopics: new Map(),
                    questions: [],
                })
            }

            const topic = topicsMap.get(topicName)

            if (subTopicName) {
                if (!topic.subTopics.has(subTopicName)) {
                    topic.subTopics.set(subTopicName, {
                        id: generateId(),
                        name: subTopicName,
                        order: topic.subTopics.size,
                        questions: [],
                    })
                }
                topic.subTopics.get(subTopicName).questions.push({
                    id: q._id || generateId(),
                    title: q.title || q.questionId?.name || 'Untitled',
                    difficulty: q.questionId?.difficulty || 'Medium',
                    platform: q.questionId?.platform || 'unknown',
                    problemUrl: q.questionId?.problemUrl || '',
                    resource: q.resource || '',
                    order: topic.subTopics.get(subTopicName).questions.length,
                })
            } else {
                topic.questions.push({
                    id: q._id || generateId(),
                    title: q.title || q.questionId?.name || 'Untitled',
                    difficulty: q.questionId?.difficulty || 'Medium',
                    platform: q.questionId?.platform || 'unknown',
                    problemUrl: q.questionId?.problemUrl || '',
                    resource: q.resource || '',
                    order: topic.questions.length,
                })
            }
        })

        // Convert maps to arrays
        const topics = Array.from(topicsMap.values()).map(topic => ({
            ...topic,
            subTopics: Array.from(topic.subTopics.values()),
        }))

        set({ topics })
    },

    // Topic CRUD
    addTopic: (name) => {
        set((state) => ({
            topics: [...state.topics, {
                id: generateId(),
                name,
                order: state.topics.length,
                subTopics: [],
                questions: [],
            }]
        }))
    },

    editTopic: (id, name) => {
        set((state) => ({
            topics: state.topics.map(t =>
                t.id === id ? { ...t, name } : t
            )
        }))
    },

    deleteTopic: (id) => {
        set((state) => ({
            topics: state.topics.filter(t => t.id !== id)
        }))
    },

    // SubTopic CRUD
    addSubTopic: (topicId, name) => {
        set((state) => ({
            topics: state.topics.map(t =>
                t.id === topicId
                    ? {
                        ...t,
                        subTopics: [...t.subTopics, {
                            id: generateId(),
                            name,
                            order: t.subTopics.length,
                            questions: [],
                        }]
                    }
                    : t
            )
        }))
    },

    editSubTopic: (topicId, subTopicId, name) => {
        set((state) => ({
            topics: state.topics.map(t =>
                t.id === topicId
                    ? {
                        ...t,
                        subTopics: t.subTopics.map(st =>
                            st.id === subTopicId ? { ...st, name } : st
                        )
                    }
                    : t
            )
        }))
    },

    deleteSubTopic: (topicId, subTopicId) => {
        set((state) => ({
            topics: state.topics.map(t =>
                t.id === topicId
                    ? { ...t, subTopics: t.subTopics.filter(st => st.id !== subTopicId) }
                    : t
            )
        }))
    },

    // Question CRUD
    addQuestion: (topicId, subTopicId, questionData) => {
        set((state) => ({
            topics: state.topics.map(t => {
                if (t.id !== topicId) return t

                if (subTopicId) {
                    return {
                        ...t,
                        subTopics: t.subTopics.map(st =>
                            st.id === subTopicId
                                ? {
                                    ...st,
                                    questions: [...st.questions, {
                                        id: generateId(),
                                        ...questionData,
                                        order: st.questions.length,
                                    }]
                                }
                                : st
                        )
                    }
                } else {
                    return {
                        ...t,
                        questions: [...t.questions, {
                            id: generateId(),
                            ...questionData,
                            order: t.questions.length,
                        }]
                    }
                }
            })
        }))
    },

    editQuestion: (topicId, subTopicId, questionId, questionData) => {
        set((state) => ({
            topics: state.topics.map(t => {
                if (t.id !== topicId) return t

                if (subTopicId) {
                    return {
                        ...t,
                        subTopics: t.subTopics.map(st =>
                            st.id === subTopicId
                                ? {
                                    ...st,
                                    questions: st.questions.map(q =>
                                        q.id === questionId ? { ...q, ...questionData } : q
                                    )
                                }
                                : st
                        )
                    }
                } else {
                    return {
                        ...t,
                        questions: t.questions.map(q =>
                            q.id === questionId ? { ...q, ...questionData } : q
                        )
                    }
                }
            })
        }))
    },

    deleteQuestion: (topicId, subTopicId, questionId) => {
        set((state) => ({
            topics: state.topics.map(t => {
                if (t.id !== topicId) return t

                if (subTopicId) {
                    return {
                        ...t,
                        subTopics: t.subTopics.map(st =>
                            st.id === subTopicId
                                ? { ...st, questions: st.questions.filter(q => q.id !== questionId) }
                                : st
                        )
                    }
                } else {
                    return {
                        ...t,
                        questions: t.questions.filter(q => q.id !== questionId)
                    }
                }
            })
        }))
    },

    // Reorder functions
    reorderTopics: (startIndex, endIndex) => {
        set((state) => {
            const newTopics = Array.from(state.topics)
            const [removed] = newTopics.splice(startIndex, 1)
            newTopics.splice(endIndex, 0, removed)
            return { topics: newTopics.map((t, i) => ({ ...t, order: i })) }
        })
    },

    reorderSubTopics: (topicId, startIndex, endIndex) => {
        set((state) => ({
            topics: state.topics.map(t => {
                if (t.id !== topicId) return t
                const newSubTopics = Array.from(t.subTopics)
                const [removed] = newSubTopics.splice(startIndex, 1)
                newSubTopics.splice(endIndex, 0, removed)
                return { ...t, subTopics: newSubTopics.map((st, i) => ({ ...st, order: i })) }
            })
        }))
    },

    reorderQuestions: (topicId, subTopicId, startIndex, endIndex) => {
        set((state) => ({
            topics: state.topics.map(t => {
                if (t.id !== topicId) return t

                if (subTopicId) {
                    return {
                        ...t,
                        subTopics: t.subTopics.map(st => {
                            if (st.id !== subTopicId) return st
                            const newQuestions = Array.from(st.questions)
                            const [removed] = newQuestions.splice(startIndex, 1)
                            newQuestions.splice(endIndex, 0, removed)
                            return { ...st, questions: newQuestions.map((q, i) => ({ ...q, order: i })) }
                        })
                    }
                } else {
                    const newQuestions = Array.from(t.questions)
                    const [removed] = newQuestions.splice(startIndex, 1)
                    newQuestions.splice(endIndex, 0, removed)
                    return { ...t, questions: newQuestions.map((q, i) => ({ ...q, order: i })) }
                }
            })
        }))
    },

    // Modal actions
    openModal: (type, mode, data = null, parentId = null) => {
        set({ modal: { isOpen: true, type, mode, data, parentId } })
    },

    closeModal: () => {
        set({ modal: { isOpen: false, type: null, mode: null, data: null, parentId: null } })
    },

    // Delete confirmation
    openDeleteConfirm: (type, id, name, parentId = null) => {
        set({ deleteConfirm: { isOpen: true, type, id, name, parentId } })
    },

    closeDeleteConfirm: () => {
        set({ deleteConfirm: { isOpen: false, type: null, id: null, name: '', parentId: null } })
    },

    // Selection
    setSelectedTopic: (topicId) => {
        set({ selectedTopic: topicId })
    },
}))

export default useStore
