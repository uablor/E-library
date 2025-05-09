
export interface StudentEntity {
    id?: string
    first_name : string,
    last_name : string,
    phone : string,
    department : string,
    brith_day : Date | null,
    code_student : string,
    villege_id : string,
    created_at?: Date,
    updated_at?: Date,
    is_deleted?: boolean,
    delete_at?: Date,
  }