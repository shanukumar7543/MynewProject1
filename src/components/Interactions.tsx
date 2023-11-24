import React, { useMemo } from 'react';

type Props = {
  interactions: any;
};

const Interactions = ({ interactions }: Props) => {
  const users = useMemo(() => {
    return interactions?.map((interaction: any) => {
      if (interaction?.contact) return interaction?.contact;
      return {
        name: 'Anonymous',
      };
    });
  }, [interactions]);

  return (
    <div className="grid h-full w-full grid-cols-4">
      <div className="col-span-1 h-full px-3 pt-4">
        {users?.map((user: any, i: number) => (
          <div key={`user-${i + 1}`} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <p className="text-sm font-semibold">{user?.name}</p>
          </div>
        ))}
      </div>
      <div className="col-span-3" />
    </div>
  );
};

export default Interactions;
