import { useEffect, useState } from "react"
import Spinner from "../layout/Spinner"
import UserItem from "./UserItem"

function UserResult() {   
    
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const response = await fetch(`https://api.github.com/users`, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        })
        const data = await response.json();
        // response.json(data);
        setUsers(data)
        setLoading(false)
    } 
    if (!loading){
        return (
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
            <UserItem key={user.id} user={user} />
        ))}
        </div>
    )
    }else{
        return <Spinner />
    }    
}

export default UserResult
