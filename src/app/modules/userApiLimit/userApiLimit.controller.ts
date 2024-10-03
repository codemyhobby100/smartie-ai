import { UserApiLimit } from '@prisma/client';
        import { Request, Response } from 'express';
        import { RequestHandler } from 'express-serve-static-core';
        import httpStatus from 'http-status';
        import { paginationFields } from '../../../constants/pagination';
        import catchAsync from '../../../shared/catchAsync';
        import pick from '../../../shared/pick';
        import sendResponse from '../../../shared/sendResponse';
        import { UserApiLimitService } from './userApiLimit.service';
        import { userApiLimitFilterAbleFields } from './userApiLimit.constant';
        const createUserApiLimit: RequestHandler = catchAsync(
          async (req: Request, res: Response) => {
            const UserApiLimitData = req.body;
        
            const result = await UserApiLimitService.createUserApiLimit(
              UserApiLimitData
            );
            sendResponse<UserApiLimit>(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: 'UserApiLimit Created successfully!',
              data: result,
            });
          }
        );
        
        const getAllUserApiLimit = catchAsync(
          async (req: Request, res: Response) => {
            const filters = pick(req.query, [
              'searchTerm',
              ...userApiLimitFilterAbleFields,
            ]);
            const paginationOptions = pick(req.query, paginationFields);
        
            const result = await UserApiLimitService.getAllUserApiLimit(
              filters,
              paginationOptions
            );
        
            sendResponse<UserApiLimit[]>(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: 'UserApiLimit retrieved successfully !',
              meta: result.meta,
              data: result.data,
            });
          }
        );
        
        const getSingleUserApiLimit: RequestHandler = catchAsync(
          async (req: Request, res: Response) => {
            const id = req.params.id;
        
            const result = await UserApiLimitService.getSingleUserApiLimit(id);
        
            sendResponse<UserApiLimit>(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: 'UserApiLimit retrieved  successfully!',
              data: result,
            });
          }
        );
        
        const updateUserApiLimit: RequestHandler = catchAsync(
          async (req: Request, res: Response) => {
            const id = req.params.id;
            const updateAbleData = req.body;
        
            const result = await UserApiLimitService.updateUserApiLimit(
              id,
              updateAbleData
            );
        
            sendResponse<UserApiLimit>(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: 'UserApiLimit Updated successfully!',
              data: result,
            });
          }
        );
        const deleteUserApiLimit: RequestHandler = catchAsync(
          async (req: Request, res: Response) => {
            const id = req.params.id;
        
            const result = await UserApiLimitService.deleteUserApiLimit(id);
        
            sendResponse<UserApiLimit>(res, {
              statusCode: httpStatus.OK,
              success: true,
              message: 'UserApiLimit deleted successfully!',
              data: result,
            });
          }
        );
        
        export const UserApiLimitController = {
          getAllUserApiLimit,
          createUserApiLimit,
          updateUserApiLimit,
          getSingleUserApiLimit,
          deleteUserApiLimit,
        };