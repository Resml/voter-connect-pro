-- Secure voters table by removing public access and restricting to authenticated users only
-- 1) Ensure RLS is enabled
ALTER TABLE public.voters ENABLE ROW LEVEL SECURITY;

-- 2) Drop overly permissive policy
DROP POLICY IF EXISTS "Allow all operations on voters" ON public.voters;

-- 3) Restrictive, explicit policies
-- Read access only for authenticated users
CREATE POLICY "Authenticated users can read voters"
ON public.voters
FOR SELECT
TO authenticated
USING (true);

-- Insert access only for authenticated users
CREATE POLICY "Authenticated users can insert voters"
ON public.voters
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Update access only for authenticated users
CREATE POLICY "Authenticated users can update voters"
ON public.voters
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Delete access only for authenticated users
CREATE POLICY "Authenticated users can delete voters"
ON public.voters
FOR DELETE
TO authenticated
USING (true);