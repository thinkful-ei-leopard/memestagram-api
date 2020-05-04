CREATE TABLE "posts" (
  "id" SERIAL PRIMARY KEY,
  "memeImg" TEXT NOT NULL,
  "description" TEXT,
  "likes" INTEGER,
  "user_id" INTEGER REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL
);