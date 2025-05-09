import { object, type ObjectSchema } from "yup";

export const loginSchema: ObjectSchema<any> = object({
  // email: string().required("ກະລຸນາປ້ອນຊື່ກ່ອນ."),
  // password: string().required('ກະລຸນາປ້ອນລະຫັດຜ່ານກ່ອນ.'),
});
