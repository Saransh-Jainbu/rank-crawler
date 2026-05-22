import { useState } from 'react'

export default function SearchBar({ iitList, branchList, onSelect }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim() === '') {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const lowerValue = value.toLowerCase()

    // Filter both IITs and branches
    const filteredIITs = iitList
      .filter(iit => iit.toLowerCase().includes(lowerValue))
      .map(iit => ({ type: 'iit', name: iit }))
      .slice(0, 5)

    const filteredBranches = branchList
      .filter(branch => branch.toLowerCase().includes(lowerValue))
      .map(branch => ({ type: 'branch', name: branch }))
      .slice(0, 5)

    setSuggestions([...filteredIITs, ...filteredBranches])
    setShowSuggestions(true)
  }

  const handleSelectSuggestion = (item) => {
    setQuery(item.name)
    setShowSuggestions(false)
    onSelect(item)
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search IIT or Branch..."
          className="input-field text-base md:text-lg w-full pr-12 placeholder-gray-400"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">🔍</span>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border-2 border-gray-200 rounded-xl mt-2 shadow-xl z-50 max-h-96 overflow-y-auto animate-slide-in">
          {suggestions.map((item, idx) => (
            <button
              key={`${item.type}-${idx}`}
              onClick={() => handleSelectSuggestion(item)}
              className="w-full text-left px-4 md:px-6 py-3 md:py-4 hover:bg-purple-50 border-b last:border-b-0 transition-colors duration-150 font-medium text-gray-700 flex items-center gap-3 group"
            >
              <span className="text-xl md:text-2xl flex-shrink-0">{item.type === 'iit' ? '🏛️' : '🔧'}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-800 truncate group-hover:text-purple-700">{item.name}</div>
                <div className="text-xs text-gray-500">
                  {item.type === 'iit' ? '🏫 Institute' : '📚 Branch'}
                </div>
              </div>
              <span className="text-gray-300 group-hover:text-purple-400 flex-shrink-0">→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
