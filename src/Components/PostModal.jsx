import { Close} from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  Modal,
  Box,
  Input,
  TextareaAutosize,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { addPostHandler, editPost } from '../redux/postSlice'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: [200,400],
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
}

const PostModal = ({ open, handleClose , postData, handleSubmit, register}) => {
  const {post} = useSelector((state)=> state.posts)
  const  dipatch = useDispatch()
  let newPosts = []

  const onSubmit = (data) => {
    data['id'] = uuidv4()
    handleClose()
    let checkPostToEdit = post.some((item) => item.id === postData?.id)
    if(checkPostToEdit){
      let indexOfpostToEdit = post.findIndex((item) => item.id === postData.id)
     dipatch(editPost({indexOfpostToEdit, data}))
    }else{
      newPosts.unshift(data, ...post)
      dipatch(addPostHandler(newPosts))
    }
  }


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={style}
          display="flex"
          flexDirection="column"
          gap="16px"
          justifyContent="flex-end"
        >
            <Box display="flex" justifyContent="flex-end">
              <Close cursor="pointer" onClick={handleClose} />
            </Box>
            <Input
              id="modal-modal-title"
              variant="h6"
              component="h2"
              placeholder="title"
              {...register('title', { required: true })}
            />
            <TextareaAutosize
              id="modal-modal-description"
              sx={{ mt: 2 }}
              maxRows={4}
              style={{ resize: 'none', height: '80px' }}
              placeholder="write something..."
              {...register('body', { required: true })}
            />
            <Button variant="contained" type="submit">
              Post
            </Button>
        </Box>
          </form>
      </Modal>
    </>
  )
}

export { PostModal }
