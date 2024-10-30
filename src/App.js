import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import MainLayout from './features/layouts/MainLayout'
import ErrorPage from './features/error-pages/ErrorPage'

const CardManagementPage = lazy(() => import('./features/card-management/CardManagementPage'))
const StudyPage = lazy(() => import('./features/study/StudyPage'))


function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' />
        <Route path='/card-management' Component={CardManagementPage} />
        <Route path='/study' Component={StudyPage} />
        <Route path='*' Component={ErrorPage} />
      </Routes>
    </MainLayout>
  )
}

export default App
