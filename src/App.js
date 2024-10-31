import { lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import MainLayout from './features/layouts/MainLayout'
import ErrorPage from './features/error-pages/ErrorPage'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { loadEnvironment } from './helpers/environment'

const CardManagementPage = lazy(() => import('./features/card-management/CardManagementPage'))
const StudyPage = lazy(() => import('./features/study/StudyPage'))


function App() {
  useEffect(() => {
    loadEnvironment()
  }, [])

  return (
    <MainLayout>
      <Routes>
        <Route path='/' Component={CardManagementPage} />
        <Route path='/card-management' Component={CardManagementPage} />
        <Route path='/study' Component={StudyPage} />
        <Route path='*' Component={ErrorPage} />
      </Routes>
    </MainLayout>
  )
}

export default App
