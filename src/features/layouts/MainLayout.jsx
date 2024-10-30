import { Suspense } from 'react'

import { CustomSpinner } from '../common/Loadding'
import MainTitle from './components/MainTitle'


const MainLayout = ({ children }) => {
  return <Suspense fallback={<CustomSpinner />} >
    <MainTitle />
    {children}
  </Suspense>
}

export default MainLayout