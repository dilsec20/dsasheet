import useStore from '../store/useStore'

const StatsPanel = () => {
    const { getStats, exportProgress, resetProgress } = useStore()
    const stats = getStats()

    const difficultyColors = {
        Easy: 'text-green-400',
        Medium: 'text-yellow-400',
        Hard: 'text-red-400'
    }

    return (
        <div className="glass rounded-xl p-5 mb-6">
            {/* Overall Progress */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Your Progress</h3>
                <span className="text-2xl font-bold gradient-text">{stats.percentage}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-3 bg-dark-800 rounded-full overflow-hidden mb-4">
                <div
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
                    style={{ width: `${stats.percentage}%` }}
                />
            </div>

            <p className="text-sm text-gray-400 mb-4">
                <span className="text-white font-semibold">{stats.solvedCount}</span> of{' '}
                <span className="text-white font-semibold">{stats.totalQuestions}</span> questions solved
            </p>

            {/* By Difficulty */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                {['Easy', 'Medium', 'Hard'].map(diff => (
                    <div key={diff} className="bg-dark-800/50 rounded-lg p-3 text-center">
                        <p className={`text-xs font-medium ${difficultyColors[diff]}`}>{diff}</p>
                        <p className="text-lg font-bold text-white">
                            {stats.byDifficulty[diff]?.solved || 0}
                            <span className="text-xs text-gray-500">/{stats.byDifficulty[diff]?.total || 0}</span>
                        </p>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    onClick={exportProgress}
                    className="flex-1 px-3 py-2 text-xs font-medium bg-dark-800 hover:bg-dark-700 text-gray-300 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export
                </button>
                <button
                    onClick={() => {
                        if (window.confirm('Reset all progress? This cannot be undone.')) {
                            resetProgress()
                        }
                    }}
                    className="flex-1 px-3 py-2 text-xs font-medium bg-dark-800 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset
                </button>
            </div>
        </div>
    )
}

export default StatsPanel
