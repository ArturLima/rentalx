import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreatecarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const createCarController = new CreateCarController();
const listAvailableController = new ListAvailableCarsController();
const createCarSpecificationController = new CreatecarSpecificationController();

const carsRoutes = Router();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

export { carsRoutes };
