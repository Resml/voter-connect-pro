-- Create voters table with all 22 columns
CREATE TABLE public.voters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ac_no TEXT,
  part_no TEXT,
  slnoinpart TEXT,
  section_no TEXT,
  house_number TEXT,
  applicant_full_name_l1 TEXT,
  applicant_full_name TEXT,
  applicant_first_name_l1 TEXT,
  applicant_first_name TEXT,
  applicant_last_name_l1 TEXT,
  applicant_last_name TEXT,
  age INTEGER,
  gender TEXT,
  relation_type TEXT,
  relation_full_name_l1 TEXT,
  relation_full_name TEXT,
  relation_last_name_l1 TEXT,
  epic_number TEXT,
  v_address_l1 TEXT,
  v_address TEXT,
  booth_address_l1 TEXT,
  booth_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.voters ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (you can restrict later)
CREATE POLICY "Allow all operations on voters" 
ON public.voters 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_voters_updated_at
BEFORE UPDATE ON public.voters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();