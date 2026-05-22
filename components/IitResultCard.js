export default function IitResultCard({ iit, rows }) {
  // Sort rows by round
  const sortedRows = [...rows].sort((a, b) => parseInt(a.Round) - parseInt(b.Round))

  return (
    <div className="card overflow-hidden mb-8 animate-slide-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 md:px-6 py-4 md:py-5">
        <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🏛️</span>
          <span className="truncate">{iit}</span>
        </h3>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="px-6 py-4 text-left font-bold text-gray-700">Round</th>
              <th className="px-6 py-4 text-left font-bold text-gray-700">Quota</th>
              <th className="px-6 py-4 text-left font-bold text-gray-700">Seat Type</th>
              <th className="px-6 py-4 text-right font-bold text-gray-700">Opening Rank</th>
              <th className="px-6 py-4 text-right font-bold text-gray-700">Closing Rank</th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 font-bold text-blue-600 text-lg">Round {row.Round}</td>
                <td className="px-6 py-4">
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {row.Quota}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">{row['Seat Type']}</td>
                <td className="px-6 py-4 text-right font-bold text-gray-800">
                  {row['Opening Rank'] === '-' ? '—' : row['Opening Rank'].toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right font-bold text-gray-800">
                  {row['Closing Rank'] === '-' ? '—' : row['Closing Rank'].toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 p-4">
        {sortedRows.map((row, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-300">
              <span className="font-bold text-blue-600 text-lg">Round {row.Round}</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                {row.Quota}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Seat Type:</span>
                <span className="font-semibold text-gray-800">{row['Seat Type']}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Opening:</span>
                <span className="font-bold text-gray-800">
                  {row['Opening Rank'] === '-' ? '—' : row['Opening Rank'].toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Closing:</span>
                <span className="font-bold text-gray-800">
                  {row['Closing Rank'] === '-' ? '—' : row['Closing Rank'].toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
