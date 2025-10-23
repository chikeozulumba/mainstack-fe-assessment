import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { NotAvailable } from '@/components/display/NotAvailable'

describe('NotAvailable component', () => {
  describe('Basic Rendering', () => {
    it('should render the component', () => {
      const { container } = render(<NotAvailable />)
      expect(container).toBeInTheDocument()
    })

    it('should render the NA icon', () => {
      const { container } = render(<NotAvailable />)
      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('should render the main heading', () => {
      render(<NotAvailable />)
      const heading = screen.getByText(
        'No matching transaction found for the selected filter',
      )
      expect(heading).toBeInTheDocument()
    })

    it('should render the description text', () => {
      render(<NotAvailable />)
      const description = screen.getByText(
        'Change your filters to see more results, or add a new product.',
      )
      expect(description).toBeInTheDocument()
    })

    it('should render the Clear Filter button', () => {
      render(<NotAvailable />)
      const button = screen.getByRole('button', { name: /clear filter/i })
      expect(button).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should have correct container classes', () => {
      const { container } = render(<NotAvailable />)
      const mainDiv = container.querySelector('div')
      expect(mainDiv?.className).toContain('w-full')
      expect(mainDiv?.className).toContain('max-w-[369px]')
      expect(mainDiv?.className).toContain('mx-auto')
      expect(mainDiv?.className).toContain('h-full')
      expect(mainDiv?.className).toContain('flex')
      expect(mainDiv?.className).toContain('flex-col')
    })

    it('should apply custom className', () => {
      const { container } = render(<NotAvailable className="custom-class" />)
      const mainDiv = container.querySelector('div')
      expect(mainDiv?.className).toContain('custom-class')
    })

    it('should have correct icon dimensions', () => {
      const { container } = render(<NotAvailable />)
      const icon = container.querySelector('svg')
      expect(icon?.getAttribute('class')).toContain('h-[48px]')
      expect(icon?.getAttribute('class')).toContain('w-[48px]')
    })

    it('should have correct heading styling', () => {
      const { container } = render(<NotAvailable />)
      const heading = container.querySelector('h1')
      expect(heading?.className).toContain('text-[28px]')
      expect(heading?.className).toContain('font-[700]')
      expect(heading?.className).toContain('tracking-[-0.6px]')
    })

    it('should have correct description styling', () => {
      const { container } = render(<NotAvailable />)
      const description = container.querySelector('h3')
      expect(description?.className).toContain('font-[500]')
      expect(description?.className).toContain('text-[16px]')
      expect(description?.className).toContain('leading-[24px]')
    })

    it('should have button with correct variant', () => {
      render(<NotAvailable />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-[#EFF1F6]')
    })

    it('should have button with margin top', () => {
      render(<NotAvailable />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('mt-[32px]')
    })
  })

  describe('Interactions', () => {
    it('should call onClick handler when button is clicked', () => {
      const handleClick = vi.fn()
      render(<NotAvailable onClick={handleClick} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should call onClick handler multiple times', () => {
      const handleClick = vi.fn()
      render(<NotAvailable onClick={handleClick} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should work without onClick handler', () => {
      render(<NotAvailable />)
      const button = screen.getByRole('button')

      expect(() => fireEvent.click(button)).not.toThrow()
    })

    it('should be keyboard accessible', () => {
      const handleClick = vi.fn()
      render(<NotAvailable onClick={handleClick} />)

      const button = screen.getByRole('button')
      button.focus()

      expect(button).toHaveFocus()
    })
  })

  describe('Layout Structure', () => {
    it('should have icon, text content, and button in correct order', () => {
      const { container } = render(<NotAvailable />)

      const icon = container.querySelector('svg')
      const heading = screen.getByText(
        'No matching transaction found for the selected filter',
      )
      const button = screen.getByRole('button')

      expect(icon).toBeInTheDocument()
      expect(heading).toBeInTheDocument()
      expect(button).toBeInTheDocument()
    })

    it('should have text content wrapper with margin', () => {
      const { container } = render(<NotAvailable />)
      const textWrapper = container.querySelectorAll('div')[1]
      expect(textWrapper.className).toContain('mt-[20px]')
    })

    it('should have description with margin', () => {
      const { container } = render(<NotAvailable />)
      const description = container.querySelector('h3')
      expect(description?.className).toContain('mt-[10px]')
    })
  })

  describe('Content Verification', () => {
    it('should display exact heading text', () => {
      render(<NotAvailable />)
      const heading = screen.getByText(
        'No matching transaction found for the selected filter',
      )
      expect(heading.textContent).toBe(
        'No matching transaction found for the selected filter',
      )
    })

    it('should display exact description text', () => {
      render(<NotAvailable />)
      const description = screen.getByText(
        'Change your filters to see more results, or add a new product.',
      )
      expect(description.textContent).toBe(
        'Change your filters to see more results, or add a new product.',
      )
    })

    it('should display exact button text', () => {
      render(<NotAvailable />)
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Clear Filter')
    })
  })

  describe('Props Handling', () => {
    it('should handle both className and onClick props', () => {
      const handleClick = vi.fn()
      const { container } = render(
        <NotAvailable className="test-class" onClick={handleClick} />,
      )

      const mainDiv = container.querySelector('div')
      expect(mainDiv?.className).toContain('test-class')

      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should work with only className prop', () => {
      const { container } = render(<NotAvailable className="only-class" />)
      const mainDiv = container.querySelector('div')
      expect(mainDiv?.className).toContain('only-class')
    })

    it('should work with only onClick prop', () => {
      const handleClick = vi.fn()
      render(<NotAvailable onClick={handleClick} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should work with no props', () => {
      const { container } = render(<NotAvailable />)
      expect(container).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      const { container } = render(<NotAvailable />)

      const h1 = container.querySelector('h1')
      const h3 = container.querySelector('h3')
      const button = screen.getByRole('button')

      expect(h1).toBeInTheDocument()
      expect(h3).toBeInTheDocument()
      expect(button).toBeInTheDocument()
    })

    it('should have clickable button element', () => {
      render(<NotAvailable />)
      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('should render SVG icon for visual feedback', () => {
      const { container } = render(<NotAvailable />)
      const svg = container.querySelector('svg')
      expect(svg?.tagName).toBe('svg')
    })
  })
})
