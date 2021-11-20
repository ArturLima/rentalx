import { AppError } from "@shared/erros/Apperror";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CaregoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };
    await createCategory.execute({
      name: category.name,
      description: category.description,
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category if with same name", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category description Test",
      };

      await createCategory.execute({
        name: category.name,
        description: category.description,
      });
      await createCategory.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
