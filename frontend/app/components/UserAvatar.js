export default function UserAvatar({ name, size = 36 }) {
  const getInitials = (n) => {
    if (!n) return "U";
    const parts = n.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-orange-600 text-white font-bold text-xs flex items-center justify-center select-none"
    >
      {getInitials(name)}
    </div>
  );
}

