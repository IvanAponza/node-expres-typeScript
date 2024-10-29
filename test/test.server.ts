import { envs } from "../src/config/adapter/anvs";
import { AppRoutes } from "../src/config/routes";
import { Server } from "../src/config/server";


export const testServer = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
});