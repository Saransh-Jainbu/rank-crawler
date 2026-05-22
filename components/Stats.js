export default function Stats({ iit, branchCount, totalRecords }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-600">
        <h3 className="text-gray-600 text-sm font-semibold uppercase mb-2">Institute</h3>
        <p className="text-2xl font-bold text-purple-700 break-words">{iit}</p>
      </div>

      <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600">
        <h3 className="text-gray-600 text-sm font-semibold uppercase mb-2">Branches</h3>
        <p className="text-2xl font-bold text-blue-700">{branchCount}</p>
      </div>

      <div className="card p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 border-l-4 border-indigo-600">
        <h3 className="text-gray-600 text-sm font-semibold uppercase mb-2">Total Entries</h3>
        <p className="text-2xl font-bold text-indigo-700">{totalRecords}</p>
      </div>
    </div>
  )
}
