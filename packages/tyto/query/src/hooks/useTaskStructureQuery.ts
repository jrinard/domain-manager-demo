import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, TaskStructure } from '@tyto/client'

export interface UseTaskStructureQueryProps {
  taskID: number
  taskType?: 'ocMEETINGAGENDA' | 'ocCONTAINER'
  enabled?: boolean
}

export const useTaskStructureQuery = ({
  taskID,
  taskType,
  enabled,
}: UseTaskStructureQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof TaskStructure.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: Parameters<typeof TaskStructure.prototype.get>[0] = {
    taskID,
  }

  return useQuery<
    Awaited<ReturnType<typeof TaskStructure.prototype.get>>,
    Error
  >({
    enabled,
    queryKey: [tytoClient.TaskStructure.endpoint, taskID, taskType],
    queryFn: async () => {
      const result = await tytoClient.TaskStructure.get({ ...params })
      if (taskType) {
        return {
          ...result,
          task: {
            ...result.task,
            tasks: result.task.tasks.filter(
              (task) => task.taskType === taskType
            ),
          },
        }
      }
      return result
    },
  })
}

export default useTaskStructureQuery
