var pm2Config = {
    apps: [
        {
            name: 'train-ticketing-api',
            script: 'server.fastify.js',
            exec_mode: 'fork',
            instances: 'max',
            watch: false,
            exp_backoff_restart_delay: 100,
            /* check every 30 seconds for memory limit and restart*/
            max_memory_restart: '1G',
            /* graceful shutdown */
            shutdown_with_message: true,
            /* forceful shutdown */
            kill_timeout: 15000,
            kill_retry_time: 5000 /* pm2 ignores this change  */,
            /* wait to become healthy */
            wait_ready: true,
            /* unique port for each process, 4001, 4002,.. */
            increment_var: 'PORT',
            env: {
                PORT: 4000,
            },
        },
    ],
};

module.exports = pm2Config;
