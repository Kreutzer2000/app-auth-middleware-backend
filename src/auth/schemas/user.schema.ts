import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    nombre: String,
    apellido: String,
    email: { type: String, unique: true },
    usuario: String,
    contrasena: String,
    fechaCreacion: { type: Date, default: Date.now },
    activo: Boolean,
    numeroTelefono: String,
  },
  { collection: 'users' }, // Especifica el nombre de la colección aquí
);
