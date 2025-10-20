import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import '@/styles/main.css'
import { AuthProvider, useAuth } from './providers/AuthProvider.tsx'
import reportWebVitals from './reportWebVitals.ts'
import './styles.css'

// Create a new router instance

const TanStackQueryProviderContext = TanStackQueryProvider.getContext()
// Component to provide auth context to router
function RouterWithAuth() {
  const auth = useAuth()

  // Create router with auth context
  const router = createRouter({
    routeTree,
    context: {
      auth,
      ...TanStackQueryProviderContext,
    },
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
  })

  return <RouterProvider router={router} />
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof RouterWithAuth
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <AuthProvider>
          <RouterWithAuth />
        </AuthProvider>
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
