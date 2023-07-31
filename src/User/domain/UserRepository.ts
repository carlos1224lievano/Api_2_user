import { User } from "./User";
export interface UserRepository {
  //Es utilizada para obtener todos los usuarios del repositorio.
  getAll(): Promise<User[] | null>;
  /* Esta función toma como argumento un userId de tipo número y 
  devuelve una promesa que eventualmente resuelve en un objeto User correspondiente a ese userId o en null.*/
  getById(userId: number): Promise<User | null>;
  /*Esta función toma tres argumentos de tipo cadena (name, email y password) y devuelve una promesa 
  que eventualmente resuelve en un objeto User recién creado o en null. Se utiliza para crear un nuevo usuario en el repositorio.*/
  createUser(
    name: string,
    lastname: string,
    phone: number,
    email: string,
    password : string
  ): Promise<User | null>;
}
