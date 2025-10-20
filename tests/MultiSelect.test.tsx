import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { MultiSelectComponent } from '@/components/MultiSelect'

const mockOptions = [
  { label: 'Option 1', value: 'option1', key: 'opt1' },
  { label: 'Option 2', value: 'option2', key: 'opt2' },
  { label: 'Option 3', value: 'option3', key: 'opt3' },
]

describe('MultiSelect component', () => {
  describe('Basic Rendering', () => {
    it('should render the component', () => {
      const mockSetSelected = vi.fn()
      const { container } = render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      expect(container).toBeInTheDocument()
    })

    it('should render with placeholder text', () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Choose Items"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      expect(screen.getByText('Choose Items')).toBeInTheDocument()
    })

    it('should render trigger button', () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should render chevron icon', () => {
      const mockSetSelected = vi.fn()
      const { container } = render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const chevron = container.querySelector('svg')
      expect(chevron).toBeInTheDocument()
    })
  })

  describe('Selected Options Display', () => {
    it('should display placeholder when no options selected', () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Nothing Selected"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      expect(screen.getByText('Nothing Selected')).toBeInTheDocument()
    })

    it('should display single selected option label', () => {
      const mockSetSelected = vi.fn()
      const selected = {
        opt1: mockOptions[0],
      }

      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={selected}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    it('should display multiple selected options as comma-separated', () => {
      const mockSetSelected = vi.fn()
      const selected = {
        opt1: mockOptions[0],
        opt2: mockOptions[1],
      }

      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={selected}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      expect(screen.getByText('Option 1, Option 2')).toBeInTheDocument()
    })

    it('should ignore undefined values in selected options', () => {
      const mockSetSelected = vi.fn()
      const selected = {
        opt1: mockOptions[0],
        opt2: undefined,
        opt3: mockOptions[2],
      }

      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={selected}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      expect(screen.getByText('Option 1, Option 3')).toBeInTheDocument()
    })

    it('should handle all undefined selected options', () => {
      const mockSetSelected = vi.fn()
      const selected = {
        opt1: undefined,
        opt2: undefined,
      }

      render(
        <MultiSelectComponent
          placeholder="All Undefined"
          options={mockOptions}
          selectedOptionsState={selected}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      expect(screen.getByText('All Undefined')).toBeInTheDocument()
    })
  })

  describe('Trigger Button Styling', () => {
    it('should have correct base styling', () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      expect(button.className).toContain('h-[48px]')
      expect(button.className).toContain('rounded-[12px]')
      expect(button.className).toContain('border-[3px]')
      expect(button.className).toContain('w-full')
    })

    it('should have inactive styling when closed', () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      expect(button.className).toContain('border-[#EFF1F6]')
      expect(button.className).toContain('bg-[#EFF1F6]')
    })

    it('should truncate long text', () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      const textSpan = button.querySelector('.truncate')
      expect(textSpan).toBeInTheDocument()
    })

    it('should have chevron with correct positioning', () => {
      const mockSetSelected = vi.fn()
      const { container } = render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const chevron = container.querySelector('.absolute.right-\\[16px\\]')
      expect(chevron).toBeInTheDocument()
    })
  })

  describe('Popover Interactions', () => {
    it('should open popover when trigger is clicked', async () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(button.className).toContain('border-[#131316]')
      })
    })

    it('should display all options when opened', async () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        mockOptions.forEach((option) => {
          expect(screen.getAllByText(option.label).length).toBeGreaterThan(0)
        })
      })
    })

    it('should display checkboxes for each option', async () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes.length).toBe(mockOptions.length)
      })
    })
  })

  describe('Option Selection', () => {
    it('should call setSelectedOptionsState when option is checked', async () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes.length).toBeGreaterThan(0)
      })

      const checkboxes = screen.getAllByRole('checkbox')
      fireEvent.click(checkboxes[0])

      expect(mockSetSelected).toHaveBeenCalled()
    })

    it('should check checkbox when option is selected', async () => {
      const mockSetSelected = vi.fn()
      const selected = {
        opt1: mockOptions[0],
      }

      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={selected}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes[0]).toHaveAttribute('data-state', 'checked')
      })
    })

    it('should uncheck checkbox when option is deselected', async () => {
      const mockSetSelected = vi.fn()

      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes[0]).toHaveAttribute('data-state', 'unchecked')
      })
    })
  })

  describe('Options List Styling', () => {
    it('should display options container when opened', async () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes.length).toBeGreaterThan(0)
      })
    })

    it('should render option labels', async () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        mockOptions.forEach((option) => {
          expect(screen.getAllByText(option.label).length).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('Default Props', () => {
    it('should use default placeholder', () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={[]}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      expect(screen.getByText('Select Options')).toBeInTheDocument()
    })

    it('should handle empty options array', () => {
      const mockSetSelected = vi.fn()
      const { container } = render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={[]}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      expect(container).toBeInTheDocument()
    })

    it('should handle empty selected options', () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Empty Selection"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      expect(screen.getByText('Empty Selection')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle very long option labels', async () => {
      const mockSetSelected = vi.fn()
      const longOptions = [
        {
          label: 'This is a very long option label that might need truncation',
          value: 'long1',
          key: 'long1',
        },
      ]

      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={longOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(
          screen.getAllByText(
            'This is a very long option label that might need truncation',
          ).length,
        ).toBeGreaterThan(0)
      })
    })

    it('should handle many options', async () => {
      const mockSetSelected = vi.fn()
      const manyOptions = Array.from({ length: 20 }, (_, i) => ({
        label: `Option ${i + 1}`,
        value: `option${i + 1}`,
        key: `opt${i + 1}`,
      }))

      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={manyOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes.length).toBe(20)
      })
    })

    it('should handle special characters in option labels', async () => {
      const mockSetSelected = vi.fn()
      const specialOptions = [
        { label: 'Option & Value', value: 'opt1', key: 'opt1' },
        { label: 'Option < > "Test"', value: 'opt2', key: 'opt2' },
      ]

      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={specialOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getAllByText('Option & Value').length).toBeGreaterThan(0)
      })
    })

    it('should handle all options selected', () => {
      const mockSetSelected = vi.fn()
      const allSelected = {
        opt1: mockOptions[0],
        opt2: mockOptions[1],
        opt3: mockOptions[2],
      }

      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={allSelected}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      expect(
        screen.getByText('Option 1, Option 2, Option 3'),
      ).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have clickable button', () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('should be keyboard accessible', () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })

    it('should have checkbox roles for options', async () => {
      const mockSetSelected = vi.fn()
      render(
        <MultiSelectComponent
          placeholder="Select Options"
          options={mockOptions}
          selectedOptionsState={{}}
          setSelectedOptionsState={mockSetSelected}
        />,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes.length).toBe(mockOptions.length)
      })
    })
  })
})
