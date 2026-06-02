import express from 'express';
import 'dotenv/config';
import path from 'path';
import userRoutes from './routers/userRoutes';
import roleRoutes from './routers/roleRoutes';
import permissionRoutes from './routers/permissionRoutes';
import methodOverride from 'method-override';
const app = express();

// Set View Engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public'))); 
app.use((req: any, res, next) => {
  
  req.user = { id: 1, role_id: 1 }; 
  next();
});

app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/permissions', permissionRoutes);

// Menjalankan Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});