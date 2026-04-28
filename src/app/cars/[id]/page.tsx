import CarDetail from "@/components/CarDetail";

export default async function CarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CarDetail carId={id} />;
}
