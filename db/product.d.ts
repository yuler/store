interface Porduct {
  name: string
  title: string
  price: number
  markingPrice: number
  thumbnail: string
  description: string
  carousels: string[]

  provider: string

  created_at: Date
  updated_at: Date

  is_deleted: boolean
}
