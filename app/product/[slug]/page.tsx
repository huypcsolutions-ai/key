
interface Props {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: Props) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Product: {params.slug}</h1>
      <p>Product detail page</p>
    </div>
  )
}
