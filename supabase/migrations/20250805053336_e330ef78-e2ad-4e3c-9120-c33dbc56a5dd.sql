-- Add unique constraint on user_id if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'user_roles_user_id_key'
  ) THEN
    ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_key UNIQUE (user_id);
  END IF;
END $$;

-- Now insert the admin role for the existing user
INSERT INTO public.user_roles (user_id, role) 
VALUES ('fd78a8f0-148d-420c-8116-1d05c9d8c59b', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';