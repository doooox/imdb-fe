import { httpService } from "../HttpService";
import { IUser } from "../../types/user.types";
import ISingup from "../../types/singup.types";
import { ENDPOINTS } from "../../utils/static";
import ISingin from "../../types/singin.types";

class AuthService {
  private httpService = httpService;

  singup = async (data: ISingup) => {
    return await this.httpService.request<IUser>({
      url: ENDPOINTS.SINGUP,
      method: "POST",
      data,
    });
  };

  singin = async (data: ISingin) => {
    return await this.httpService.request<IUser>({
      url: ENDPOINTS.SINGIN,
      method: "POST",
      data,
    });
  };

  singout = async () => {
    return await this.httpService.request<{ message: string }>({
      url: ENDPOINTS.SINGOUT,
      method: "POST",
    });
  };
}

export const authService = new AuthService();
