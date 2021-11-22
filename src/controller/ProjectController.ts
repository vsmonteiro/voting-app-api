import { Request, Response } from "express"
import ProjectService from "../service/ProjectService"

export class ProjectController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;
    const result = await ProjectService.getInstance().create(name, description);
    return response.json(result);
  }

  async update(request: Request, response: Response) {
    const { id, name, description } = request.body;
    const result = await ProjectService.getInstance().update(id, name, description);
    return response.json(result);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.body;
    const result = await ProjectService.getInstance().delete(id);
    return response.json(result);
  }

  async list(request: Request, response: Response) {
    const result = await ProjectService.getInstance().list();
    return response.json(result);
  }
}

export default new ProjectController();