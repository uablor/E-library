import { object, string, ObjectSchema } from "yup";

interface ErrorMessages {
  facebook: string;
}

// Define the schema function type alias
type SchemaFunction = (
  errorMessages: ErrorMessages
) => ObjectSchema<ErrorMessages>;

// Define the schema function
const schemaFunction: SchemaFunction = (errorMessages) =>
  object({
    facebook: string().required(errorMessages.facebook),
  });

// Assign the schema function to customerSchema
export const footerSchema = schemaFunction;
