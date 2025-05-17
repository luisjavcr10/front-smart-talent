export type RequestsType = {
    dni: string;
    fullname: string;
    phone: string;
    docs: {
      name: string;
      state: boolean;
    }[];
};