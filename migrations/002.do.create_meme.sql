CREATE TABLE "posts" (
  "id" SERIAL PRIMARY KEY,
  "memeImg" VARCHAR(128) NOT NULL,
  "cloudinary_id" VARCHAR(128) NOT NULL,
  "description" TEXT,
  "likes" INTEGER,
  "user_id" INTEGER REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL
);