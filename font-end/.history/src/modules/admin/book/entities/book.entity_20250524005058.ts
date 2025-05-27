export interface Book {
  id: number
  image?: string
  title?: string
  author?: string
  isbn?: string
  publisher?: string
  publish_date?: string
  category?: string
  type?: string
}

export interface BookFile {
  id: number
  file_url: string
  file_type: string
  upload_timestamp: string
  deleted_at: Date | null
  updated_at: string
  created_at: string
  book_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Book',
  required: true,
},
}