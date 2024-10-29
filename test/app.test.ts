import { envs } from '../src/config/adapter/anvs';
import { Server } from '../src/config/server';

//Hacemos un mock de todo el Server
jest.mock('../src/config/server');
describe('should call server with argument and start', () =>{
    //Evaluamos que main haya sido llamado con los metodos q estamos esperando
    it('should work', async() => {

        await import ('../src/app');

        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            "port": envs.PORT, 
            "routes": expect.any(Function)
        });
        expect(Server.prototype.start).toHaveBeenCalledWith()
    })
})