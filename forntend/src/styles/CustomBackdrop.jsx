import { Backdrop, CircularProgress } from '@mui/material'

const CustomBackdrop = () => {

    
  return (
      <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
         open={true}
      >
          <CircularProgress color="inherit" />
      </Backdrop>
  )
}

export default CustomBackdrop
