import { useContext } from "react"
import Spinner from "../layout/Spinner"
import UserItem from "./UserItem"
import GithubContext from "../../context/github/GithubContext"


function UserResult() {  
  
  const {users, loading } = useContext(GithubContext)
    
    
    if (!loading){
        return (
          <div className="grid gap-6 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {users && users.map((user) => (
              <UserItem key={user.id} user={user}/>
          ))}
          </div>
    )
    }else{
        return <Spinner />
    }    
}

export default UserResult
