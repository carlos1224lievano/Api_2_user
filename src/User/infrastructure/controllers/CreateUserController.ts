import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/CreateUserUseCase";

export class CreateUserController {
  /* Esta función run toma dos argumentos, req y res, que representan el objeto de solicitud (request) y el objeto de respuesta 
  (response) respectivamente.*/
  constructor(readonly createUserUseCase: CreateUserUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const user = await this.createUserUseCase.run(
        data.name,
        data.lastname,
        data.phone,
        data.email,
        data.password
      );

      if (user)
        //Code HTTP : 201 -> Creado
        res.status(201).send({
          status: "success",
          data: {
            id: user?.id,
            name: user?.name,
            lastname: user?.lastname,
            phone: user?.phone,
            email: user?.email,
            password: user?.password,
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible agregar el registro",
        });
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
