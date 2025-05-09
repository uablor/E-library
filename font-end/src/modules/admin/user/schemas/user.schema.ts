import { object, string, ObjectSchema } from "yup";

interface ErrorMessages {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
}

// Define the schema function type alias
type UserSchemaFunction = (
  errorMessages: ErrorMessages
) => ObjectSchema<ErrorMessages>;

// Define the schema function
const userSchemaFunction: UserSchemaFunction = (errorMessages) =>
  object({
    name: string().required(errorMessages.name),
    email: string().required(errorMessages.email),
    password: string().required(errorMessages.password),
    password_confirmation: string().required(
      errorMessages.password_confirmation
    ),
  });

// Assign the schema function to customerSchema
export const userServiceSchema = userSchemaFunction;

/** Edit User */
interface EditErrorMessages {
  name: string;
  email: string;
}

// Define the schema function type alias
type EditUserSchemaFunction = (
  errorMessages: EditErrorMessages
) => ObjectSchema<EditErrorMessages>;
// Define the schema function
const eidtUserSchemaFunction: EditUserSchemaFunction = (errorMessages) =>
  object({
    name: string().required(errorMessages.name),
    email: string().required(errorMessages.email),
  });

// Assign the schema function to customerSchema
export const editUserServiceSchema = eidtUserSchemaFunction;
