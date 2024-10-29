import express, { Router } from 'express';
import path from 'path';

export interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    public readonly app = express()

    private readonly port: number;
    private httpServer?: any;
    private readonly routes: Router;
    private readonly public_path: string;

    constructor(options: Options){
        const { port, routes, public_path = 'public' } = options;

        this.port = port;
        this.routes = routes;
        this.public_path = public_path;
    }

    start(){

        //Middleware
        this.app.use(express.json()); //raw
        this.app.use(express.urlencoded({extended: true})); // x-www-form-urlencoded

        //Rutas 
        this.app.use(this.routes);

        //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
        })
        
        //Puerto
        this.httpServer = this.app.listen(this.port, () => {
            console.log(`Server running on port http://localhost:${this.port}`);
        });
    }

    public close(){
        this.httpServer?.close();
    }
}