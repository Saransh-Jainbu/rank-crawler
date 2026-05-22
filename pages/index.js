import Head from 'next/head'
import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import Stats from '../components/Stats'
import BranchTable from '../components/BranchTable'
import IitResultCard from '../components/IitResultCard'

export default function Home() {
  const [allData, setAllData] = useState([])
  const [iitList, setIitList] = useState([])
  const [branchList, setBranchList] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchType, setSearchType] = useState(null) // 'iit' or 'branch'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data.json')
        const data = await response.json()
        setAllData(data)

        const iits = [...new Set(data.map(d => d.Institute))].sort()
        const branches = [...new Set(data.map(d => d['Academic Program Name']))].sort()
        
        setIitList(iits)
        setBranchList(branches)
        setLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const groupDataByBranch = (iit) => {
    const iitData = allData.filter(d => d.Institute === iit)
    const grouped = {}

    iitData.forEach(row => {
      const branch = row['Academic Program Name']
      if (!grouped[branch]) {
        grouped[branch] = []
      }
      grouped[branch].push(row)
    })

    return grouped
  }

  const groupDataByIit = (branch) => {
    const branchData = allData.filter(d => d['Academic Program Name'] === branch)
    const grouped = {}

    branchData.forEach(row => {
      const iit = row.Institute
      if (!grouped[iit]) {
        grouped[iit] = []
      }
      grouped[iit].push(row)
    })

    return grouped
  }

  const handleSelect = (item) => {
    setSelectedItem(item.name)
    setSearchType(item.type)
  }

  const renderResults = () => {
    if (!selectedItem) {
      return (
        <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Search to Begin</h2>
          <p className="text-gray-600 text-base md:text-lg max-w-md">
            Search an IIT (like <span className="font-semibold text-purple-600">Mumbai</span>) or Branch (like <span className="font-semibold text-purple-600">CSE</span>) to view ranking data
          </p>
        </div>
      )
    }

    if (searchType === 'iit') {
      const grouped = groupDataByBranch(selectedItem)
      const branches = Object.keys(grouped).sort()

      if (branches.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">No Results Found</h2>
            <p className="text-gray-600 text-base md:text-lg max-w-md">
              Try searching for another IIT name. Check the spelling and try again.
            </p>
          </div>
        )
      }

      const totalRecords = Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0)

      return (
        <>
          <Stats iit={selectedItem} branchCount={branches.length} totalRecords={totalRecords} />

          <div className="space-y-6">
            {branches.map(branch => (
              <BranchTable key={branch} branch={branch} rows={grouped[branch]} />
            ))}
          </div>

          <div className="mt-8 md:mt-12 p-4 md:p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-lg card animate-slide-in">
            <p className="text-gray-700 text-sm md:text-base">
              <strong className="text-blue-700">ℹ️ Institute View:</strong> <span className="text-gray-600">All branches for <span className="font-bold text-blue-700">{selectedItem}</span> across 6 counseling rounds. Check ranks for each program.</span>
            </p>
          </div>
        </>
      )
    }

    if (searchType === 'branch') {
      const grouped = groupDataByIit(selectedItem)
      const iits = Object.keys(grouped).sort()

      if (iits.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">No Results Found</h2>
            <p className="text-gray-600 text-base md:text-lg max-w-md">
              Try searching for another branch name. Check the spelling and try again.
            </p>
          </div>
        )
      }

      const totalRecords = Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0)

      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 my-6 md:my-8">
            <div className="card p-5 md:p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-600 hover:scale-105 transition-transform animate-slide-in">
              <h3 className="text-gray-600 text-xs md:text-sm font-bold uppercase tracking-wider mb-2">🎯 Program</h3>
              <p className="text-xl md:text-2xl font-black text-purple-700 break-words line-clamp-2">{selectedItem}</p>
            </div>

            <div className="card p-5 md:p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600 hover:scale-105 transition-transform animate-slide-in">
              <h3 className="text-gray-600 text-xs md:text-sm font-bold uppercase tracking-wider mb-2">🏛️ IITs</h3>
              <p className="text-2xl md:text-3xl font-black text-blue-700">{iits.length}</p>
            </div>

            <div className="card p-5 md:p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 border-l-4 border-indigo-600 hover:scale-105 transition-transform animate-slide-in">
              <h3 className="text-gray-600 text-xs md:text-sm font-bold uppercase tracking-wider mb-2">📊 Entries</h3>
              <p className="text-2xl md:text-3xl font-black text-indigo-700">{totalRecords}</p>
            </div>
          </div>

          <div className="space-y-6">
            {iits.map(iit => (
              <IitResultCard key={iit} iit={iit} rows={grouped[iit]} />
            ))}
          </div>

          <div className="mt-8 md:mt-12 p-4 md:p-6 bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg card animate-slide-in">
            <p className="text-gray-700 text-sm md:text-base">
              <strong className="text-green-700">ℹ️ Branch View:</strong> <span className="text-gray-600"><span className="font-bold text-green-700">{selectedItem}</span> rankings across all IITs and 6 counseling rounds. Compare IIT offerings.</span>
            </p>
          </div>
        </>
      )
    }
  }

  return (
    <>
      <Head>
        <title>IIT Rankings Browser - All Rounds</title>
        <meta name="description" content="Browse IIT rankings for all counseling rounds and branches" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="gradient-primary text-white py-12 md:py-16 lg:py-20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 md:mb-3 drop-shadow-lg">🎓 IIT Rankings</h1>
            <p className="text-base sm:text-lg md:text-xl opacity-95 mb-2">Gender-Neutral Seats • All 6 Rounds</p>
            <p className="text-xs sm:text-sm md:text-base opacity-80 bg-white bg-opacity-20 inline-block px-4 py-2 rounded-full">
              Search by IIT 🏛️ or Branch 🔧
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white py-8 md:py-12 shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SearchBar 
              iitList={iitList} 
              branchList={branchList}
              onSelect={handleSelect} 
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
          {loading ? (
            <div className="text-center py-12 md:py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="text-gray-600 mt-4 text-lg">Loading ranking data...</p>
            </div>
          ) : (
            renderResults()
          )}
        </div>

        {/* Footer */}
        <footer className="footer bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 md:py-12 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mb-6">
              <div>
                <p className="text-gray-300 font-semibold mb-1">🚀 IIT Rankings Browser</p>
                <p className="text-gray-400 text-sm">Built with Next.js & React</p>
              </div>
              <div>
                <p className="text-gray-300 font-semibold mb-1">📊 Data Source</p>
                <p className="text-gray-400 text-sm">JOSAA Seat Allotment Results</p>
              </div>
              <div>
                <p className="text-gray-300 font-semibold mb-1">🔍 Total Records</p>
                <p className="text-gray-400 text-sm">1,818 Gender-Neutral Entries</p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-6 text-center">
              <p className="text-gray-400 text-sm">
                © 2026 IIT Rankings Browser. All counseling data from JOSAA (Gender-Neutral Seats Only).
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
