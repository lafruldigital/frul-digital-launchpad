
-- =========================================
-- ENUMS
-- =========================================
CREATE TYPE public.app_role AS ENUM ('admin', 'client');

CREATE TYPE public.service_category AS ENUM (
  'dev_web',
  'strategie_digitale',
  'branding',
  'email_marketing',
  'creation_contenu',
  'videos_courtes',
  'publicite_digitale',
  'seo',
  'gestion_reseaux',
  'community_management'
);

CREATE TYPE public.request_status AS ENUM ('open', 'in_progress', 'closed');

-- =========================================
-- USER ROLES
-- =========================================
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- =========================================
-- REQUESTS (dossiers)
-- =========================================
CREATE TABLE public.requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service public.service_category NOT NULL,
  title text NOT NULL,
  form_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  status public.request_status NOT NULL DEFAULT 'open',
  reopened_for_sav boolean NOT NULL DEFAULT false,
  closed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX requests_client_id_idx ON public.requests(client_id);
CREATE INDEX requests_service_idx ON public.requests(service);
CREATE INDEX requests_status_idx ON public.requests(status);

GRANT SELECT, INSERT, UPDATE ON public.requests TO authenticated;
GRANT ALL ON public.requests TO service_role;

ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients see their own requests, admins see all"
  ON public.requests FOR SELECT
  TO authenticated
  USING (auth.uid() = client_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients create their own requests"
  ON public.requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients update their own (reopen), admins update all"
  ON public.requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = client_id OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (auth.uid() = client_id OR public.has_role(auth.uid(), 'admin'));

-- =========================================
-- MESSAGES (tchat)
-- =========================================
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES public.requests(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_role public.app_role NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX messages_request_id_idx ON public.messages(request_id);
CREATE INDEX messages_created_at_idx ON public.messages(created_at);

GRANT SELECT, INSERT ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Messages readable by owner or admin"
  ON public.messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.requests r
      WHERE r.id = request_id
        AND (r.client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

CREATE POLICY "Messages can be sent if request is open"
  ON public.messages FOR INSERT
  TO authenticated
  WITH CHECK (
    sender_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.requests r
      WHERE r.id = request_id
        AND (r.client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
        AND (r.status <> 'closed' OR r.reopened_for_sav = true)
    )
  );

-- =========================================
-- TRIGGERS: updated_at
-- =========================================
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER requests_touch_updated_at
  BEFORE UPDATE ON public.requests
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================
-- REALTIME
-- =========================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

ALTER TABLE public.requests REPLICA IDENTITY FULL;
ALTER TABLE public.messages REPLICA IDENTITY FULL;
