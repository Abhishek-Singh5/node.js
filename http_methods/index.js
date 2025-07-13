import http from 'http';
import fs from 'fs';
import url from 'url';
import path from 'path';

const server = http.createServer((req, res) => {

    if(req.url === "/favicon.ico"){
        return res.end();
    }
    const log = `${Date.now()} :-  ${req.method} ${req.url} New Request Received  \n`;

    const myUrl = url.parse(req.url, true);


    fs.appendFile("log.txt", log, (err, data) => {
        switch(myUrl.pathname) {
            case '/': 
                if (req.method === "GET") {
                        res.end("HomePage");
                    } 
            break;
            case '/login': 
                if (req.method === "GET") res.end("This is login form");
                else if (req.method === "POST") {
                    // Database query
                    res.end("Success");
                }
            break;
            case '/about':
            const username = myUrl.query.name;
            res.end(`Hello, ${username}`);
            break;

            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here are your results for " + search);
                break;
            default:
                res.end("404 Not Found");
        }
    })
});

server.listen(4000, () => console.log("Server Started"));


