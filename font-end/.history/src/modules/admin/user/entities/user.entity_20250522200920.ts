interface Permission {
  id: number |
    name: string
}

interface GroupData {
  name: string
  permissions: number[]
}

export interface UserEntity {
  id?: string;
  name: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  role?: number | string;
  permissions?: Permissions;
  permissionIds?: (number | string)[];
  roleId?: number | string;
  profile?: string;
  created_at?: string;
  updated_at?: string;
}
