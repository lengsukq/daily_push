const http = require('http');

const PORT = 3000; // 你可以选择任何未被占用的端口

const server = http.createServer((req, res) => {
    const clientIp = req.socket.remoteAddress;
    console.log(`访问IP地址: ${clientIp}`);

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`你的IP地址是: ${clientIp}`);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`服务器正在端口 ${PORT} 上运行，监听所有网络接口`);
});