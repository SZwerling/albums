import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users');
    await pause(1000)
    return response.data;
})

export { fetchUsers };


// FOR DEV ONLY
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}



// fetchUsers will have three properties automatically assigned to it
// .pending === 'users/fetch/pending' .fulfilled .rejected