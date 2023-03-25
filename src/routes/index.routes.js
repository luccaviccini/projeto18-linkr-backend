import authRoutes from './auth.routes.js';
import hashtagRoutes     from './hashtag.routes.js';
import timelineRoutes from './timeline.routes.js';

const routes = [
    authRoutes,
    timelineRoutes,
    hashtagRoutes
];

export default routes;