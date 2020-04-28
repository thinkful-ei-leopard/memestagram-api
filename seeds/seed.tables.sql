BEGIN;

TRUNCATE
  "comments",
  "posts",
  "user";

INSERT INTO "user" ("id", "username", "name", "password", "userImg")
VALUES
  (
    1,
    'Demo',
    'Demo_user',
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG',
    'https://i.insider.com/5c59e77ceb3ce80d46564023?width=600&format=jpeg&auto=webp'
  ),
  (
    2,
    'coder',
    'coder38',
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG',
    'https://p1.pxfuel.com/preview/350/53/263/engineer-code-coding-software-computer-engineering-royalty-free-thumbnail.jpg'
  );

  INSERT INTO "posts" ("id", "memeImg", "description", "likes", "user_id")
  VALUES
    (
      1, 
      'https://live.staticflickr.com/5611/15033991623_66352974b6_z.jpg', 
      'When you know you messed up...', 
      0, 
      1
    ),
    (
      2,
      'https://live.staticflickr.com/5611/15033991623_66352974b6_z.jpg', 
      'When you know you messed up...', 
      0, 
      1
    ),
    (
      3,
      'https://live.staticflickr.com/5611/15033991623_66352974b6_z.jpg', 
      'When you know you messed up...', 
      0, 
      1
    ),
    (
      4,
      'https://live.staticflickr.com/5611/15033991623_66352974b6_z.jpg', 
      'When you know you messed up...', 
      0, 
      1
    );

    INSERT INTO "comments" ("id", "comment", "posts_id", "user_id")
    VALUES
      (
        1,
        'So true!',
        1,
        2
      );

COMMIT;