import { RouterProvider } from 'react-router-dom'
import { router } from './Routing/AppRoutes'
import TokenContextProvider from './Context/TokenContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserprofileContextProvider from './Context/UserprofileContext'
import UsersDataContext from './Context/UsersDataContext'

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <TokenContextProvider>
        <UserprofileContextProvider>
          <UsersDataContext>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </UsersDataContext>
        </UserprofileContextProvider>
      </TokenContextProvider>
    </>
  )
}

export default App
