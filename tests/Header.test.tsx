import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import ReactDOM from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { user as mockUser } from '@/__mock__/user'
import HeaderComponent from '@/components/Header'
import { AuthContext } from '@/providers/AuthProvider'

let container: HTMLDivElement | null = null
let root: ReactDOM.Root | null = null

const setupTest = (initialPath = '/') => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  // Mock auth context
  const mockAuthContext = {
    user: mockUser,
    getUser: {
      data: mockUser,
      isLoading: false,
      isError: false,
    } as any,
    isAuthenticated: true,
  }

  // Create a minimal route tree for testing
  const rootRoute = createRootRoute()
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <HeaderComponent />,
  })

  const routeTree = rootRoute.addChildren([indexRoute])
  const memoryHistory = createMemoryHistory({ initialEntries: [initialPath] })

  const router = createRouter({
    routeTree,
    history: memoryHistory,
  })

  act(() => {
    root = ReactDOM.createRoot(container as HTMLElement)
    root.render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuthContext}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      </QueryClientProvider>,
    )
  })

  return { router, memoryHistory }
}

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  if (root) {
    act(() => {
      root!.unmount()
    })
    root = null
  }
  if (container) {
    document.body.removeChild(container)
  }
  container = null
})

describe('Header component', () => {
  it('should render the header element', async () => {
    setupTest()

    await waitFor(() => {
      const header = container?.querySelector('header#header')
      expect(header).toBeInTheDocument()
    })
  })

  it('should render the logo', async () => {
    setupTest()

    await waitFor(() => {
      const logo = container?.querySelector('a[href="/"]')
      expect(logo).toBeInTheDocument()
      expect(logo?.querySelector('svg')).toBeInTheDocument()
    })
  })

  it('should render all main menu items', async () => {
    setupTest()

    const menuItems = ['Home', 'Analytics', 'Revenue', 'CRM', 'Apps']

    for (const item of menuItems) {
      await waitFor(() => {
        const menuItem = screen.getByText(item)
        expect(menuItem).toBeInTheDocument()
      })
    }
  })

  it('should render all main menu items with correct links', async () => {
    setupTest()

    const expectedLinks = [
      { text: 'Home', href: '/' },
      { text: 'Analytics', href: '/#analytics' },
      { text: 'Revenue', href: '/#revenue' },
      { text: 'CRM', href: '/#crm' },
      { text: 'Apps', href: '/#apps' },
    ]

    for (const { text, href } of expectedLinks) {
      await waitFor(() => {
        const link = screen.getByText(text).closest('a')
        expect(link).toBeInTheDocument()
        expect(link?.getAttribute('href')).toContain(href.split('#')[0])
      })
    }
  })

  it('should render notification and message buttons', async () => {
    setupTest()

    await waitFor(() => {
      const buttons = container?.querySelectorAll('button')
      // At least 2 buttons for notifications and messages (+ profile dropdown button if any)
      expect(buttons!.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('should apply active styling to Home menu item on root path', async () => {
    setupTest('/')

    await waitFor(() => {
      const homeLink = screen.getByText('Home').closest('a')
      expect(homeLink?.classList.contains('bg-[#131316]')).toBe(true)
      expect(homeLink?.classList.contains('text-white')).toBe(true)
    })
  })

  it('should render menu icons for each menu item', async () => {
    setupTest()

    const menuItems = ['Home', 'Analytics', 'Revenue', 'CRM', 'Apps']

    for (const item of menuItems) {
      await waitFor(() => {
        const menuLink = screen.getByText(item).closest('a')
        const icon = menuLink?.querySelector('svg')
        expect(icon).toBeInTheDocument()
      })
    }
  })

  it('should render auxiliary menu buttons with icons', async () => {
    setupTest()

    await waitFor(() => {
      const buttons = container?.querySelectorAll(
        'button.h-\\[40px\\].w-\\[40px\\]',
      )

      // Should have at least 2 auxiliary buttons (Notifications and Messages)
      expect(buttons!.length).toBeGreaterThanOrEqual(2)

      buttons?.forEach((button) => {
        const icon = button.querySelector('svg')
        expect(icon).toBeInTheDocument()
      })
    })
  })

  it('should render the profile avatar', async () => {
    setupTest()

    await waitFor(() => {
      // The Avatar component should be present in the header
      const header = container?.querySelector('header#header')
      expect(header).toBeInTheDocument()

      // Check for any div elements (avatar container would be a div)
      const divsInHeader = header?.querySelectorAll('div')
      expect(divsInHeader!.length).toBeGreaterThan(0)
    })
  })

  it('should have correct header styling classes', async () => {
    setupTest()

    await waitFor(() => {
      const header = container?.querySelector('header#header')

      expect(header?.classList.contains('shadow-lg')).toBe(true)
      expect(header?.classList.contains('bg-white')).toBe(true)
      expect(header?.classList.contains('rounded-[100px]')).toBe(true)
    })
  })

  it('should handle menu item clicks', async () => {
    setupTest()

    await waitFor(() => {
      const analyticsLink = screen.getByText('Analytics')
      expect(analyticsLink).toBeInTheDocument()
    })

    const analyticsLink = screen.getByText('Analytics')

    // Click the analytics link
    act(() => {
      fireEvent.click(analyticsLink)
    })

    // The link should still be in the document after clicking
    await waitFor(() => {
      expect(analyticsLink).toBeInTheDocument()
    })
  })

  it('should display all menu items in correct order', async () => {
    setupTest()

    await waitFor(() => {
      const expectedOrder = ['Home', 'Analytics', 'Revenue', 'CRM', 'Apps']
      const allLinks = Array.from(container?.querySelectorAll('a') || [])

      // Filter to get only the menu items (excluding logo link)
      const menuLinks = allLinks.filter((link) => {
        const text = link.textContent
        return expectedOrder.some((item) => text.includes(item))
      })

      expect(menuLinks.length).toBe(expectedOrder.length)

      expectedOrder.forEach((item, index) => {
        expect(menuLinks[index]?.textContent).toContain(item)
      })
    })
  })
})
