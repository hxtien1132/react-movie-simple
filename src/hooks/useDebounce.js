import { useEffect } from "react";
import { useState } from "react";

export default function useDebounce(initialzeValue="",delay=1000){
    const [debounceValue,setDebounceValue] = useState(initialzeValue)
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounceValue(initialzeValue);
        },delay);
        return ()=>{
            clearTimeout(timer)
        }
          
    },[delay,initialzeValue])
    return debounceValue
}