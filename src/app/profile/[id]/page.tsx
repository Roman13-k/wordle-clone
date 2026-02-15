import ProfileScreen from "@/components/screens/ProfileScreen";
import MainContainer from "@/components/ui/layout/MainContainer";

export default async function UserPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  return (
    <MainContainer>
      <ProfileScreen id={id} />;
    </MainContainer>
  );
}
