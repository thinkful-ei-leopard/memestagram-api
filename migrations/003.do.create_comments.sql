CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY,
  "comment" TEXT NOT NULL,
  "posts_id" INTEGER REFERENCES "posts"(id)
    ON DELETE CASCADE NOT NULL,
  "user_id" INTEGER REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL
);