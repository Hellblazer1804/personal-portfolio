import ProjectContent from "./_content";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectContent id={id} />;
}
