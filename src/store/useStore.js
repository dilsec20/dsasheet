import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 11)

// Storage key for progress
const PROGRESS_KEY = 'dsa-sheet-progress'

// Load saved progress from localStorage
const loadProgress = () => {
    try {
        const saved = localStorage.getItem(PROGRESS_KEY)
        return saved ? JSON.parse(saved) : {}
    } catch {
        return {}
    }
}

// Save progress to localStorage
const saveProgress = (progress) => {
    try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
    } catch (e) {
        console.error('Failed to save progress:', e)
    }
}

const useStore = create(
    persist(
        (set, get) => ({
            topics: [],
            selectedTopic: null,
            progress: loadProgress(), // { questionId: { solved: boolean, notes: string } }
            searchQuery: '',
            filters: {
                difficulty: 'all', // 'all' | 'Easy' | 'Medium' | 'Hard'
                status: 'all', // 'all' | 'solved' | 'unsolved'
            },
            modal: {
                isOpen: false,
                type: null,
                mode: null,
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

            // Progress tracking
            toggleSolved: (questionId) => {
                set((state) => {
                    const newProgress = {
                        ...state.progress,
                        [questionId]: {
                            ...state.progress[questionId],
                            solved: !state.progress[questionId]?.solved,
                        }
                    }
                    saveProgress(newProgress)
                    return { progress: newProgress }
                })
            },

            updateNotes: (questionId, notes) => {
                set((state) => {
                    const newProgress = {
                        ...state.progress,
                        [questionId]: {
                            ...state.progress[questionId],
                            notes,
                        }
                    }
                    saveProgress(newProgress)
                    return { progress: newProgress }
                })
            },

            isQuestionSolved: (questionId) => {
                return get().progress[questionId]?.solved || false
            },

            getQuestionNotes: (questionId) => {
                return get().progress[questionId]?.notes || ''
            },

            // Search and filter
            setSearchQuery: (query) => {
                set({ searchQuery: query })
            },

            setFilter: (filterType, value) => {
                set((state) => ({
                    filters: { ...state.filters, [filterType]: value }
                }))
            },

            // Statistics
            getStats: () => {
                const { topics, progress } = get()
                let totalQuestions = 0
                let solvedCount = 0
                const byDifficulty = { Easy: { total: 0, solved: 0 }, Medium: { total: 0, solved: 0 }, Hard: { total: 0, solved: 0 } }
                const byTopic = []

                topics.forEach(topic => {
                    let topicTotal = 0
                    let topicSolved = 0

                    // Direct questions
                    topic.questions.forEach(q => {
                        totalQuestions++
                        topicTotal++
                        const diff = q.difficulty || 'Medium'
                        byDifficulty[diff] = byDifficulty[diff] || { total: 0, solved: 0 }
                        byDifficulty[diff].total++
                        if (progress[q.id]?.solved) {
                            solvedCount++
                            topicSolved++
                            byDifficulty[diff].solved++
                        }
                    })

                    // Subtopic questions
                    topic.subTopics.forEach(st => {
                        st.questions.forEach(q => {
                            totalQuestions++
                            topicTotal++
                            const diff = q.difficulty || 'Medium'
                            byDifficulty[diff] = byDifficulty[diff] || { total: 0, solved: 0 }
                            byDifficulty[diff].total++
                            if (progress[q.id]?.solved) {
                                solvedCount++
                                topicSolved++
                                byDifficulty[diff].solved++
                            }
                        })
                    })

                    byTopic.push({
                        id: topic.id,
                        name: topic.name,
                        total: topicTotal,
                        solved: topicSolved,
                        percentage: topicTotal > 0 ? Math.round((topicSolved / topicTotal) * 100) : 0
                    })
                })

                return {
                    totalQuestions,
                    solvedCount,
                    percentage: totalQuestions > 0 ? Math.round((solvedCount / totalQuestions) * 100) : 0,
                    byDifficulty,
                    byTopic
                }
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

            // Reset progress
            resetProgress: () => {
                localStorage.removeItem(PROGRESS_KEY)
                set({ progress: {} })
            },

            // Export progress
            exportProgress: () => {
                const { progress } = get()
                const dataStr = JSON.stringify(progress, null, 2)
                const blob = new Blob([dataStr], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'dsa-sheet-progress.json'
                a.click()
                URL.revokeObjectURL(url)
            },

            // Import progress
            importProgress: (jsonData) => {
                try {
                    const progress = JSON.parse(jsonData)
                    saveProgress(progress)
                    set({ progress })
                    return true
                } catch (e) {
                    console.error('Failed to import progress:', e)
                    return false
                }
            },
        }),
        {
            name: 'dsa-sheet-store',
            partialize: (state) => ({
                progress: state.progress,
                filters: state.filters,
            }),
        }
    )
)

export default useStore
