export async function validFileTypesRealEstate(file: any): Promise<any> {
  const allowedTypes = ["image/jpeg", "image/jpg"];
  return allowedTypes.includes(file.type);
}

export async function validFileTypes(file: any): Promise<any> {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  return allowedTypes.includes(file.type);
}

export async function isValidFileSize(file: any): Promise<any> {
  const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
  return file.size <= maxSizeInBytes;
}
