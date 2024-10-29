import express, { Router } from 'express';
import { Server, Options } from '../../src/config/server'; // Ajusta la ruta de importación si es necesario
import path from 'path';
import { envs } from '../../src/config/adapter/anvs';

jest.mock('express', () => {
    const use = jest.fn();
    const get = jest.fn();
    const listen = jest.fn((port, callback) => {
        callback();
        return { close: jest.fn() };
    });

    return jest.fn(() => ({
        use,
        get,
        listen,
    }));
})

describe('Server.ts', () => {

    let options: Options;
    let server: Server;
    let mockHttpServer: any;

    beforeEach(() => {
        options = {
            port: envs.PORT,
            routes: expect.any(Function),
            public_path: 'public',
        };
        server = new Server(options);
        mockHttpServer = express();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should initialize with given options', () => {

        expect(server).toBeInstanceOf(Server);

        expect(server['port']).toBe(options.port);
        expect(server['routes']).toBe(options.routes);
        expect(server['public_path']).toBe(options.public_path);
    });

    test('should start server on the specified port', () => {

        server.start();

        expect(mockHttpServer.listen).toHaveBeenCalledWith(options.port, expect.any(Function));
    });

    test('should close the server listener', () => {

        server.start();

        server.close();

        const mockClose = mockHttpServer.listen.mock.results[0].value.close;

        expect(mockClose).toHaveBeenCalled();
    });
});