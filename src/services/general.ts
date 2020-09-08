export type LoadAllServiceMethod<T> = () => Promise<T[]>;
export type LoadServiceMethod<T> = (id: number) => Promise<T>;