"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState, type FormEvent } from "react";
import {
  Bold,
  Calendar,
  Eye,
  Heading1,
  Heading2,
  ImagePlus,
  Italic,
  List,
  Loader2,
  Pencil,
  Quote,
  Trash2,
  Underline,
} from "lucide-react";

import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createAdminBlog,
  deleteAdminBlog,
  updateAdminBlog,
} from "@/lib/api/admin/blogs";
import { uploadAdminImage } from "@/lib/api/admin/uploads";
import { ApiError } from "@/lib/api/apiError";
import { formatAdminDate } from "@/lib/format-date";
import { slugifyTitle } from "@/lib/slug";
import { cn } from "@/lib/utils";
import type { AdminBlogDetail, AdminBlogPayload } from "@/types/admin";

const MAX_ADDITIONAL_IMAGES = 6;

type AdminBlogFormProps = {
  mode: "create" | "edit";
  initialBlog?: AdminBlogDetail;
};

function buildPayload(state: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  isPublished: boolean;
  images: string[];
}): AdminBlogPayload {
  return {
    title: state.title.trim(),
    slug: state.slug.trim(),
    excerpt: state.excerpt.trim(),
    content: state.content,
    coverImageUrl: state.coverImageUrl,
    status: state.isPublished ? "published" : "draft",
    images: state.images.map((imageUrl, index) => ({
      imageUrl,
      position: index + 1,
    })),
  };
}

export function AdminBlogForm({ mode, initialBlog }: AdminBlogFormProps) {
  const router = useRouter();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialBlog?.title ?? "");
  const [slug, setSlug] = useState(initialBlog?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [excerpt, setExcerpt] = useState(initialBlog?.excerpt ?? "");
  const [content, setContent] = useState(initialBlog?.content ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(
    initialBlog?.coverImageUrl ?? ""
  );
  const [images, setImages] = useState<string[]>(
    initialBlog?.images.map((image) => image.imageUrl) ?? []
  );
  const [isPublished, setIsPublished] = useState(
    initialBlog?.status === "published"
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGalleryUploading, setIsGalleryUploading] = useState(false);

  const pageTitle = mode === "create" ? "Create article" : "Edit article";

  const handleTitleChange = (value: string) => {
    setTitle(value);

    if (!slugTouched) {
      setSlug(slugifyTitle(value));
    }
  };

  const wrapSelection = (prefix: string, suffix = prefix) => {
    const textarea = contentRef.current;

    if (!textarea) {
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end) || "text";
    const next =
      content.slice(0, start) + prefix + selected + suffix + content.slice(end);

    setContent(next);
  };

  const handleGalleryUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    const remaining = MAX_ADDITIONAL_IMAGES - images.length;

    if (remaining <= 0) {
      setError(`You can upload at most ${MAX_ADDITIONAL_IMAGES} additional images.`);
      return;
    }

    setError(null);
    setIsGalleryUploading(true);

    try {
      const uploads = await Promise.all(
        files.slice(0, remaining).map((file) => uploadAdminImage(file))
      );
      setImages((current) => [...current, ...uploads]);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Unable to upload images."
      );
    } finally {
      setIsGalleryUploading(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = buildPayload({
      title,
      slug,
      excerpt,
      content,
      coverImageUrl,
      isPublished,
      images,
    });

    try {
      if (mode === "create") {
        await createAdminBlog(payload);
        router.push("/admin");
        return;
      }

      if (!initialBlog) {
        return;
      }

      await updateAdminBlog(initialBlog.id, payload);
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Unable to save this article."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!initialBlog) {
      return;
    }

    const confirmed = window.confirm(
      "Delete this article? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await deleteAdminBlog(initialBlog.id);
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Unable to delete this article."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const metaItems = useMemo(() => {
    if (!initialBlog) {
      return [];
    }

    return [
      {
        icon: Calendar,
        label: `Created ${formatAdminDate(initialBlog.createdAt)}`,
      },
      {
        icon: Pencil,
        label: `Last edited ${formatAdminDate(initialBlog.updatedAt)}`,
      },
      {
        icon: Eye,
        label: `${initialBlog.viewCount.toLocaleString("en-US")} views`,
      },
    ];
  }, [initialBlog]);

  return (
    <form onSubmit={handleSubmit} className="flex min-h-full flex-col">
      <header className="border-b border-border bg-background px-8 py-6">
        <h1 className="text-headline text-2xl">{pageTitle}</h1>

        {mode === "edit" && metaItems.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {metaItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.label} className="flex items-center gap-2">
                  <Icon aria-hidden="true" className="size-4" />
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        ) : null}
      </header>

      <div className="flex-1 space-y-6 px-8 py-6">
        {error ? (
          <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <section className="surface-card space-y-5 p-6">
          <Input
            label="Title"
            name="title"
            placeholder="Enter article title"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            required
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="slug" className="text-label text-foreground">
              URL slug
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center rounded-lg border border-border bg-background">
                <span className="shrink-0 border-r border-border px-3 py-3 text-sm text-muted-foreground">
                  /blog/
                </span>
                <input
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    setSlug(event.target.value);
                  }}
                  placeholder="url-slug-here"
                  className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none"
                  required
                />
              </div>
              <Button
                type="button"
                variant="outline"
                className="h-11 shrink-0"
                onClick={() => setSlug(slugifyTitle(title))}
              >
                Generate from title
              </Button>
            </div>
          </div>

          <Textarea
            label="Excerpt"
            name="excerpt"
            placeholder="Write a short summary..."
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            className="min-h-24"
          />
        </section>

        <section className="surface-card space-y-4 p-6">
          <div className="flex flex-wrap gap-2 border-b border-border pb-4">
            {[
              { icon: Bold, action: () => wrapSelection("**") },
              { icon: Italic, action: () => wrapSelection("_") },
              { icon: Underline, action: () => wrapSelection("__") },
              { icon: Heading1, action: () => wrapSelection("# ", "") },
              { icon: Heading2, action: () => wrapSelection("## ", "") },
              { icon: Quote, action: () => wrapSelection("> ", "") },
              { icon: List, action: () => wrapSelection("- ", "") },
            ].map(({ icon: Icon, action }, index) => (
              <button
                key={index}
                type="button"
                onClick={action}
                className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Format text"
              >
                <Icon aria-hidden="true" className="size-4" />
              </button>
            ))}
          </div>

          <Textarea
            label="Content"
            name="content"
            placeholder="Start writing the main content here..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="min-h-64"
            ref={contentRef}
            required
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="surface-card p-6">
            <ImageUploadField
              label="Cover image"
              value={coverImageUrl}
              onChange={setCoverImageUrl}
              variant="cover"
            />
          </div>

          <div className="surface-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-label text-foreground">Additional images</span>
              <span className="text-sm text-muted-foreground">
                {images.length}/{MAX_ADDITIONAL_IMAGES}
              </span>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {images.map((imageUrl, index) => (
                <li key={`${imageUrl}-${index}`}>
                  <figure className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={imageUrl}
                      alt={`Additional image ${index + 1}`}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages((current) =>
                          current.filter((_, itemIndex) => itemIndex !== index)
                        )
                      }
                      className="absolute top-2 right-2 rounded-full bg-background/90 p-1 shadow-sm"
                      aria-label={`Remove additional image ${index + 1}`}
                    >
                      <Trash2 aria-hidden="true" className="size-4" />
                    </button>
                  </figure>
                </li>
              ))}

              {images.length < MAX_ADDITIONAL_IMAGES ? (
                <li>
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    disabled={isGalleryUploading}
                    className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 text-sm text-muted-foreground transition-colors hover:bg-muted/50"
                  >
                    {isGalleryUploading ? (
                      <Loader2 aria-hidden="true" className="size-5 animate-spin" />
                    ) : (
                      <ImagePlus aria-hidden="true" className="size-5" />
                    )}
                    <span>Add image</span>
                  </button>
                </li>
              ) : null}
            </ul>

            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={handleGalleryUpload}
            />
          </div>
        </section>

        <section className="surface-card flex items-center justify-between gap-4 p-6">
          <div>
            <p className="text-sm font-medium text-foreground">Status</p>
            <p className="text-sm text-muted-foreground">
              Choose whether to publish this article or save it as a draft.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={isPublished}
            onClick={() => setIsPublished((current) => !current)}
            className={cn(
              "relative h-7 w-12 rounded-full transition-colors",
              isPublished ? "bg-foreground" : "bg-muted"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 size-6 rounded-full bg-background transition-transform",
                isPublished ? "left-5" : "left-0.5"
              )}
            />
            <span className="sr-only">Publish article</span>
          </button>
        </section>
      </div>

      <footer className="mt-auto flex flex-col-reverse gap-3 border-t border-border bg-background px-8 py-5 sm:flex-row sm:items-center sm:justify-between">
        {mode === "edit" ? (
          <Button
            type="button"
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive/5"
            onClick={handleDelete}
            disabled={isDeleting || isSubmitting}
          >
            <Trash2 aria-hidden="true" className="size-4" />
            {isDeleting ? "Deleting..." : "Delete article"}
          </Button>
        ) : (
          <span />
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/admin"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-6")}
          >
            Cancel
          </Link>
          <Button
            type="submit"
            variant="inverted"
            size="lg"
            className="h-11 px-8"
            disabled={isSubmitting || isDeleting}
          >
            {isSubmitting ? "Saving..." : mode === "create" ? "Save" : "Save changes"}
          </Button>
        </div>
      </footer>
    </form>
  );
}
