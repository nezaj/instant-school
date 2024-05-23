'use client';

import React, { useState } from 'react';
import { init } from '@instantdb/react';
import { clientConfig } from '@/data/config';

const db = init(clientConfig)
console.log(clientConfig)

const { useQuery } = db;

function App() {
  const { isLoading, error, data } = useQuery({
    users: {}
  })
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  const { users } = data;
  console.log("data", data);
  return (
    <div className="p-4 space-y-2">
      <div className="text-lg font-semibold">Our LMS</div>
      <div>
        <div>Users</div>
        {users.map(user => (
          <div key={user.id} className="flex items-center space-x-4">
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
