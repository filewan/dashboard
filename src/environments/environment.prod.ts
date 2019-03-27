export const environment = {
    production: true,
    demo: true,
    url: 'https://pilot.filewan.com',
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
                    endpoint: 'profile/create',
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
                url: 'https://pilot.filewan.com:8001/document/download?f='
            },
            upload: {
                url: 'https://pilot.filewan.com:8001/document/upload'
            }
        }

    }
};
