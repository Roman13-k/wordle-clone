import { memo, ReactNode } from "react";
import UserAvatar from "../UserAvatar";
import Link from "next/link";

interface FriendListProps<T> {
  friends: T[];
  getKey: (item: T) => string;
  getName: (item: T) => string;
  getCover?: (item: T) => string | undefined;
  getHref: (item: T) => string;
  children?: (item: T) => ReactNode;
}

export function FriendList<T>({
  friends,
  getKey,
  getName,
  getCover,
  getHref,
  children,
}: FriendListProps<T>) {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-45">
      {friends.map((item) => {
        return (
          <div
            key={getKey(item)}
            className="flex items-center justify-between border rounded-md p-2 transition hover:border-white hover:shadow-sm"
          >
            <Link href={getHref(item)} className="flex items-center gap-2">
              <UserAvatar cover={getCover?.(item)} size={40} />
              <span className="font-medium">{getName(item)}</span>
            </Link>

            {children && <div>{children(item)}</div>}
          </div>
        );
      })}
    </div>
  );
}
