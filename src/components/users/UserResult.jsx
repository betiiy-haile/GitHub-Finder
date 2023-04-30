import { useEffect } from "react"

function UserResult() {    
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
        console.log(data)
    } 

    return (
    <div>
      User Result
    </div>
  )
}

export default UserResult
