const http = require('http');
const Gun = require('gun');

const server = http.createServer();
server.listen(9004);

const gun = new Gun({
    web:server,
    verify : {
        check : function(){
            console.log("Server is running on port "+ 9004);
            return true;
        }
    }
});
