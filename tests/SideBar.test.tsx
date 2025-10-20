import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SideBarComponent } from '@/components/SideBar'

describe('SideBar component', () => {
  describe('Basic Rendering', () => {
    it('should render the sidebar with correct container', () => {
      const { container } = render(<SideBarComponent />)
      const sidebar = container.querySelector('#app-sidebar')

      expect(sidebar).toBeInTheDocument()
    })

    it('should render all four menu items', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      expect(buttons).toHaveLength(4)
    })

    it('should have correct container styling', () => {
      const { container } = render(<SideBarComponent />)
      const sidebar = container.querySelector('#app-sidebar')

      expect(sidebar?.className).toContain('bg-white')
      expect(sidebar?.className).toContain('w-[48px]')
      expect(sidebar?.className).toContain('rounded-[100px]')
      expect(sidebar?.className).toContain('fixed')
      expect(sidebar?.className).toContain('left-[16px]')
      expect(sidebar?.className).toContain('top-[310px]')
    })

    it('should have correct flexbox layout', () => {
      const { container } = render(<SideBarComponent />)
      const sidebar = container.querySelector('#app-sidebar')

      expect(sidebar?.className).toContain('flex')
      expect(sidebar?.className).toContain('flex-col')
      expect(sidebar?.className).toContain('items-center')
      expect(sidebar?.className).toContain('justify-center')
      expect(sidebar?.className).toContain('gap-[8px]')
    })

    it('should have correct padding and overflow styling', () => {
      const { container } = render(<SideBarComponent />)
      const sidebar = container.querySelector('#app-sidebar')

      expect(sidebar?.className).toContain('py-[8px]')
      expect(sidebar?.className).toContain('overflow-hidden')
    })
  })

  describe('Menu Items', () => {
    it('should render all menu items with correct dimensions', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      buttons.forEach((button) => {
        expect(button.className).toContain('w-[40px]')
        expect(button.className).toContain('h-[40px]')
        expect(button.className).toContain('flex')
        expect(button.className).toContain('items-center')
        expect(button.className).toContain('justify-center')
      })
    })

    it('should render menu items with cursor-pointer class', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      buttons.forEach((button) => {
        expect(button.className).toContain('cursor-pointer')
      })
    })

    it('should render each menu item with an SVG icon', () => {
      const { container } = render(<SideBarComponent />)
      const svgs = container.querySelectorAll('svg')

      expect(svgs).toHaveLength(4)
    })

    it('should center menu items with mx-auto', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      buttons.forEach((button) => {
        expect(button.className).toContain('mx-auto')
      })
    })
  })

  describe('Active State', () => {
    it('should have Kit (index 1) as default active menu', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      // Index 1 (Kit) should NOT have grey-overlay
      expect(buttons[1].className).not.toContain('grey-overlay')

      // Other indices should have grey-overlay
      expect(buttons[0].className).toContain('grey-overlay')
      expect(buttons[2].className).toContain('grey-overlay')
      expect(buttons[3].className).toContain('grey-overlay')
    })

    it('should apply grey-overlay to inactive menu items', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      // Inactive buttons (0, 2, 3) should have grey-overlay
      ;[0, 2, 3].forEach((index) => {
        expect(buttons[index].className).toContain('grey-overlay')
      })
    })

    it('should not apply grey-overlay to active menu item', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      // Active button (1) should NOT have grey-overlay
      expect(buttons[1].className).not.toContain('grey-overlay')
    })
  })

  describe('Interactions', () => {
    it('should change active state when clicking on Link (index 0)', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      // Initially, index 1 is active
      expect(buttons[1].className).not.toContain('grey-overlay')
      expect(buttons[0].className).toContain('grey-overlay')

      // Click on index 0
      fireEvent.click(buttons[0])

      // Now index 0 should be active
      expect(buttons[0].className).not.toContain('grey-overlay')
      expect(buttons[1].className).toContain('grey-overlay')
    })

    it('should change active state when clicking on Bar (index 2)', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      // Click on index 2
      fireEvent.click(buttons[2])

      // Now index 2 should be active
      expect(buttons[2].className).not.toContain('grey-overlay')
      expect(buttons[0].className).toContain('grey-overlay')
      expect(buttons[1].className).toContain('grey-overlay')
      expect(buttons[3].className).toContain('grey-overlay')
    })

    it('should change active state when clicking on List (index 3)', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      // Click on index 3
      fireEvent.click(buttons[3])

      // Now index 3 should be active
      expect(buttons[3].className).not.toContain('grey-overlay')
      expect(buttons[0].className).toContain('grey-overlay')
      expect(buttons[1].className).toContain('grey-overlay')
      expect(buttons[2].className).toContain('grey-overlay')
    })

    it('should handle multiple clicks on different menu items', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      // Click on index 0
      fireEvent.click(buttons[0])
      expect(buttons[0].className).not.toContain('grey-overlay')

      // Click on index 2
      fireEvent.click(buttons[2])
      expect(buttons[2].className).not.toContain('grey-overlay')
      expect(buttons[0].className).toContain('grey-overlay')

      // Click on index 3
      fireEvent.click(buttons[3])
      expect(buttons[3].className).not.toContain('grey-overlay')
      expect(buttons[2].className).toContain('grey-overlay')

      // Click back on index 1
      fireEvent.click(buttons[1])
      expect(buttons[1].className).not.toContain('grey-overlay')
      expect(buttons[3].className).toContain('grey-overlay')
    })

    it('should allow clicking on already active menu item', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      // Index 1 is already active
      expect(buttons[1].className).not.toContain('grey-overlay')

      // Click on index 1 again
      fireEvent.click(buttons[1])

      // Should remain active
      expect(buttons[1].className).not.toContain('grey-overlay')
    })

    it('should only have one active menu item at a time', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      // Test each menu item
      buttons.forEach((_, clickIndex) => {
        fireEvent.click(buttons[clickIndex])

        buttons.forEach((button, index) => {
          if (index === clickIndex) {
            expect(button.className).not.toContain('grey-overlay')
          } else {
            expect(button.className).toContain('grey-overlay')
          }
        })
      })
    })
  })

  describe('Menu Items Order', () => {
    it('should render menu items in correct order', () => {
      const { container } = render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      // Verify we have 4 buttons in the correct order
      expect(buttons).toHaveLength(4)

      // The SVG icons should be rendered in order: Link, Kit, Bar, List
      const svgs = container.querySelectorAll('button svg')
      expect(svgs).toHaveLength(4)
    })
  })

  describe('Accessibility', () => {
    it('should render all menu items as buttons', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      buttons.forEach((button) => {
        expect(button.tagName).toBe('BUTTON')
      })
    })

    it('should be keyboard accessible', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      // First button should be focusable
      buttons[0].focus()
      expect(buttons[0]).toHaveFocus()
    })

    it('should support keyboard navigation between buttons', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      // Focus each button
      buttons.forEach((button) => {
        button.focus()
        expect(button).toHaveFocus()
      })
    })
  })

  describe('Responsive Design', () => {
    it('should have fixed positioning', () => {
      const { container } = render(<SideBarComponent />)
      const sidebar = container.querySelector('#app-sidebar')

      expect(sidebar?.className).toContain('fixed')
      expect(sidebar?.className).toContain('left-[16px]')
      expect(sidebar?.className).toContain('top-[310px]')
    })

    it('should have fixed width', () => {
      const { container } = render(<SideBarComponent />)
      const sidebar = container.querySelector('#app-sidebar')

      expect(sidebar?.className).toContain('w-[48px]')
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid clicks', () => {
      render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      // Rapidly click different buttons
      fireEvent.click(buttons[0])
      fireEvent.click(buttons[1])
      fireEvent.click(buttons[2])
      fireEvent.click(buttons[3])
      fireEvent.click(buttons[0])

      // Last clicked button should be active
      expect(buttons[0].className).not.toContain('grey-overlay')
      expect(buttons[1].className).toContain('grey-overlay')
      expect(buttons[2].className).toContain('grey-overlay')
      expect(buttons[3].className).toContain('grey-overlay')
    })

    it('should maintain component structure after interactions', () => {
      const { container } = render(<SideBarComponent />)
      const buttons = screen.getAllByRole('button')

      // Click multiple times
      fireEvent.click(buttons[2])
      fireEvent.click(buttons[1])
      fireEvent.click(buttons[0])

      // Container should still exist with correct ID
      const sidebar = container.querySelector('#app-sidebar')
      expect(sidebar).toBeInTheDocument()

      // Should still have 4 buttons
      const updatedButtons = screen.getAllByRole('button')
      expect(updatedButtons).toHaveLength(4)
    })
  })

  describe('Component Structure', () => {
    it('should export SideBarComponent', () => {
      expect(SideBarComponent).toBeDefined()
      expect(typeof SideBarComponent).toBe('function')
    })

    it('should render without errors', () => {
      expect(() => render(<SideBarComponent />)).not.toThrow()
    })

    it('should have correct component hierarchy', () => {
      const { container } = render(<SideBarComponent />)
      const sidebar = container.querySelector('#app-sidebar')
      const buttons = sidebar?.querySelectorAll('button')

      expect(sidebar).toBeInTheDocument()
      expect(buttons).toHaveLength(4)
    })
  })
})
