import { UserApiLimit, Prisma } from '@prisma/client';
        import httpStatus from 'http-status';
        import ApiError from '../../../errors/ApiError';
        import { paginationHelpers } from '../../../helpers/paginationHelper';
        import { IGenericResponse } from '../../../interfaces/common';
        import { IPaginationOptions } from '../../../interfaces/pagination';
        import prisma from '../../../shared/prisma';
        import { userApiLimitSearchableFields } from './userApiLimit.constant';
        import { IUserApiLimitFilters } from './userApiLimit.interface';
        
        const getAllUserApiLimit = async (
          filters: IUserApiLimitFilters,
          paginationOptions: IPaginationOptions
        ): Promise<IGenericResponse<UserApiLimit[]>> => {
          const { page, limit, skip } =
            paginationHelpers.calculatePagination(paginationOptions);
        
          const { searchTerm, ...filterData } = filters;
        
          const andCondition = [];
        
          if (searchTerm) {
            const searchAbleFields = userApiLimitSearchableFields.map(single => {
              const query = {
                [single]: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              };
              return query;
            });
            andCondition.push({
              OR: searchAbleFields,
            });
          }
          if (Object.keys(filters).length) {
            andCondition.push({
              AND: Object.keys(filterData).map(key => ({
                [key]: {
                  equals: (filterData as any)[key],
                },
              })),
            });
          }
        
          const whereConditions: Prisma.UserApiLimitWhereInput =
            andCondition.length > 0 ? { AND: andCondition } : {};
        
          const result = await prisma.userApiLimit.findMany({
            where: whereConditions,
            skip,
            take: limit,
            orderBy:
              paginationOptions.sortBy && paginationOptions.sortOrder
                ? {
                    [paginationOptions.sortBy]: paginationOptions.sortOrder,
                  }
                : {
                    createdAt: 'desc',
                  },
          });
          const total = await prisma.userApiLimit.count();
          const output = {
            data: result,
            meta: { page, limit, total },
          };
          return output;
        };
        
        const createUserApiLimit = async (
          payload: UserApiLimit
        ): Promise<UserApiLimit | null> => {
          const newUserApiLimit = await prisma.userApiLimit.create({
            data: payload,
          });
          return newUserApiLimit;
        };
        
        const getSingleUserApiLimit = async (
          id: string
        ): Promise<UserApiLimit | null> => {
          const result = await prisma.userApiLimit.findUnique({
            where: {
              id,
            },
          });
          return result;
        };
        
        const updateUserApiLimit = async (
          id: string,
          payload: Partial<UserApiLimit>
        ): Promise<UserApiLimit | null> => {
          const result = await prisma.userApiLimit.update({
            where: {
              id,
            },
            data: payload,
          });
          return result;
        };
        
        const deleteUserApiLimit = async (
          id: string
        ): Promise<UserApiLimit | null> => {
          const result = await prisma.userApiLimit.delete({
            where: { id },
          });
          if (!result) {
            throw new ApiError(httpStatus.NOT_FOUND, 'UserApiLimit not found!');
          }
          return result;
        };
        
        export const UserApiLimitService = {
          getAllUserApiLimit,
          createUserApiLimit,
          updateUserApiLimit,
          getSingleUserApiLimit,
          deleteUserApiLimit,
        };