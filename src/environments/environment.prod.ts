// export const environment = {
//     production: true,
//     demo: true,
//     url: {
//       getAllFeed: 'https://demo.marax.ai:8001/feed',
//       editComment: 'https://demo.marax.ai:8001/feed/comment',
//       updateFeed: 'https://demo.marax.ai:8001/feed',
//       deleteComment: 'https://demo.marax.ai:8001/feed/comment',
//       imgSource: 'https://dailyn1.marax.ai:8001/feed/images/',
//       authentication: 'https://demo.marax.ai:8000/user/login',
//       validate: 'https://dailyn1.marax.ai:8003/validate',
//       integrations: {
//         firebase: 'https://dailyninja.marax.ai:4005',
//         msg91: 'https://dailyninja.marax.ai:4009',
//       },
//       filter: 'https://dailyninja.marax.ai:4002/segment',
//       getAllCards: 'https://dailyninja.marax.ai:4005/key',
//       saveCard: 'https://dailyninja.marax.ai:4005/key',
//       getGraph: 'https://dailyninja.marax.ai:4005/push/',
//       deleteCard: 'https://dailyninja.marax.ai:4005/key',
//       segments: 'https://dailyninja.marax.ai:4004',
//       takeActionNotification: 'https://dailyninja.marax.ai:4008',
//       sendMessage: {
//         firebase: 'https://dailyninja.marax.ai:4005/push/',
//         msg91: 'https://dailyninja.marax.ai:4009/send'
//       }
//     }
//   };

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
        }

    }
};
