import { query } from "../../database/mysql";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class MysqlUserRepository implements UserRepository {
  /* Esta función obtiene todos los usuarios de la base de datos mediante una consulta*/
  async getAll(): Promise<User[] | null> {
    const sql = "SELECT * FROM users";
    try {
      const [data]: any = await query(sql, []);
      const dataUser = Object.values(JSON.parse(JSON.stringify(data)));

      return dataUser.map(
        (user: any) =>
          new User(
            user.id,
            user.name,
            user.lastname,
            user.phone,
            user.email,
            user.password
          )
      );
    } catch (error) {
      return null;
    }
  }

  async getById(userId: number): Promise<User | null> {
    /*Esta función recibe un userId y realiza una consulta SQL para obtener el usuario correspondiente a ese identificador.*/
    const sql = "SELECT * FROM users WHERE id=?";
    const params: any[] = [userId];
    try {
      const [result]: any = await query(sql, params);
      //El objeto Result es un objeto que contiene info generada de la bd
      /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
            estar dentro de un bloque try/catch si hay error se captura en el catch */
      return new User(
        result[0].id,
        result[0].name,
        result[0].lastname,
        result[0].phone,
        result[0].email,
        result[0].password
      );
    } catch (error) {
      return null;
    }
  }

  async createUser(
    /*Esta función recibe los datos de un nuevo usuario y realiza una consulta SQL para insertar esos datos en la tabla users.*/
    name: string,
    lastname: string,
    phone: number,
    email: string,
    password: string
  ): Promise<User | null> {
    const sql =
      "INSERT INTO users (name,lastname, phone, email, password ) VALUES (?, ?, ?, ?, ?)";
    const params: any[] = [name, lastname, phone, email, password];
    try {
      const [result]: any = await query(sql, params);
      //El objeto Result es un objeto que contiene info generada de la bd
      /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
            estar dentro de un bloque try/catch si hay error se captura en el catch */
      return new User(result.insertId, name, lastname, phone, email, password);
    } catch (error) {
      return null;
    }
  }
}
