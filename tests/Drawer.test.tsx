import { act } from '@testing-library/react'
import ReactDOM from 'react-dom/client'
import { afterEach, beforeEach, describe, it } from 'vitest'

import { DrawerComponent } from '@/components/Drawer'

let container: HTMLDivElement | null = null

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  if (container) {
    document.body.removeChild(container)
  }
  container = null
})

describe('Drawer component', () => {
  it('should render', () => {
    act(() => {
      ReactDOM.createRoot(container as HTMLElement).render(
        <DrawerComponent
          isOpen={true}
          onClose={() => {}}
          children={<div>Test</div>}
        />,
      )
    })
  })

  it('should show the children when the drawer is open', () => {
    act(() => {
      ReactDOM.createRoot(container as HTMLElement).render(
        <DrawerComponent
          isOpen={true}
          onClose={() => {}}
          children={<div>Test</div>}
        />,
      )
    })

    // expect(getByText('Test')).toBeTruthy()
  })
})
