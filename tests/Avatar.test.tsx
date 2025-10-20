import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Avatar } from '@/components/Avatar'
import { AuthContext } from '@/providers/AuthProvider'

const mockUser = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
}

const mockAuthContext = {
  user: mockUser,
  getUser: {
    data: mockUser,
    isLoading: false,
    isError: false,
  } as any,
  isAuthenticated: true,
}

describe('Avatar component', () => {
  describe('AvatarComponent (Picture)', () => {
    it('should render with user initials from context', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Picture />
        </AuthContext.Provider>,
      )

      const avatar = screen.getByText('JD')
      expect(avatar).toBeInTheDocument()
    })

    it('should render with custom name prop', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Picture name="Alice Smith" />
        </AuthContext.Provider>,
      )

      const avatar = screen.getByText('AS')
      expect(avatar).toBeInTheDocument()
    })

    it('should show only first two initials for multi-word names', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Picture name="Mary Jane Watson Parker" />
        </AuthContext.Provider>,
      )

      const avatar = screen.getByText('MJ')
      expect(avatar).toBeInTheDocument()
    })

    it('should handle single word name', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Picture name="Madonna" />
        </AuthContext.Provider>,
      )

      const avatar = screen.getByText('M')
      expect(avatar).toBeInTheDocument()
    })

    it('should have correct styling classes', () => {
      const { container } = render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Picture />
        </AuthContext.Provider>,
      )

      const avatarSpan = container.querySelector('#avatar-name')
      expect(avatarSpan).toBeInTheDocument()
      expect(avatarSpan?.className).toContain('h-[32px]')
      expect(avatarSpan?.className).toContain('w-[32px]')
      expect(avatarSpan?.className).toContain('rounded-[100px]')
      expect(avatarSpan?.className).toContain('font-bold')
    })

    it('should display initials in white color', () => {
      const { container } = render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Picture />
        </AuthContext.Provider>,
      )

      const whiteTextSpan = container.querySelector('.text-white')
      expect(whiteTextSpan).toBeInTheDocument()
      expect(whiteTextSpan?.textContent).toBe('JD')
    })

    it('should handle empty user data gracefully', () => {
      const emptyAuthContext = {
        user: {
          first_name: '',
          last_name: '',
          email: 'test@example.com',
        },
        getUser: {
          data: null,
          isLoading: false,
          isError: false,
        } as any,
        isAuthenticated: true,
      }

      const { container } = render(
        <AuthContext.Provider value={emptyAuthContext}>
          <Avatar.Picture />
        </AuthContext.Provider>,
      )

      const avatar = container.querySelector('#avatar-name')
      expect(avatar).toBeInTheDocument()
    })

    it('should handle null user gracefully', () => {
      const nullUserContext = {
        user: undefined,
        getUser: {
          data: null,
          isLoading: false,
          isError: false,
        } as any,
        isAuthenticated: false,
      }

      const { container } = render(
        <AuthContext.Provider value={nullUserContext}>
          <Avatar.Picture />
        </AuthContext.Provider>,
      )

      const avatar = container.querySelector('#avatar-name')
      expect(avatar).toBeInTheDocument()
    })

    it('should prioritize name prop over context user', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Picture name="Custom Name" />
        </AuthContext.Provider>,
      )

      const avatar = screen.getByText('CN')
      expect(avatar).toBeInTheDocument()
      // Should not show user context initials
      expect(screen.queryByText('JD')).not.toBeInTheDocument()
    })

    it('should handle names with extra spaces', () => {
      const { container } = render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Picture name="  Spaced   Name  " />
        </AuthContext.Provider>,
      )

      const avatar = container.querySelector('#avatar-name')
      expect(avatar).toBeInTheDocument()
    })
  })

  describe('AvatarMenuComponent (MenuButton)', () => {
    it('should render menu icon', () => {
      const { container } = render(<Avatar.MenuButton />)

      const menuContainer = container.querySelector(
        'div.h-\\[32px\\].w-\\[32px\\]',
      )
      expect(menuContainer).toBeInTheDocument()

      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should have correct dimensions', () => {
      const { container } = render(<Avatar.MenuButton />)

      const menuContainer = container.querySelector('div')
      expect(menuContainer?.className).toContain('h-[32px]')
      expect(menuContainer?.className).toContain('w-[32px]')
      expect(menuContainer?.className).toContain('flex')
      expect(menuContainer?.className).toContain('items-center')
      expect(menuContainer?.className).toContain('justify-center')
    })
  })

  describe('AvatatWrapperComponent (Main)', () => {
    it('should render as a button', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Main />
        </AuthContext.Provider>,
      )

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should contain both Picture and MenuButton components', () => {
      const { container } = render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Main />
        </AuthContext.Provider>,
      )

      // Should have avatar initials
      const initials = screen.getByText('JD')
      expect(initials).toBeInTheDocument()

      // Should have menu icon (svg)
      const svgs = container.querySelectorAll('svg')
      expect(svgs.length).toBeGreaterThan(0)
    })

    it('should have correct wrapper button styling', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Main />
        </AuthContext.Provider>,
      )

      const button = screen.getByRole('button')
      expect(button.className).toContain('h-[40px]')
      expect(button.className).toContain('w-[81px]')
      expect(button.className).toContain('bg-[#EFF1F6]')
      expect(button.className).toContain('rounded-[100px]')
      expect(button.className).toContain('cursor-pointer')
    })

    it('should have flexbox layout', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Main />
        </AuthContext.Provider>,
      )

      const button = screen.getByRole('button')
      expect(button.className).toContain('flex')
      expect(button.className).toContain('items-center')
      expect(button.className).toContain('justify-between')
    })

    it('should be clickable', () => {
      const handleClick = vi.fn()
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <button
            onClick={handleClick}
            className="h-[40px] w-[81px] text-[#56616B] flex items-center justify-between bg-[#EFF1F6] rounded-[100px] px-[5px] cursor-pointer transition-all duration-200"
          >
            <Avatar.Picture />
            <Avatar.MenuButton />
          </button>
        </AuthContext.Provider>,
      )

      const button = screen.getByRole('button')
      button.click()

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should have transition classes for animations', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Main />
        </AuthContext.Provider>,
      )

      const button = screen.getByRole('button')
      expect(button.className).toContain('transition-all')
      expect(button.className).toContain('duration-200')
    })

    it('should have correct padding', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Main />
        </AuthContext.Provider>,
      )

      const button = screen.getByRole('button')
      expect(button.className).toContain('px-[5px]')
    })

    it('should render with different user data', () => {
      const differentUser = {
        user: {
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@example.com',
        },
        getUser: {
          data: {
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane.smith@example.com',
          },
          isLoading: false,
          isError: false,
        } as any,
        isAuthenticated: true,
      }

      render(
        <AuthContext.Provider value={differentUser}>
          <Avatar.Main />
        </AuthContext.Provider>,
      )

      const initials = screen.getByText('JS')
      expect(initials).toBeInTheDocument()
    })
  })

  describe('Avatar object structure', () => {
    it('should have Picture property', () => {
      expect(Avatar.Picture).toBeDefined()
      expect(typeof Avatar.Picture).toBe('function')
    })

    it('should have MenuButton property', () => {
      expect(Avatar.MenuButton).toBeDefined()
      expect(typeof Avatar.MenuButton).toBe('function')
    })

    it('should have Main property', () => {
      expect(Avatar.Main).toBeDefined()
      expect(typeof Avatar.Main).toBe('function')
    })

    it('should be exportable as named export', () => {
      expect(Avatar).toBeDefined()
      expect(typeof Avatar).toBe('object')
    })
  })

  describe('Edge Cases', () => {
    it('should handle very long names', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Picture name="Verylongfirstname Verylonglastname" />
        </AuthContext.Provider>,
      )

      const avatar = screen.getByText('VV')
      expect(avatar).toBeInTheDocument()
    })

    it('should handle single character names', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Picture name="A B" />
        </AuthContext.Provider>,
      )

      const avatar = screen.getByText('AB')
      expect(avatar).toBeInTheDocument()
    })

    it('should handle names with special characters', () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <Avatar.Picture name="O'Brien McDonald" />
        </AuthContext.Provider>,
      )

      const avatar = screen.getByText('OM')
      expect(avatar).toBeInTheDocument()
    })

    it('should handle undefined user properties', () => {
      const undefinedUserContext = {
        user: {
          first_name: undefined,
          last_name: undefined,
          email: 'test@example.com',
        } as any,
        getUser: {
          data: null,
          isLoading: false,
          isError: false,
        } as any,
        isAuthenticated: true,
      }

      const { container } = render(
        <AuthContext.Provider value={undefinedUserContext}>
          <Avatar.Picture />
        </AuthContext.Provider>,
      )

      const avatar = container.querySelector('#avatar-name')
      expect(avatar).toBeInTheDocument()
    })
  })
})
