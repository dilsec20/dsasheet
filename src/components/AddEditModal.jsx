import { useState, useEffect } from 'react'
import useStore from '../store/useStore'

const AddEditModal = () => {
    const { modal, closeModal, topics, addTopic, editTopic, addSubTopic, editSubTopic, addQuestion, editQuestion } = useStore()
    const { isOpen, type, mode, data, parentId } = modal

    const [formData, setFormData] = useState({
        name: '',
        title: '',
        difficulty: 'Medium',
        platform: 'leetcode',
        problemUrl: '',
        resource: '',
    })

    useEffect(() => {
        if (mode === 'edit' && data) {
            setFormData({
                name: data.name || '',
                title: data.title || '',
                difficulty: data.difficulty || 'Medium',
                platform: data.platform || 'leetcode',
                problemUrl: data.problemUrl || '',
                resource: data.resource || '',
            })
        } else {
            setFormData({
                name: '',
                title: '',
                difficulty: 'Medium',
                platform: 'leetcode',
                problemUrl: '',
                resource: '',
            })
        }
    }, [mode, data, isOpen])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (type === 'topic') {
            if (mode === 'add') {
                addTopic(formData.name)
            } else {
                editTopic(data.id, formData.name)
            }
        } else if (type === 'subtopic') {
            if (mode === 'add') {
                addSubTopic(parentId, formData.name)
            } else {
                editSubTopic(data.topicId, data.id, formData.name)
            }
        } else if (type === 'question') {
            const questionData = {
                title: formData.title,
                difficulty: formData.difficulty,
                platform: formData.platform,
                problemUrl: formData.problemUrl,
                resource: formData.resource,
            }
            if (mode === 'add') {
                const topicId = parentId?.topicId || parentId
                const subTopicId = parentId?.subTopicId || null
                addQuestion(topicId, subTopicId, questionData)
            } else {
                editQuestion(data.topicId, data.subTopicId, data.id, questionData)
            }
        }

        closeModal()
    }

    if (!isOpen) return null

    const getTitle = () => {
        const action = mode === 'add' ? 'Add' : 'Edit'
        const entity = type?.charAt(0).toUpperCase() + type?.slice(1)
        return `${action} ${entity}`
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay animate-fade-in">
            <div className="glass rounded-2xl w-full max-w-md mx-4 animate-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-white">{getTitle()}</h2>
                    <button
                        onClick={closeModal}
                        className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {(type === 'topic' || type === 'subtopic') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                {type === 'topic' ? 'Topic' : 'Sub-topic'} Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg input-field"
                                placeholder={`Enter ${type} name...`}
                                required
                                autoFocus
                            />
                        </div>
                    )}

                    {type === 'question' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Question Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg input-field"
                                    placeholder="Enter question title..."
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Difficulty
                                    </label>
                                    <select
                                        value={formData.difficulty}
                                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg input-field"
                                    >
                                        <option value="Basic">Basic</option>
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Platform
                                    </label>
                                    <select
                                        value={formData.platform}
                                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg input-field"
                                    >
                                        <option value="leetcode">LeetCode</option>
                                        <option value="geeksforgeeks">GeeksForGeeks</option>
                                        <option value="codestudio">CodeStudio</option>
                                        <option value="interviewbit">InterviewBit</option>
                                        <option value="codeforces">Codeforces</option>
                                        <option value="spoj">SPOJ</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Problem URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.problemUrl}
                                    onChange={(e) => setFormData({ ...formData, problemUrl: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg input-field"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Resource URL (Video/Tutorial)
                                </label>
                                <input
                                    type="url"
                                    value={formData.resource}
                                    onChange={(e) => setFormData({ ...formData, resource: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg input-field"
                                    placeholder="https://youtu.be/..."
                                />
                            </div>
                        </>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 rounded-lg btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg btn-primary"
                        >
                            {mode === 'add' ? 'Create' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEditModal
