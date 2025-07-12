import http from 'http';
import fs from 'fs';
import url from 'url';
import path from 'path';

const server = http.createServer((req, res) => {

    if(req.url === "/favicon.ico"){
        return res.end();
    }
    const log = `${Date.now()} :-  ${req.url} New Request Received  \n`;

    const myUrl = url.parse(req.url, true);
    console.log(myUrl); 

    fs.appendFile("log.txt", log, (err, data) => {
        switch(myUrl.pathname) {
            case '/': res.end("Home Page");
            break;
            case '/login': res.end("Login Page");
            break;
            case '/about':
            const username = myUrl.query.name;
            res.end(`Hello, ${username}`);
            break;

            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here are your results for " + search);
                // http://localhost:4000/search?search_query=javascript+rock+paper+secissor
                break;
            default:
                res.end("404 Not Found");
        }
    })
});

server.listen(4000, () => console.log("Server Started"));


// http://localhost:4000/about?name=Raju&id=12&search=lion
