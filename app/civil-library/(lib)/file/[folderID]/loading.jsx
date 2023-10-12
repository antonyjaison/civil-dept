"use client"
import { Loader } from "lucide-react"
import { useState } from "react"
import { useEffect } from "react"


function Loading() {
    const [show, setShow] = useState(false)
    useEffect(() => {
        const id = setTimeout(() => {
            setShow(true)
        }, 500)

        return () => {
            clearTimeout(id)
        }
    },[])
  return (
    <div style={{textAlign: "center", display: show ? "block": "none"}}><Loader style={{marginTop: "10rem"}} className="spin" color="#232323" /></div>
  )
}

export default Loading