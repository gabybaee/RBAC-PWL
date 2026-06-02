import { Request, Response } from 'express';
import { getAllRoles, createRole } from '../models/roleModel';

// Menampilkan daftar role
export const listRoles = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    res.render('layouts/main', {
        title: 'Role Management',
        body: '../roles/list',
        roles,
        userRole: req.user?.role_id
    });
};

// MENYIMPAN ROLE BARU (Sudah diperbaiki dari error duplicate entry)
export const storeRole = async (req: Request, res: Response) => {
    const { name } = req.body;
    
    if (!name || name.trim() === "") {
        return res.redirect('/roles');
    }

    try {
        // Mengubah input menjadi huruf kecil agar konsisten (misal: Admin -> admin)
        await createRole(name.trim().toLowerCase());
        res.redirect('/roles');
    } catch (error: any) {
        // Cek apakah error disebabkan karena data kembar (Duplicate Entry di MySQL)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).send(`
                <script>
                    alert("Gagal! Role '${name}' sudah terdaftar di database.");
                    window.location.href = "/roles";
                </script>
            `);
        }
        
        // Jika ada error tak terduga lainnya
        console.error(error);
        res.status(500).send("Terjadi kesalahan pada server.");
    }
};