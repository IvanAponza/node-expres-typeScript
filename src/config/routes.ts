import {Router} from 'express';
import { LivingRoutes } from '../living/living.routes';


export class AppRoutes {
    
    static get routes(): Router {
        const router = Router();

        router.use('/api/create', LivingRoutes.routes);
        
        return router;
    }
}