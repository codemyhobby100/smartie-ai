import express from 'express';
        import validateRequest from '../../middlewares/validateRequest';
        import { UserApiLimitController } from './userApiLimit.controller';
        import { UserApiLimitValidation } from './userApiLimit.validation';
        const router = express.Router();
        
        router.get('/', UserApiLimitController.getAllUserApiLimit);
        router.get('/:id', UserApiLimitController.getSingleUserApiLimit);
        
        router.post(
          '/',
          validateRequest(UserApiLimitValidation.createValidation),
          UserApiLimitController.createUserApiLimit
        );
        
        router.patch(
          '/:id',
          validateRequest(UserApiLimitValidation.updateValidation),
          UserApiLimitController.updateUserApiLimit
        );
        router.delete('/:id', UserApiLimitController.deleteUserApiLimit);
        
        export const UserApiLimitRoutes = router;