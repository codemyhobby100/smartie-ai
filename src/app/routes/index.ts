import { UserApiLimitRoutes } from '../modules/userApiLimit/userApiLimit.router';
    
  import express from 'express';
    const router = express.Router();

    const moduleRoutes = [
    // ... routes
    
    {
        path: "/userApiLimit",
        route: UserApiLimitRoutes
    },
      
    ];

    moduleRoutes.forEach(route => router.use(route.path, route.route));
    export default router;

    