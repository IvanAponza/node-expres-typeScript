import { envs } from "./config/adapter/anvs";
import { AppRoutes } from "./config/routes";
import { Server } from "./config/server";



(() => {
    main();
})()

function main(){

    
   const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
   });
   server.start();
}