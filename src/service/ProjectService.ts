import prisma from "../prisma";
import * as Yup from "yup";

export default class ProjectService {
  private static instance: ProjectService;

  private constructor() {}

  public static getInstance() {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }

    return ProjectService.instance;
  }

  async create(name: string, description: string) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required()
    });

    await schema.validate({ name, description }, {
      abortEarly: false,
    });

    const response = await prisma.project.create({
      data: {
        name,
        description,
      },
    });

    return response;
  }

  async update(id: number, name: string, description: string) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      description: Yup.string().required()
    });

    await schema.validate({ id, name, description }, {
      abortEarly: false,
    });

    const response = await prisma.project.update({
      where: {
        id
      },
      data: {
        name,
        description
      }
    });

    return response;
  }

  async delete(id: number) {
    const response = await prisma.project.delete({
      where: {
        id
      }
    });

    return response;
  }

  async list() {
    const response = await prisma.project.findMany();
    return response;
  }
}
