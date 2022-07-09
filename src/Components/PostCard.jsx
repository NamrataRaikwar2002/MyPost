import {Box,Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { afterDeletePostHandler } from '../redux/postSlice';

const PostCard = ({item,handleOpen, setPostData,postData, setValue}) => {
    const dispatch = useDispatch();
    const {post} = useSelector((state) => state.posts)

    const deletePostHandler = (id) => {
        const postsAfterDelete = post.filter((item) => item.id !== id)
        dispatch(afterDeletePostHandler(postsAfterDelete))
    }

    const editPostHandler = (id) => {
      handleOpen()  
      const editAblePost = post.find((item) => item.id === id)
      setPostData(editAblePost)
    }

    setValue("title",postData?.title)
    setValue("body", postData?.body)
 return(
    <Box
    sx={{
      width:'60%',
      backgroundColor: '#cfd8dc',
    }}
    borderRadius='.5rem'
    p='1rem'
    key={item.id}
  >
  <Box display='flex' gap='1rem' flexDirection='column'>
   <Typography variant='h5' fontWeight='bold'>{item.title}</Typography>
   <Typography color="text.primary">{item.body}</Typography>
  </Box>
   <Box display={'flex'} gap='2rem' justifyContent='flex-end'>
   <EditIcon sx={{color:'#37474f'}}  cursor='pointer' onClick={() => editPostHandler(item.id)}/>
   <DeleteIcon sx={{color:'#37474f'}} cursor='pointer' onClick={() => deletePostHandler(item.id)}/>
   </Box>
  </Box>
   )
}

export {PostCard}