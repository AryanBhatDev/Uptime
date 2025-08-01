
"use client"
import DashboardComponent from "@/components/Dashboard";
import { useRouter } from "next/navigation";


export default function Dashboard(){
    const router = useRouter()
    return <div>
        <DashboardComponent onSignOut={()=>{
            localStorage.removeItem("token")
            router.push("/")
        }}/>
    </div>
}