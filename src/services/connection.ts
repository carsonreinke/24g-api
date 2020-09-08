import 'reflect-metadata';
import { getConnection, Connection } from 'typeorm';

export const connection: () => Promise<Connection> = async () => {
    return await getConnection();
};
