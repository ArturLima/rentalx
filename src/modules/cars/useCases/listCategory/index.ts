import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListsCategoriesController";
import { ListCategoriesUseCase } from "./ListsCategoryUseCase";

const categoryRepository = CategoriesRepository.getInstance();

const listCategoryUseCase = new ListCategoriesUseCase(categoryRepository);

const listCategoryController = new ListCategoriesController(
  listCategoryUseCase
);

export { listCategoryController };
