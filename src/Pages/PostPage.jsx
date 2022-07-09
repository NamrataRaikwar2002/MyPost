import { useEffect, useState } from 'react'
import { PostCard, PostModal } from '../Components'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../redux/postThunk'
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useForm } from 'react-hook-form'

const PostPage = () => {
  const [open, setOpen] = useState(false)
  const [postData, setPostData] = useState(null)
  const handleClose = () => setOpen(false)
  const handleOpen = () => {setOpen(true); setPostData(null)}
  const dispatch = useDispatch()
  const { post } = useSelector((state) => state.posts)
  const { register, handleSubmit, reset, setValue } = useForm()

  useEffect(() => {
    dispatch(getPost())
  }, [])

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        mt='2rem'
        gap='2rem'
      >
        <Typography variant="h5" style={{ textalign: 'center', fontWeight:'bold' }}>
          TOTAL POSTS: {post.length}
        </Typography>
        <PostModal
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          postData={postData}
          setPostData={setPostData}
          register={register}
          handleSubmit={handleSubmit}
          reset={reset}
          setValue={setValue}
        />
        <Box top="7rem" left="2rem">
          <Button variant="contained" onClick={handleOpen}>
            <AddIcon /> Create Post
          </Button>
        </Box>
        <Box
          display="flex"
          gap="2rem"
          flexDirection="column"
          alignItems="center"
        >
          {post.length !== 0 ? post?.map((item) => {
            return (
              <PostCard
                key={item.id}
                item={item}
                handleOpen={handleOpen}
                postData={postData}
                setPostData={setPostData}
                setValue={setValue}
              />
            )
          }) : <Typography variant='h4' fontWeight='bold'>Loading...</Typography>}
        </Box>
      </Box>
    </>
  )
}

export { PostPage }
