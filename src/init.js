//初始化数据

let init = async () => {
    const db = require('./service/db');
    try {
        let t_logs = await db.executeAsync(`
            CREATE TABLE IF NOT EXISTS \`t_logs\` (
        \`id\` int(11) NOT NULL AUTO_INCREMENT,
        \`level\` enum('error','info','warn') DEFAULT 'info',
        \`content\` varchar(255) NOT NULL,
        \`userId\` varchar(45) NOT NULL,
        \`createTime\` varchar(45) DEFAULT NULL,
        PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=UTF8;
        `, null);
        let t_uesr = `
            CREATE TABLE \`t_user\` (
            \`id\` int(11) NOT NULL AUTO_INCREMENT,
            \`username\` varchar(45) DEFAULT NULL,
            \`password\` char(32) DEFAULT NULL,
            \`url\` varchar(45) DEFAULT NULL,
            \`token\` varchar(45) DEFAULT NULL,
            \`lastTime\` bigint(13) NOT NULL,
            \`createTime\` bigint(13) DEFAULT NULL,
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`username_UNIQUE\` (\`username\`)
            ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=UTF8;
        `;
        console.log(`init t_logs=${t_logs}, t_user=${t_user}`);
    } catch(e) {
        throw e;
    }
};

module.exports = init;