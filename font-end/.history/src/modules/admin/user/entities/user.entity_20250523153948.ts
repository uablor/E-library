export interface Permission {
  id: number | string
  name: string
}

export interface GroupData {
  name: string
  permissions: number[]
}

export interface User {
  id: number;
  avatar?: string;
  code_student?: string;
  username?: string;
  email?: string;
  firstname?: string;
  birthday?: string;
  address?: string;
  department?: string;
  phone?: string;
  is_staff?: boolean;
  is_active?: boolean;
  is_superuser?: boolean;
  is_verify?: boolean;
}

