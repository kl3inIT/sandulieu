import Link from "next/link";
import { ArrowRight, FileText, Trash2 } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import type { Post } from "../post.types";

type PostListProps = {
  posts: Post[];
  isLoading?: boolean;
  deletingPostId?: number | null;
  onDelete?: (postId: number) => void;
};

export function PostList({
  posts,
  isLoading = false,
  deletingPostId = null,
  onDelete,
}: PostListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-[#dbcdb0]/70 bg-white/82 ring-0">
            <CardHeader>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-2/3" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[92%]" />
              <Skeleton className="h-10 w-44" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <Card className="border-dashed border-[#d6c8ac] bg-white/72 ring-0">
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-[#f4ecde] text-[#8c7550]">
            <FileText className="size-5" />
          </div>
          <div>
            <p className="font-medium text-zinc-950">Chưa có bài viết nào.</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Bạn có thể tạo bài viết mới từ khung bên cạnh để bắt đầu.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <Card key={post.id} className="border-[#dbcdb0]/70 bg-white/82 ring-0">
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="rounded-full border-[#d6c8ac] text-[#8c7550]"
                >
                  Bài viết #{post.id}
                </Badge>
                <CardTitle className="text-xl leading-8 text-zinc-950">
                  {post.title}
                </CardTitle>
              </div>
              <Badge className="rounded-full bg-[#f4ecde] text-[#8c7550] hover:bg-[#f4ecde]">
                Tác giả {post.userId}
              </Badge>
            </div>
            <CardDescription className="line-clamp-3 leading-6">
              {post.body}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Button asChild className="rounded-full px-5">
              <Link href={`/admin/posts/${post.id}`}>
                Xem chi tiết
                <ArrowRight />
              </Link>
            </Button>
            {onDelete ? (
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-[#d6c8ac] bg-white/75 px-5"
                disabled={deletingPostId === post.id}
                onClick={() => onDelete(post.id)}
              >
                <Trash2 />
                {deletingPostId === post.id ? "Đang xóa" : "Xóa nhanh"}
              </Button>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
