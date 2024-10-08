export type StateSet<T> = T | ((currentState: T) => T)
export type SetVal<T> = (newState: StateSet<T>) => void
