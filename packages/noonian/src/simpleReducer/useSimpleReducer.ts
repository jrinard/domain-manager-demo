import { useReducer } from "react"

interface UpdateAction<T> {
    payload: {
        [K in keyof T]?: T[K]
    },
    type: "update"
}

interface DeleteAction<T> {
    payload: {
        key: keyof T
    },
    type: "delete"
}

interface DeleteManyAction<T> {
    payload: {
        keys: Array<keyof T>
    },
    type: "delete-many"
}

interface OverrideAction<T> {
    payload: {
        newState: T
    },
    type: "override"
}

function reducer<T>(state: T, action: UpdateAction<T> | DeleteAction<T> | DeleteManyAction<T> | OverrideAction<T>): T {
    switch (action?.type) {
        case "update":
            if (action.payload) {
                return {
                ...state,
                ...action.payload
                }
            }

            return state
        case "delete":
            if (action.payload?.key) {
                const newState = { ...state }

                delete newState[action.payload.key]

                return newState
            }

            return state
        case "delete-many":
            if (action.payload?.keys?.length) {
                const newState = { ...state }

                action.payload.keys.forEach((key) => {
                    delete newState[key]
                })

                return newState
            }

            return state
        case "override":
            if (action.payload.newState) {
                return action.payload.newState
            }

            return state
        default:
            return state
    }
}

/**
 * A means of providing Type Safe Reducers whie avoiding the need to write boilerplate code
 * @param initialState - The starting state of the reducer
 * @example Basic Usage:
 * ```tsx
 * // * A terse Form for Editing some Person details
 * type FormData = Pick<TytoData.Person, "givenName" | "familyName" | "jobTitle" | "birthMonth" | "birthDate">
 * ...
 * function PersonForm({ person }: Props) {
 *   const { state, update } = useSimpleReducer<FormData>(_.pick(person, ["givenName", "familyName", "jobTitle", "birthMonth", "birthDate"]))
 * 
 *   return (
 *     <form>
 *       <input
 *         name="givenName"
 *         value={state.givenName}
 *         onChange={(e) => update({ givenName: e.target.value })} // * Type Safe
 *       />
 * 
 *       <button
 *         onClick={(e) => {
 *           update({ givenName: 12345 }) // * TSerror: Type 'number' is not assignable to type 'string'
 *           e.preventDefault()
 *         }}
 *       >
 *         Make TypeScript Complain
 *       </button>
 *     </form>
 *   )
 * }
 * ```
 * @returns 
 */
export function useSimpleReducer<T>(initialState: T) {
    const [state, dispatcher] = useReducer(reducer<T>, initialState)

    return {
        state,
        update: (payload: UpdateAction<T>["payload"]) => dispatcher({ type: "update", payload }),
        deleteProperty: (payload: DeleteAction<T>["payload"]) => dispatcher({ type: "delete", payload }),
        deleteProperties: (payload: DeleteManyAction<T>["payload"]) => dispatcher({ type: "delete-many", payload }),
        overrideState: (newState: OverrideAction<T>["payload"]["newState"]) => dispatcher({ type: "override", payload: { newState } }),
    }
}

export default useSimpleReducer