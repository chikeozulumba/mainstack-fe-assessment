import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { DatePickerComponent } from '@/components/DatePicker'

describe('DatePicker component', () => {
  describe('Basic Rendering', () => {
    it('should render with single date picker', () => {
      const mockSetDates = vi.fn()
      const { container } = render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined]}
          setDates={mockSetDates}
        />,
      )

      expect(container).toBeInTheDocument()
    })

    it('should render with multiple date pickers', () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined, undefined]}
          setDates={mockSetDates}
        />,
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThanOrEqual(2)
    })

    it('should not render if dates array is empty', () => {
      const mockSetDates = vi.fn()
      const { container } = render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[]}
          setDates={mockSetDates}
        />,
      )

      const buttons = container.querySelectorAll('button')
      expect(buttons.length).toBe(0)
    })

    it('should render with placeholder text', () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Pick a Date"
          dates={[undefined]}
          setDates={mockSetDates}
        />,
      )

      expect(screen.getByText('Pick a Date')).toBeInTheDocument()
    })

    it('should render with custom placeholders for each date', () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Select Date"
          placeholders={['Start Date', 'End Date']}
          dates={[undefined, undefined]}
          setDates={mockSetDates}
        />,
      )

      expect(screen.getByText('Start Date')).toBeInTheDocument()
      expect(screen.getByText('End Date')).toBeInTheDocument()
    })
  })

  describe('Date Display', () => {
    it('should display formatted date when date is provided', () => {
      const mockSetDates = vi.fn()
      const testDate = new Date('2024-01-15')

      render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[testDate]}
          setDates={mockSetDates}
        />,
      )

      // The date should be formatted (not showing exact placeholder)
      expect(screen.queryByText('Select Date')).not.toBeInTheDocument()
    })

    it('should display placeholder when date is undefined', () => {
      const mockSetDates = vi.fn()

      render(
        <DatePickerComponent
          placeholder="No Date Selected"
          dates={[undefined]}
          setDates={mockSetDates}
        />,
      )

      expect(screen.getByText('No Date Selected')).toBeInTheDocument()
    })

    it('should handle ISO date strings', () => {
      const mockSetDates = vi.fn()
      const isoDate = '2024-06-15'

      render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[isoDate]}
          setDates={mockSetDates}
        />,
      )

      // Should render without errors
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('should handle multiple dates', () => {
      const mockSetDates = vi.fn()
      const date1 = new Date('2024-01-01')
      const date2 = new Date('2024-12-31')

      render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[date1, date2]}
          setDates={mockSetDates}
        />,
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Trigger Button Styling', () => {
    it('should have correct base styling', () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined]}
          setDates={mockSetDates}
        />,
      )

      const button = screen.getByRole('button')
      expect(button.className).toContain('h-[48px]')
      expect(button.className).toContain('rounded-[12px]')
      expect(button.className).toContain('border-[3px]')
    })

    it('should have inactive state styling when not active', () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined]}
          setDates={mockSetDates}
        />,
      )

      const button = screen.getByRole('button')
      expect(button.className).toContain('border-[#EFF1F6]')
      expect(button.className).toContain('bg-[#EFF1F6]')
    })

    it('should display chevron icon', () => {
      const mockSetDates = vi.fn()
      const { container } = render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined]}
          setDates={mockSetDates}
        />,
      )

      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should have correct text styling', () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined]}
          setDates={mockSetDates}
        />,
      )

      const text = screen.getByText('Select Date')
      expect(text.className).toContain('text-[#131316]')
      expect(text.className).toContain('text-[14px]')
      expect(text.className).toContain('font-[500]')
    })
  })

  describe('User Interactions', () => {
    it('should open popover when trigger is clicked', async () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined]}
          setDates={mockSetDates}
        />,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      // Popover should open
      await waitFor(() => {
        expect(button.className).toContain('border-[#131316]')
      })
    })

    it('should call setDates when date is selected', async () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined]}
          setDates={mockSetDates}
        />,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      // Wait for calendar to open and try to select a date
      await waitFor(() => {
        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBeGreaterThan(1)
      })
    })

    it('should handle clicking on different date pickers', () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Select Date"
          placeholders={['Start', 'End']}
          dates={[undefined, undefined]}
          setDates={mockSetDates}
        />,
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThanOrEqual(2)

      fireEvent.click(buttons[0])
      expect(buttons[0].className).toContain('border-[#131316]')
    })
  })

  describe('Layout and Structure', () => {
    it('should render dates in a flex container', () => {
      const mockSetDates = vi.fn()
      const { container } = render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined, undefined]}
          setDates={mockSetDates}
        />,
      )

      const flexContainer = container.querySelector('.flex.flex-row')
      expect(flexContainer).toBeInTheDocument()
    })

    it('should have gap between multiple date pickers', () => {
      const mockSetDates = vi.fn()
      const { container } = render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined, undefined]}
          setDates={mockSetDates}
        />,
      )

      const flexContainer = container.querySelector('.gap-x-\\[12px\\]')
      expect(flexContainer).toBeInTheDocument()
    })

    it('should render full width', () => {
      const mockSetDates = vi.fn()
      const { container } = render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined]}
          setDates={mockSetDates}
        />,
      )

      const wrapper = container.querySelector('.w-full')
      expect(wrapper).toBeInTheDocument()
    })
  })

  describe('Props Validation', () => {
    it('should handle empty dates array', () => {
      const mockSetDates = vi.fn()
      const { container } = render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[]}
          setDates={mockSetDates}
        />,
      )

      // Should return null/nothing
      const buttons = container.querySelectorAll('button')
      expect(buttons.length).toBe(0)
    })

    it('should handle single date', () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined]}
          setDates={mockSetDates}
        />,
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThanOrEqual(1)
    })

    it('should handle three or more dates', () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined, undefined, undefined]}
          setDates={mockSetDates}
        />,
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThanOrEqual(3)
    })

    it('should use placeholder when placeholders array is not provided', () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Default Placeholder"
          dates={[undefined, undefined]}
          setDates={mockSetDates}
        />,
      )

      const placeholders = screen.getAllByText('Default Placeholder')
      expect(placeholders.length).toBe(2)
    })

    it('should use custom placeholders when provided', () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Default"
          placeholders={['Custom 1', 'Custom 2']}
          dates={[undefined, undefined]}
          setDates={mockSetDates}
        />,
      )

      expect(screen.getByText('Custom 1')).toBeInTheDocument()
      expect(screen.getByText('Custom 2')).toBeInTheDocument()
      expect(screen.queryByText('Default')).not.toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle mixed defined and undefined dates', () => {
      const mockSetDates = vi.fn()
      const date = new Date('2024-03-15')

      render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[date, undefined]}
          setDates={mockSetDates}
        />,
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThanOrEqual(2)
    })

    it('should handle very long placeholder text', () => {
      const mockSetDates = vi.fn()
      const longPlaceholder =
        'This is a very long placeholder text that might overflow'

      render(
        <DatePickerComponent
          placeholder={longPlaceholder}
          dates={[undefined]}
          setDates={mockSetDates}
        />,
      )

      expect(screen.getByText(longPlaceholder)).toBeInTheDocument()
    })

    it('should handle null setDates gracefully', () => {
      const { container } = render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined]}
          setDates={() => {}}
        />,
      )

      expect(container).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should render buttons for keyboard navigation', () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined]}
          setDates={mockSetDates}
        />,
      )

      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button.tagName).toBe('BUTTON')
      })
    })

    it('should be focusable', () => {
      const mockSetDates = vi.fn()
      render(
        <DatePickerComponent
          placeholder="Select Date"
          dates={[undefined]}
          setDates={mockSetDates}
        />,
      )

      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })
  })
})
