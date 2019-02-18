import * as Http from 'http';
import routing from './routing';

class App {
    public server:Http.Server;

    constructor() {
        this.server = Http.createServer(this.onRequest);
    }

    private onRequest(req:Http.ServerRequest, res:Http.ServerResponse):void {
        if(req.method == 'POST')
        {
            routing.rout(req, res);
        }
        else
        {
            res.writeHead(405, {'Content-type':'application/json'});
            res.write(JSON.stringify({error: "Method not allowed"}));
            res.end();
        }

    }


}

export default new App().server;