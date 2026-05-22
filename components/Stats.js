export default function Stats({ iit, branchCount, totalRecords }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 my-6 md:my-8">
      <div className="card p-5 md:p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-600 hover:scale-105 transition-transform animate-slide-in">
        <h3 className="text-gray-600 text-xs md:text-sm font-bold uppercase tracking-wider mb-2">🏛️ Institute</h3>
        <p className="text-xl md:text-2xl font-black text-purple-700 break-words line-clamp-2">{iit}</p>
      </div>

      <div className="card p-5 md:p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600 hover:scale-105 transition-transform animate-slide-in">
        <h3 className="text-gray-600 text-xs md:text-sm font-bold uppercase tracking-wider mb-2">📚 Branches</h3>
        <p className="text-2xl md:text-3xl font-black text-blue-700">{branchCount}</p>
      </div>

      <div className="card p-5 md:p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 border-l-4 border-indigo-600 hover:scale-105 transition-transform animate-slide-in">
        <h3 className="text-gray-600 text-xs md:text-sm font-bold uppercase tracking-wider mb-2">📊 Entries</h3>
        <p className="text-2xl md:text-3xl font-black text-indigo-700">{totalRecords}</p>
      </div>
    </div>
  )
}
