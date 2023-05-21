import { useEffect, useState } from "react";

const getValueByKey = (storageKey) => JSON.parse(localStorage.getItem(storageKey) || "[]");

export default function useStorage(storageKey) {
    const [value, setValue] = useState(() => getValueByKey(storageKey));

    useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}