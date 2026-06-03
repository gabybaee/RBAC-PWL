import { Request, Response } from 'express';
// PERBAIKAN: Menambahkan 'updateUser' ke dalam daftar import dari userModel
import { getAllUsers, createUser, deleteUser, updateUser } from '../models/userModel';

// Interface kustom agar TypeScript mengenali properti 'user'
interface AuthRequest extends Request {
  user?: { id: number; role_id: number };
}

export const listUsers = async (req: AuthRequest, res: Response) => {
  try {
    console.log("▶️ [Pelacak] Masuk ke dalam listUsers controller...");
    
    const users = await getAllUsers();
    console.log("✅ [Pelacak] Berhasil mengambil data user dari database!");
    
    res.render('layouts/main', {
      title: 'User Management',
      body: '../users/list', // Mengarah ke file views/users/list.ejs
      users,
      userRole: req.user?.role_id
    });
  } catch (error) {
    console.error("❌ Error di listUsers:", error);
    res.status(500).send(`
      <h1>Gagal Memuat Halaman User</h1>
      <p>Cek terminal VS Code untuk melihat detail error-nya.</p>
      <p>Pesan Error: ${error instanceof Error ? error.message : String(error)}</p>
    `);
  }
};

export const storeUser = async (req: Request, res: Response) => {
  try {
    await createUser(req.body);
    res.redirect('/users');
  } catch (error) {
    console.error("❌ Error di storeUser:", error);
    res.status(500).send("<h1>Gagal Menyimpan Data User</h1>");
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    await deleteUser(parseInt(req.params.id));
    res.redirect('/users');
  } catch (error) {
    console.error("❌ Error di removeUser:", error);
    res.status(500).send("<h1>Gagal Menghapus Data User</h1>");
  }
};

// FUNGSI EDIT USER
export const editUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { username, role_id } = req.body;
    
    // Berhasil dipanggil dengan aman karena sudah di-import di atas
    await updateUser(id, { username, role_id: parseInt(role_id) });
    res.redirect('/users');
  } catch (error: any) {
    console.error("❌ Error saat edit:", error);
    res.status(500).send(`
      <h1>Gagal Mengupdate User</h1>
      <p>Pesan Error: ${error.message}</p>
    `);
  }
};