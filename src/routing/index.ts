interface ReqData {
    method: string;
    settings: {
        filter: [],
        fields: [string]
    };
}

import * as Http from "http";
import * as Ajv from "ajv";
import schema from "../schema";
import resurs from "../resurs.json";

class Routing {

    public rout(req:Http.ServerRequest, res:Http.ServerResponse):void {
        const ajv = new Ajv.default({ allErrors: true });
        const validate = ajv.compile(schema);
        let reqData: ReqData;

        res.setHeader('Content-Type', 'application/json');
        req.on('data', (data:string) => {
            reqData = JSON.parse(data);
        });

        req.on('end', () => {
            if (!validate(reqData)) {
                res.end(JSON.stringify({errors: validate.errors, data: null}));
            }

            switch(reqData.method) {
                case 'getSeats':
                    this.getData(res, resurs.response.seats, reqData);
                    break;
                case 'getSectors':
                    this.getData(res, resurs.response.sectors, reqData);
                    break;
                case 'getCategories':
                    this.getData(res, resurs.response.categories, reqData);
                    break;
                case 'getLines':
                    this.getData(res, resurs.response.lines, reqData);
                    break;
            }
        });
    }

    private multiFilter(resursData: {}, reqData: ReqData) {
        const filters = reqData.settings.filter;
        const fields = reqData.settings.fields;

        return Object.values(resursData).filter((item) => {
            return filters.every(filter => {
                return filter['value'] === item[filter['field']];
            });
        }).map((item) => {
            return fields.reduce((o, k) => { o[k] = item[k]; return o; }, {});
        });
    }

    private getData(res:Http.ServerResponse, resursData: {}, reqData: ReqData) {
        const data = this.multiFilter(resursData, reqData);
        res.end(JSON.stringify({errors: null, data}));
    }

}

export default new Routing();