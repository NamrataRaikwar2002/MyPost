import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const getPost = createAsyncThunk( 'posts/getPost',async() => {
    try{
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts") 
        return response.data
    }
    catch(error){
        console.log(error);
    }
})

export {getPost};