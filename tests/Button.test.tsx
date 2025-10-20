import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '@/components/Button'

describe('Button component', () => {
  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      render(<Button />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Click me')
    })

    it('should render with custom label', () => {
      render(<Button label="Custom Label" />)
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Custom Label')
    })

    it('should render children instead of label when provided', () => {
      render(<Button label="Label">Children Content</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Children Content')
      expect(button).not.toHaveTextContent('Label')
    })

    it('should have default rounded styling', () => {
      render(<Button />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('rounded-[100px]')
      expect(button.className).toContain('font-[600]')
    })
  })

  describe('Variants', () => {
    it('should render primary variant with correct styles', () => {
      render(<Button variant="primary" label="Primary" />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-primary')
      expect(button.className).toContain('text-white')
    })

    it('should render secondary variant with correct styles', () => {
      render(<Button variant="secondary" label="Secondary" />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-[#EFF1F6]')
      expect(button.className).toContain('text-[#131316]')
    })

    it('should render outline variant with correct styles', () => {
      render(<Button variant="outline" label="Outline" />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('border-[1px]')
      expect(button.className).toContain('border-[#EFF1F6]')
      expect(button.className).toContain('bg-white')
    })
  })

  describe('Sizes', () => {
    it('should render xs size with correct padding', () => {
      render(<Button size="xs" label="Extra Small" />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('px-[18px]')
      expect(button.className).toContain('py-[10px]')
      expect(button.className).toContain('text-[14px]')
    })

    it('should render sm size with correct padding', () => {
      render(<Button size="sm" label="Small" />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('px-[24px]')
      expect(button.className).toContain('py-[8px]')
    })

    it('should render md size with correct padding (default)', () => {
      render(<Button size="md" label="Medium" />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('px-[30px]')
      expect(button.className).toContain('py-[12px]')
    })

    it('should render lg size with correct padding', () => {
      render(<Button size="lg" label="Large" />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('px-[52px]')
      expect(button.className).toContain('py-[14px]')
    })
  })

  describe('Icons', () => {
    it('should render with left icon', () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>
      render(<Button leftIcon={<LeftIcon />} label="With Left Icon" />)

      const button = screen.getByRole('button')
      const icon = screen.getByTestId('left-icon')

      expect(icon).toBeInTheDocument()
      expect(button.className).toContain('inline-flex')
      expect(button.className).toContain('items-center')
      expect(button.className).toContain('gap-x-[8px]')
    })

    it('should render with right icon', () => {
      const RightIcon = () => <span data-testid="right-icon">→</span>
      render(<Button rightIcon={<RightIcon />} label="With Right Icon" />)

      const button = screen.getByRole('button')
      const icon = screen.getByTestId('right-icon')

      expect(icon).toBeInTheDocument()
      expect(button.className).toContain('inline-flex')
    })

    it('should render with both left and right icons', () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>
      const RightIcon = () => <span data-testid="right-icon">→</span>

      render(
        <Button
          leftIcon={<LeftIcon />}
          rightIcon={<RightIcon />}
          label="Both Icons"
        />,
      )

      const leftIcon = screen.getByTestId('left-icon')
      const rightIcon = screen.getByTestId('right-icon')

      expect(leftIcon).toBeInTheDocument()
      expect(rightIcon).toBeInTheDocument()
    })
  })

  describe('States', () => {
    it('should render disabled state with correct styles', () => {
      render(<Button disabled label="Disabled" />)
      const button = screen.getByRole('button')

      expect(button).toBeDisabled()
      expect(button.className).toContain('opacity-50')
      expect(button.className).toContain('cursor-not-allowed')
    })

    it('should not trigger onClick when disabled', () => {
      const handleClick = vi.fn()
      render(<Button disabled onClick={handleClick} label="Disabled" />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('should render active primary variant with correct styles', () => {
      render(<Button active variant="primary" label="Active Primary" />)
      const button = screen.getByRole('button')

      expect(button.className).toContain('bg-[#131316]')
      expect(button.className).toContain('text-[#EFF1F6]')
    })

    it('should render active secondary variant with correct styles', () => {
      render(<Button active variant="secondary" label="Active Secondary" />)
      const button = screen.getByRole('button')

      expect(button.className).toContain('bg-[#EFF1F6]')
      expect(button.className).toContain('text-[#131316]')
    })

    it('should render active outline variant with correct styles', () => {
      render(<Button active variant="outline" label="Active Outline" />)
      const button = screen.getByRole('button')

      expect(button.className).toContain('bg-[#EFF1F6]')
      expect(button.className).toContain('text-[#131316]')
    })
  })

  describe('Interactions', () => {
    it('should handle onClick events', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} label="Clickable" />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple clicks', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} label="Multi Click" />)

      const button = screen.getByRole('button')
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should support button type attribute', () => {
      render(<Button type="submit" label="Submit" />)
      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('type', 'submit')
    })

    it('should support custom data attributes', () => {
      render(<Button data-testid="custom-button" label="Custom Data" />)
      const button = screen.getByTestId('custom-button')

      expect(button).toBeInTheDocument()
    })
  })

  describe('Custom Styling', () => {
    it('should accept custom className', () => {
      render(<Button className="custom-class" label="Custom" />)
      const button = screen.getByRole('button')

      expect(button.className).toContain('custom-class')
    })

    it('should merge custom className with default styles', () => {
      render(<Button className="my-custom-class" label="Merged" />)
      const button = screen.getByRole('button')

      expect(button.className).toContain('my-custom-class')
      expect(button.className).toContain('rounded-[100px]')
      expect(button.className).toContain('bg-primary')
    })
  })

  describe('Complex Scenarios', () => {
    it('should render large disabled outline button with icons', () => {
      const LeftIcon = () => <span data-testid="left-icon">⚠</span>
      const RightIcon = () => <span data-testid="right-icon">✓</span>

      render(
        <Button
          variant="outline"
          size="lg"
          disabled
          leftIcon={<LeftIcon />}
          rightIcon={<RightIcon />}
          label="Complex Button"
        />,
      )

      const button = screen.getByRole('button')
      const leftIcon = screen.getByTestId('left-icon')
      const rightIcon = screen.getByTestId('right-icon')

      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()
      expect(button).toHaveTextContent('Complex Button')
      expect(leftIcon).toBeInTheDocument()
      expect(rightIcon).toBeInTheDocument()
      expect(button.className).toContain('border-[1px]')
      expect(button.className).toContain('px-[52px]')
      expect(button.className).toContain('opacity-50')
    })

    it('should render active small secondary button with custom class', () => {
      const handleClick = vi.fn()

      render(
        <Button
          variant="secondary"
          size="sm"
          active
          className="extra-style"
          onClick={handleClick}
          label="Complex Active"
        />,
      )

      const button = screen.getByRole('button')

      expect(button).toHaveTextContent('Complex Active')
      expect(button.className).toContain('bg-[#EFF1F6]')
      expect(button.className).toContain('px-[24px]')
      expect(button.className).toContain('extra-style')

      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} label="Keyboard" />)

      const button = screen.getByRole('button')
      button.focus()

      expect(button).toHaveFocus()
    })

    it('should support aria-label attribute', () => {
      render(<Button aria-label="Custom Aria Label" label="Button" />)
      const button = screen.getByRole('button', { name: 'Custom Aria Label' })

      expect(button).toBeInTheDocument()
    })

    it('should have proper role', () => {
      render(<Button label="Role Test" />)
      const button = screen.getByRole('button')

      expect(button.tagName).toBe('BUTTON')
    })
  })

  describe('Edge Cases', () => {
    it('should render with empty children', () => {
      render(<Button>{''}</Button>)
      const button = screen.getByRole('button')

      expect(button).toBeInTheDocument()
    })

    it('should render with empty label', () => {
      render(<Button label="" />)
      const button = screen.getByRole('button')

      expect(button).toBeInTheDocument()
    })

    it('should handle null children gracefully', () => {
      render(<Button>{null}</Button>)
      const button = screen.getByRole('button')

      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Click me') // Should fall back to label
    })

    it('should render with complex children', () => {
      render(
        <Button>
          <span>Complex</span> <strong>Children</strong>
        </Button>,
      )

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Complex Children')
    })
  })
})
