type PageProps = { params: { residentId: string } };

export default function Page({ params }: PageProps) {
  return <main>{params.residentId}</main>;
}
