-- Set the existing user as admin
INSERT INTO public.user_roles (user_id, role) 
VALUES ('fd78a8f0-148d-420c-8116-1d05c9d8c59b', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';