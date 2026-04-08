import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import type { Post } from "../post.types";

type PostDetailCardProps = {
  post: Post;
};

export function PostDetailCard({ post }: PostDetailCardProps) {
  return (
    <Card className="border-white/8 bg-[#0d1523] text-white ring-0">
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="rounded-full bg-white/10 text-white hover:bg-white/10">
            Bài viết #{post.id}
          </Badge>
          <Badge className="rounded-full bg-[#d9c48d]/14 text-[#f5e1ae] hover:bg-[#d9c48d]/14">
            Tác giả {post.userId}
          </Badge>
        </div>
        <CardTitle className="text-2xl text-white">{post.title}</CardTitle>
        <CardDescription className="text-zinc-300">
          Đây là phần xem nhanh nội dung để bạn tiện kiểm tra trước khi chỉnh
          sửa.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-zinc-200">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#d8c79a]">
            Nội dung bài viết
          </p>
          <p className="mt-2 whitespace-pre-wrap leading-7 text-zinc-100">
            {post.body}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
