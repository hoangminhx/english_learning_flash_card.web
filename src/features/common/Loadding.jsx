import { Spinner } from 'reactstrap'

export const CustomSpinner = () => {
  return (
    <div className='d-flex justify-content-center'>
      <Spinner
        color='primary'
      >
        Loading...
      </Spinner>
    </div>)
}

