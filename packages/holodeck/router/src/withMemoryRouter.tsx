import { PropsWithChildren, ReactNode } from 'react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

export type MemoryRouterProps = {
  initialRoute?: string
  routePath?: string
}
/**
 * @deprecated Please use the following instead
 * decorators: [withRouter()],
 * parameters: {
 *   reactRouter: reactRouterParameters({
 *     location: { path: '/person/123' },
 *     routing: { path: '/person/:personID' },
 *   }),
 * }
 */
export const withMemoryRouter =
  ({ initialRoute, routePath }: MemoryRouterProps = {}) =>
  (StoryFn: () => ReactNode) => {
    if (initialRoute) {
      return (
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path={routePath} element={StoryFn()} />
          </Routes>
        </MemoryRouter>
      )
    }
    return <MemoryRouter>{StoryFn()}</MemoryRouter>
  }
export const memoryRouterWrapper =
  ({ initialRoute }: MemoryRouterProps = {}) =>
  ({ children }: PropsWithChildren) => {
    if (initialRoute) {
      return (
        <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
      )
    }
    return <MemoryRouter>{children}</MemoryRouter>
  }
