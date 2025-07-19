import fs from 'fs';

function logReqRes(filename){
    return (req, res, next) => {
        fs.appendFile(
            filename,
            `\n ${Date.now()} : ${req.ip} ${req.method} : ${req.path}`,
            (err, data) => {
                next();
            }
        );
    };
}


export default logReqRes;