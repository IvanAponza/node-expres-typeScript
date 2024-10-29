import { Router } from "express";
import { LivingController } from "./living.controller";



export class LivingRoutes {

    static get routes(): Router{

        const router = Router();

        const livingController = new LivingController();

        router.get('/', livingController.create);

        return router;
    }
}