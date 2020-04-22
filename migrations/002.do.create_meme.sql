CREATE TABLE "meme" (
  "id" SERIAL PRIMARY KEY,
  "memeimg" BYTEA NOT NULL,
  "description" TEXT,
  "user_id" INTEGER REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL
);