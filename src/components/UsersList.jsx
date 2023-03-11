
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";

function UsersList() {
    const dispatch = useDispatch()
    const {isLoading, data, error} = useSelector((state) => {
        return state.users
    })

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    if(isLoading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>Error fetching data..</div>
    }

    return (
        <h1 style={{fontSize:40}}>{data.length}</h1>
    )
}

export default UsersList;