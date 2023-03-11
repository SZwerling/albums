import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users');

    return response.data;
})

export { fetchUsers };



// fetchUsers will have three properties automatically assigned to it
// .pending === 'users/fetch/pending' .fulfilled .rejected