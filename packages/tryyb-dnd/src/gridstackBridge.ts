// Bridge for consumers so they don't need gridstack as a direct dep
export const getGridStack = async () =>
  (await import('gridstack'))
    .GridStack as unknown as typeof import('gridstack').GridStack
