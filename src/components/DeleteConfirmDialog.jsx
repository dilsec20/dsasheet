import useStore from '../store/useStore'

const DeleteConfirmDialog = () => {
    const { deleteConfirm, closeDeleteConfirm, deleteTopic, deleteSubTopic, deleteQuestion } = useStore()
    const { isOpen, type, id, name, parentId } = deleteConfirm

    const handleDelete = () => {
        if (type === 'topic') {
            deleteTopic(id)
        } else if (type === 'subtopic') {
            deleteSubTopic(parentId, id)
        } else if (type === 'question') {
            deleteQuestion(parentId?.topicId || parentId, parentId?.subTopicId, id)
        }
        closeDeleteConfirm()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay animate-fade-in">
            <div className="glass rounded-2xl w-full max-w-sm mx-4 animate-slide-up">
                {/* Header */}
                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-red-500/20">
                            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Delete {type}?</h2>
                            <p className="text-sm text-gray-400">This action cannot be undone.</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <p className="text-gray-300">
                        Are you sure you want to delete <span className="font-semibold text-white">"{name}"</span>?
                        {type === 'topic' && ' All sub-topics and questions within will also be deleted.'}
                        {type === 'subtopic' && ' All questions within will also be deleted.'}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 p-4 border-t border-white/10">
                    <button
                        onClick={closeDeleteConfirm}
                        className="px-4 py-2 rounded-lg btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 rounded-lg btn-danger"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmDialog
