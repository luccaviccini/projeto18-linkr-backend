import authRoutes from './auth.routes.js';
import hashtagRoutes     from './hashtag.routes.js';
import timelineRoutes from './timeline.routes.js';
import userRoute from './user.route.js';
import followRoute from './follow.route.js';

const routes = [
    authRoutes,
    timelineRoutes,
    hashtagRoutes,
    userRoute,
    followRoute
];

export default routes;