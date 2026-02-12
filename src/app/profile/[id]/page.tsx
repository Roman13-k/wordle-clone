import ProfileScreen from "@/components/screens/ProfileScreen";

export default async function UserPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  return <ProfileScreen id={id} />;
}
