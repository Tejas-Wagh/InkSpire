-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "likes" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "totalLikes" SET DEFAULT 0;
