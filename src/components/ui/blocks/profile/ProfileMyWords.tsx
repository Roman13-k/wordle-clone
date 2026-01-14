import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/card";
import { Button } from "../../shared/button";
import { Plus } from "lucide-react";

export default function ProfileMyWords() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Мои слова</CardTitle>
        <CardDescription>Слова, которые вы придумали</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="flex gap-2">
          <Plus className="h-4 w-4" />
          Добавить слово
        </Button>
      </CardContent>
    </Card>
  );
}
