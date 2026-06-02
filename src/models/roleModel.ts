import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Role extends RowDataPacket {
    id: number;
    name: string;
}

// Fungsi mengambil seluruh role
export const getAllRoles = async (): Promise<Role[]> => {
    const [rows] = await pool.query<Role[]>('SELECT * FROM roles');
    return rows;
};

// Fungsi menambahkan role baru
export const createRole = async (name: string) => {
    const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO roles (name) VALUES (?)',
        [name]
    );
    return result;
};