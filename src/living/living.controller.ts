import { Request, Response } from "express"



export class LivingController {

    create = (req: Request, res: Response) => {
        res.status(200).send('Living Ok');
    }
}