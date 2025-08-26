-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  college_email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create listings table
CREATE TABLE public.listings (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')),
  category_id UUID REFERENCES public.categories(id),
  seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  images TEXT[], -- Array of image URLs
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS on listings
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Insert default categories
INSERT INTO public.categories (name, description) VALUES
  ('Textbooks', 'Academic textbooks and study materials'),
  ('Electronics', 'Calculators, laptops, and electronic devices'),
  ('Supplies', 'Stationery, notebooks, and office supplies'),
  ('Furniture', 'Dorm and study furniture'),
  ('Clothing', 'College apparel and general clothing'),
  ('Other', 'Miscellaneous items');

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- RLS Policies for categories
CREATE POLICY "Anyone can view categories" 
  ON public.categories 
  FOR SELECT 
  USING (true);

-- RLS Policies for listings
CREATE POLICY "Anyone can view available listings" 
  ON public.listings 
  FOR SELECT 
  USING (is_available = true OR seller_id = auth.uid());

CREATE POLICY "Users can create their own listings" 
  ON public.listings 
  FOR INSERT 
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update their own listings" 
  ON public.listings 
  FOR UPDATE 
  USING (auth.uid() = seller_id);

CREATE POLICY "Users can delete their own listings" 
  ON public.listings 
  FOR DELETE 
  USING (auth.uid() = seller_id);

-- Create storage bucket for listing images
INSERT INTO storage.buckets (id, name, public) VALUES ('listing-images', 'listing-images', true);

-- Storage policies for listing images
CREATE POLICY "Anyone can view listing images" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'listing-images');

CREATE POLICY "Authenticated users can upload listing images" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'listing-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own listing images" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'listing-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own listing images" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'listing-images' AND auth.uid()::text = (storage.foldername(name))[1]);