export type LoadAllServiceMethod<T> = () => Promise<T[]>;
export type LoadFilteredServiceMethod<T> = (filterId: number) => Promise<T[]>;
export type LoadServiceMethod<T> = (id: number) => Promise<T>;