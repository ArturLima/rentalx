import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListsCategoriesController";
import { ListCategoriesUseCase } from "./ListsCategoryUseCase";

const categoryRepository = null;

const listCategoryUseCase = new ListCategoriesUseCase(categoryRepository);

const listCategoryController = new ListCategoriesController(
  listCategoryUseCase
);

export { listCategoryController };
