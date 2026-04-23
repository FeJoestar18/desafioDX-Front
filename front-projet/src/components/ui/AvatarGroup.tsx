interface AvatarGroupProps {
  users: { id: string; name: string; avatarUrl: string }[];
  max?: number;
}

export function AvatarGroup({ users, max = 3 }: AvatarGroupProps) {
  const displayUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <div className="flex items-center">
      {displayUsers.map((user, index) => (
        <div
          key={user.id}
          className="relative rounded-full w-10 h-10 border-2 border-white overflow-hidden shadow-sm"
          style={{ 
            marginLeft: index > 0 ? '-8px' : '0',
            zIndex: users.length - index
          }}
          title={user.name}
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div
          className="relative flex items-center justify-center rounded-full w-10 h-10 border-2 border-white bg-[#F1F5F9] text-xs font-semibold text-text-secondary shadow-sm"
          style={{ 
            marginLeft: '-8px',
            zIndex: 0
          }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
