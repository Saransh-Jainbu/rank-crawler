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
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search IIT or Branch (e.g., 'Mumbai', 'CSE', 'ECE')..."
          className="input-field text-lg"
        />
        <span className="absolute right-4 top-3 text-2xl">🔍</span>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border-2 border-gray-200 rounded-lg mt-2 shadow-lg z-50 max-h-96 overflow-y-auto">
          {suggestions.map((item, idx) => (
            <button
              key={`${item.type}-${idx}`}
              onClick={() => handleSelectSuggestion(item)}
              className="w-full text-left px-4 py-3 hover:bg-purple-50 border-b last:border-b-0 transition-colors duration-200 font-medium text-gray-700 flex items-center gap-2"
            >
              <span>{item.type === 'iit' ? '🏛️' : '🔧'}</span>
              <div className="flex-1">
                <div>{item.name}</div>
                <div className="text-xs text-gray-500">
                  {item.type === 'iit' ? 'Institute' : 'Branch'}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
