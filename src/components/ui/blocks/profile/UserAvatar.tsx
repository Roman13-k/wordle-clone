import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../shared/avatar";

interface UserAvatarProps {
  cover?: string;
  size?: number;
  className?: string;
}

export default function UserAvatar({
  cover,
  size,
  className = "",
}: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={cover} />
      <AvatarFallback>
        <User size={size} />
      </AvatarFallback>
    </Avatar>
  );
}
