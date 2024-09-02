// 扫描局域网内的设备192.168.1.1-192.168.255.255
// 账号密码为root 1
// 端口号22
const { exec } = require('child_process');
const { Client } = require('ssh2');

const baseIP = '192.168'; // 修改为你的子网前缀
const startRange1 = 1;
const endRange1 = 255;
const startRange2 = 1;
const endRange2 = 255;
const username = 'root';
const password = '1';

async function scanNetwork() {
    for (let i = startRange1; i <= endRange1; i++) {
        for (let j = startRange2; j <= endRange2; j++) {
            const ip = `${baseIP}.${i}.${j}`;
            try {
                await ping(ip);
                console.log(`${ip} is alive`);
                try {
                    await connectSSH(ip, username, password);
                    console.log(`Successfully connected to ${ip}`);
                } catch (sshError) {
                    console.error(`Failed to connect to ${ip} via SSH:`, sshError.message);
                }
            } catch (pingError) {
                console.error(`${ip} is not reachable`);
            }
        }
    }
}

function ping(ip) {
    return new Promise((resolve, reject) => {
        exec(`ping -c 1 -W 1 ${ip}`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

function connectSSH(ip, username, password) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        conn.on('ready', () => {
            conn.end();
            resolve();
        }).on('error', (err) => {
            reject(err);
        }).connect({
            host: ip,
            port: 22,
            username: username,
            password: password
        });
    });
}

scanNetwork();