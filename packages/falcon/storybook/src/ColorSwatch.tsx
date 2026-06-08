import React from 'react'

export type CardSwatchProps = {
  description: string
  color: string
}

export const ColorSwatch = ({ description, color }: CardSwatchProps) => {
  return (
    <div className="bg-primary dark:bg-secondary rounded-xl border px-1 py-3 shadow-lg hover:shadow-xl">
      <div className="flex w-full flex-col items-center justify-center text-center">
        <div className={`bg-${color} h-36 w-36 rounded-xl`} />
        <span className={`text-${color} mt-2 text-sm`}>As Text</span>
      </div>
      <div className="mt-1 w-40 p-2">
        <hr className="w-full border border-slate-200" />
        <h2 className="mt-1 text-center text-slate-700">{color}</h2>
        <p className="mt-2 whitespace-normal text-center text-sm text-slate-400">
          {description}
        </p>
      </div>
    </div>
  )
}
