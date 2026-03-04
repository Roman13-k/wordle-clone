"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/card";
import { UserI } from "@/interfaces/user";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import CreateWordModal from "./CreateWordModal";
import { useGetUserWords } from "@/hooks/api/queries/useGetUserWords";
import { ListState } from "@/components/ui/shared/listState";

export default function ProfileMyWords({ user }: { user: UserI }) {
  const { data: ownUser } = useGetUser();
  const {
    data: userWords,
    isLoading,
    isError,
    refetch,
  } = useGetUserWords(ownUser?.id);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Мои слова</CardTitle>
          {ownUser?.id === user.id && <CreateWordModal />}
        </div>
      </CardHeader>
      <CardContent>
        <ListState
          isLoading={isLoading}
          isError={isError}
          isEmpty={!isLoading && userWords?.length === 0}
          onRetry={refetch}
          emptyFallback={
            <p className="text-sm text-muted-foreground">
              У вас пока нет своих слов. Создайте их, чтобы играть в Wordle с
              друзьями!
            </p>
          }
        >
          <ul className="space-y-2">
            {userWords?.map((word) => (
              <li key={word.id}>{word.word}</li>
            ))}
          </ul>
        </ListState>
      </CardContent>
    </Card>
  );
}
