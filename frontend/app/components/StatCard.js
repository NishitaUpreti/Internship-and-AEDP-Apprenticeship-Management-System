export default function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 hover:border-gray-700 transition-colors rounded-2xl p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        {Icon && (
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Icon size={18} />
          </div>
        )}
      </div>
      <div className="my-2.5">
        <p className="text-3xl font-bold text-white tracking-tight">
          {value ?? 0}
        </p>
      </div>
      {description && (
        <p className="text-xs text-gray-500 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

