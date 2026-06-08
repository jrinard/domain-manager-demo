import * as React from 'react'
import { Outlet } from 'react-router-dom'

const MainFramework: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section className="flex min-h-screen w-full justify-center">
      <div className="w-full max-w-[1500px]">
        <Outlet /> {/* Nested route content */}
        {children}
      </div>
    </section>
  )
}

export default MainFramework
