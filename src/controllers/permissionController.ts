import { Request, Response } from 'express';
import { getAllPermissions } from '../models/permissionModel';

export const listPermissions = async (req: Request, res: Response) => {
  const permissions = await getAllPermissions();
  res.render('layouts/main', {
    title: 'Permission Management',
    body: '../permissions/list', // Mengarah ke views/permissions/list.ejs
    permissions,
    userRole: req.user?.role_id
  });
};