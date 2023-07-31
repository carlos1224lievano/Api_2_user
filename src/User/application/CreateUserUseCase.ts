import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
/* un caso de uso (use case) relacionado con la creación de usuarios.*/
export class CreateUserUseCase {
  constructor(readonly userRepository: UserRepository) {}
/*Esta función run toma tres argumentos de tipo cadena (name, email y password) y 
devuelve una promesa que eventualmente resuelve en un objeto User recién creado o en null.*/
  async run(
    name: string,
    lastname: string,
    phone: number,
    email: string,
    password : string
  ): Promise<User | null> {
    try {
      const user = await this.userRepository.createUser(
        name,
        lastname,
        phone,
        email,
        password
      );
      return user;
    } catch (error) {
      return null;
    }
  }
}
