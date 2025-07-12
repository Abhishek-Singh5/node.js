import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    // console.log("Request Submitted");
    // console.log(req); // It gives the full information about the client
    // console.log(req.headers); // when client request on the server then it gives the headers info of the client

    const log = `${Date.now()} :- \n ${req.url} \n New Request Received  \n`;
    fs.appendFile("log.txt", log, (err, data) => {
        switch(req.url) {
            case '/': res.end("Home Page");
            break;
            case '/login': res.end("Login Page");
            break;
            case '/about': res.end("I am Abhishek here");
            break;
            default:
                res.end("404 Not Found");
        }
    })

    // res.end("Hello from Server Again");
});

server.listen(4000, () => console.log("Server Started"));



// Any changes in server then re-started the server
