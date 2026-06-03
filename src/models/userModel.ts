import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface User extends RowDataPacket {
  id: number;
  username: string;
  role_id: number;
  role_name?: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await pool.query<User[]>(`
    SELECT u.id, u.username, u.role_id, r.name as role_name 
    FROM users u 
    LEFT JOIN roles r ON u.role_id = r.id
  `);
  return rows;
};

export const createUser = async (userData: { username: string; password?: string; role_id: number }) => {
  // Catatan: Pada aplikasi produksi, pastikan password di-hash menggunakan library seperti bcrypt/argon2
  const password = userData.password || 'password123'; 
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)',
    [userData.username, password, userData.role_id]
  );
  return result;
};

export const deleteUser = async (id: number) => {
  const [result] = await pool.query<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
  return result;
};

export const updateUser = async (id: number, data: { username: string, role_id: number }) => {
    // Kita impor pool dari file konfigurasi database di bagian atas file ini jika belum ada
    const { default: pool } = await import('../config/database');
    
    const [result] = await pool.query(
        'UPDATE users SET username = ?, role_id = ? WHERE id = ?',
        [data.username, data.role_id, id]
    );
    return result;
};