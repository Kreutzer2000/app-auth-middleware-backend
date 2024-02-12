// src/auth/interfaces/user.interface.ts
import { Document } from 'mongoose';

export interface User extends Document {
  nombre: string;
  apellido: string;
  email: string;
  usuario: string;
  contrasena: string;
  fechaCreacion: Date;
  activo: boolean;
  numeroTelefono: string;
}
