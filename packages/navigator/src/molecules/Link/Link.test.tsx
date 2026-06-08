import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Link } from './Link'

describe('Link', () => {
  it('should allow app defined and should have app and other prefix in path', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Link
                app="mytraining"
                to="123"
                data-testid="link-to-mytraining-app"
              >
                MyTraining
              </Link>
            }
          />
        </Routes>
      </MemoryRouter>,
    )
    const href = screen.getByText(/MyTraining/i)['href']
    // Should match either the legacy path (/v25/nl/#/), new path (/x/), or empty base path (//)
    expect(href).toMatch(
      /^https:\/\/cardoneventuresceo\.com\/(v25\/nl\/#\/|x\/|\/)mytraining\/123$/,
    )
  })

  it('should allow app NOT defined', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Link to="https://cardoneventures.com">Cardone Ventures</Link>
            }
          />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByText(/Cardone Ventures/i)['href']).toEqual(
      'https://cardoneventures.com/',
    )
  })
})
