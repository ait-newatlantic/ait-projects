import React, { useCallback, useEffect, useRef, useState } from "react";

export default function Test() {
  const [count, setCount] = useState(0);
  const isInitialMount = useRef(true);

  const Increment = useCallback(() => {
    const count = 1;
    setCount(1);
    console.log(count);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      Increment();
    }
  }, [Increment]);

  return <div>{count}</div>;
}
