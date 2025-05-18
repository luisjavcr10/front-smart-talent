export type RequestsBody = {
    propietario:string,
    dni: string;
    fullname: string;
    phone: string;
    state:string,
    docs: {
      name: string;
      state: boolean;
    }[];
};