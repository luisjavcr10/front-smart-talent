import { UsersApi } from "../api/usersApi";
import { UsersListResponse } from "@/users/types/UserListResponse";
import { UserResponse, UserProps } from "@/users/types/UserListResponse";

export const UsersService = {
  async createUser(payload: UserProps): Promise<UserResponse> {
    try {
      const { data } = await UsersApi.createUser(payload);
      return data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error("Error creating user");
    }
  },

  async updateUser(id: string, payload: UserProps): Promise<UserResponse> {
    try {
      const { data } = await UsersApi.updateUser(id, payload);
      return data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error("Error updating user");
    }
  },

  async getUsers(): Promise<UsersListResponse[]> {
    try {
      const { data } = await UsersApi.getUsers();
      return data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error("Error getting users");
    }
  },
};
