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
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">📍 Search to Begin</h2>
          <p className="text-gray-600 text-lg">Search an IIT or Branch to view ranking data</p>
        </div>
      )
    }

    if (searchType === 'iit') {
      const grouped = groupDataByBranch(selectedItem)
      const branches = Object.keys(grouped).sort()

      if (branches.length === 0) {
        return (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">📍 No Results Found</h2>
            <p className="text-gray-600 text-lg">Try searching for another IIT name</p>
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

          <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <p className="text-gray-700">
              <strong>ℹ️ Institute View:</strong> All branches for <strong>{selectedItem}</strong> across 6 counseling rounds.
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
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">📍 No Results Found</h2>
            <p className="text-gray-600 text-lg">Try searching for another branch name</p>
          </div>
        )
      }

      const totalRecords = Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0)

      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-600">
              <h3 className="text-gray-600 text-sm font-semibold uppercase mb-2">Program</h3>
              <p className="text-2xl font-bold text-purple-700 break-words">{selectedItem}</p>
            </div>

            <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600">
              <h3 className="text-gray-600 text-sm font-semibold uppercase mb-2">IITs</h3>
              <p className="text-2xl font-bold text-blue-700">{iits.length}</p>
            </div>

            <div className="card p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 border-l-4 border-indigo-600">
              <h3 className="text-gray-600 text-sm font-semibold uppercase mb-2">Total Entries</h3>
              <p className="text-2xl font-bold text-indigo-700">{totalRecords}</p>
            </div>
          </div>

          <div className="space-y-6">
            {iits.map(iit => (
              <IitResultCard key={iit} iit={iit} rows={grouped[iit]} />
            ))}
          </div>

          <div className="mt-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-lg">
            <p className="text-gray-700">
              <strong>ℹ️ Branch View:</strong> <strong>{selectedItem}</strong> rankings across all IITs and 6 counseling rounds.
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

      <main className="min-h-screen">
        {/* Header */}
        <div className="gradient-primary text-white py-16 shadow-xl">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-2 drop-shadow-lg">🎓 IIT Rankings Browser</h1>
            <p className="text-xl opacity-95">Gender-Neutral Seats • All 6 Counseling Rounds</p>
            <p className="text-sm opacity-75 mt-4">Search by IIT 🏛️ or Branch 🔧</p>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white py-12 shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <SearchBar 
              iitList={iitList} 
              branchList={branchList}
              onSelect={handleSelect} 
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="text-gray-600 mt-4 text-lg">Loading ranking data...</p>
            </div>
          ) : (
            renderResults()
          )}
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-300">
              🚀 IIT Rankings Browser • Built with Next.js
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Data Source: JOSAA Seat Allotment Results • Gender-Neutral Seats Only
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
