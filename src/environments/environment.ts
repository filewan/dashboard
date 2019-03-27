export const environment = {
    production: true,
    demo: true,
    url: 'http://localhost',
    services: {
        authentication: {
            port: '8000',
            resources: {
                update: {
                    endpoint: 'user/login',
                    method: 'post'
                }
            },
        },
        profile: {
            port: '8001',
            resources: {
                create: {
                    endpoint: 'profile/login',
                    method: 'post'
                },
                update: {
                    endpoint: 'profile/update',
                    method: 'patch'
                },
                read: {
                    endpoint: 'profile/get',
                    method: 'post'
                }
            }
        },
        document: {
            download: {
                url: 'http://localhost:8001/document/download?f='
            },
            upload: {
                url: 'http://localhost:8001/document/upload'
            }
        }

    }
};
