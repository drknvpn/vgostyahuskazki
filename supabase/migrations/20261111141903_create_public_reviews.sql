/*
# Create public sauna reviews

1. New Tables
- `public_reviews` stores visitor feedback submitted directly on the sauna website.
- `id` is a generated UUID used to identify each review.
- `author_name` stores the visitor's displayed name.
- `rating` stores a score from 1 to 5.
- `review_text` stores the visitor's review text.
- `source` identifies where the review came from and defaults to `site`.
- `is_visible` controls whether a review is shown and defaults to true for instant publishing.
- `created_at` stores the submission time.

2. Security
- Row Level Security is enabled.
- Anonymous and signed-in visitors can read visible reviews and submit new reviews.
- Anonymous visitors cannot change, delete, or control moderation fields such as `source` and `is_visible`.
- Insert permissions are limited to the three visitor-provided columns.

3. Important Notes
- This is a single-location, no-sign-in review wall as requested.
- Database checks limit names, ratings, and review length at the data boundary.
*/

CREATE TABLE IF NOT EXISTS public.public_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL CHECK (char_length(btrim(author_name)) BETWEEN 2 AND 60),
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text text NOT NULL CHECK (char_length(btrim(review_text)) BETWEEN 10 AND 700),
  source text NOT NULL DEFAULT 'site' CHECK (source IN ('site', 'yandex', '2gis')),
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.public_reviews ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.public_reviews TO anon, authenticated;
GRANT INSERT (author_name, rating, review_text) ON public.public_reviews TO anon, authenticated;

DROP POLICY IF EXISTS "Anyone can read visible reviews" ON public.public_reviews;
CREATE POLICY "Anyone can read visible reviews"
ON public.public_reviews FOR SELECT
TO anon, authenticated
USING (is_visible = true);

DROP POLICY IF EXISTS "Anyone can submit a review" ON public.public_reviews;
CREATE POLICY "Anyone can submit a review"
ON public.public_reviews FOR INSERT
TO anon, authenticated
WITH CHECK (source = 'site' AND is_visible = true);

CREATE INDEX IF NOT EXISTS public_reviews_visible_created_at_idx
ON public.public_reviews (is_visible, created_at DESC);
