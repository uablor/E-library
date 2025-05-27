export interface BookFile {
  id: number
  file_url: string
  file_type: string
  upload_timestamp: string
  deleted_at: Date | null
  updated_at: Date
  created_at: Date
}