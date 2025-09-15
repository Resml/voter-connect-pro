-- Add missing dynamic fields to voters table
ALTER TABLE public.voters 
ADD COLUMN IF NOT EXISTS mobile_number TEXT,
ADD COLUMN IF NOT EXISTS party_worker TEXT,
ADD COLUMN IF NOT EXISTS caste TEXT,
ADD COLUMN IF NOT EXISTS nagar TEXT,
ADD COLUMN IF NOT EXISTS society TEXT,
ADD COLUMN IF NOT EXISTS role TEXT,
ADD COLUMN IF NOT EXISTS is_dead BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS birthday DATE,
ADD COLUMN IF NOT EXISTS education TEXT,
ADD COLUMN IF NOT EXISTS profession TEXT,
ADD COLUMN IF NOT EXISTS visited_by TEXT,
ADD COLUMN IF NOT EXISTS survey_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS whatsapp_status TEXT,
ADD COLUMN IF NOT EXISTS favor_status TEXT;

-- Create admins table for user management
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  email TEXT,
  activation_key TEXT NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admins table
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Create policies for admins table
CREATE POLICY "Authenticated users can read admins" 
ON public.admins 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert admins" 
ON public.admins 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update admins" 
ON public.admins 
FOR UPDATE 
USING (true);

-- Add trigger for admins table
CREATE TRIGGER update_admins_updated_at
BEFORE UPDATE ON public.admins
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();