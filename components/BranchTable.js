export default function BranchTable({ branch, rows }) {
  // Sort rows by round
  const sortedRows = [...rows].sort((a, b) => parseInt(a.Round) - parseInt(b.Round))

  return (
    <div className="card overflow-hidden mb-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span>🔧</span>
          {branch}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Round</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Quota</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">Seat Type</th>
              <th className="px-6 py-4 text-right font-semibold text-gray-700">Opening Rank</th>
              <th className="px-6 py-4 text-right font-semibold text-gray-700">Closing Rank</th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 font-bold text-purple-600">Round {row.Round}</td>
                <td className="px-6 py-4">
                  <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {row.Quota}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{row['Seat Type']}</td>
                <td className="px-6 py-4 text-right font-semibold text-gray-800">
                  {row['Opening Rank'] === '-' ? '—' : row['Opening Rank'].toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right font-semibold text-gray-800">
                  {row['Closing Rank'] === '-' ? '—' : row['Closing Rank'].toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
