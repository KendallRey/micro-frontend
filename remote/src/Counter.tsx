import React, { useState } from 'react'

const Counter = () => {

  const [count, setCount] = useState(0);

  return (
    <div>
      <div>Counter: {count}</div>
      <button onClick={()=>setCount(prev => prev+1)}>Add</button>
    </div>
  )
}

export default Counter