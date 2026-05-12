# Implementation Plan: N8N Email Webhook Integration

This plan outlines the steps to integrate user signup emails with an n8n workflow using Supabase Database Webhooks. This approach ensures robust reliability, security, and bypasses CORS issues.

## User Review Required

> [!IMPORTANT]
> [!IMPORTANT]
> The n8n Webhook URL you provided (`http://n8n-t7l9tjg03pz7mvjsv60y8yhy.34.139.244.37.sslip.io/...`) has been incorporated. To avoid hardcoding and improve security, we will store this in the `public.platform_settings` table along with a secure **Webhook Secret**.

## Proposed Changes

### Database Layer (Supabase)

#### [MODIFY] Migration: `gdpr_and_webhooks` [NEW]
- Enable the `pg_net` extension for asynchronous HTTP requests.
- Add `gdpr_consent` (boolean) and `gdpr_consent_at` (timestamptz) columns to the `public.profiles` table.
- Update the `handle_new_user()` function to extract `gdpr_consent` from the user's raw metadata.
- Create a Database Webhook (using a Postgres trigger and `pg_net`) to call the n8n webhook on every new profile creation.

```sql
-- 1. Enable pg_net
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. Update profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS gdpr_consent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS gdpr_consent_at TIMESTAMPTZ;

-- 3. Configure platform_settings for n8n
INSERT INTO public.platform_settings (key, value)
VALUES (
  'n8n_config', 
  jsonb_build_object(
    'webhook_url', 'http://n8n-t7l9tjg03pz7mvjsv60y8yhy.34.139.244.37.sslip.io/webhook-test/397d45a4-9d67-47f9-9942-2be18c75100a',
    'webhook_secret', encode(gen_random_bytes(32), 'hex') -- Generates a random secret
  )
)
ON CONFLICT (key) DO UPDATE 
SET value = EXCLUDED.value;

-- 4. Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    role, 
    tokens_balance, 
    gdpr_consent, 
    gdpr_consent_at
  )
  VALUES (
    new.id, 
    'free_member'::public.user_role, 
    0,
    COALESCE((new.raw_user_meta_data->>'gdpr_consent')::boolean, false),
    CASE 
      WHEN (new.raw_user_meta_data->>'gdpr_consent')::boolean = true THEN now()
      ELSE null
    END
  );
  RETURN new;
END;
$$;

-- 5. Create n8n webhook trigger with Dynamic URL and Secret
CREATE OR REPLACE FUNCTION public.notify_n8n_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_webhook_url TEXT;
  v_webhook_secret TEXT;
BEGIN
  -- Fetch config from platform_settings
  SELECT 
    value->>'webhook_url', 
    value->>'webhook_secret' 
  INTO v_webhook_url, v_webhook_secret
  FROM public.platform_settings 
  WHERE key = 'n8n_config';

  IF v_webhook_url IS NOT NULL THEN
    PERFORM
      net.http_post(
        url := v_webhook_url,
        body := jsonb_build_object(
          'email', NEW.email,
          'user_id', NEW.id,
          'full_name', NEW.raw_user_meta_data->>'full_name',
          'gdpr_consent', (NEW.raw_user_meta_data->>'gdpr_consent')::boolean,
          'signup_at', NEW.created_at
        )::text,
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'X-Webhook-Secret', v_webhook_secret
        )
      );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_signup_send_to_n8n
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.notify_n8n_on_signup();
```

---

### Frontend Layer (React / TanStack Router)

#### [MODIFY] [signup.tsx](file:///c:/Users/marty/OneDrive/Desktop/The%20New%20World/AI%20Campus/Companion%20AI/ai-dreamscape/src/routes/signup.tsx)
- Add a state variable for `gdprConsent`.
- Implement a new checkbox for GDPR compliance.
- Update the `handleSubmit` function to include `gdpr_consent` in the `options.data` passed to `supabase.auth.signUp`.

---

## Verification Plan

### Automated Tests
- **Database**: Run a mock `INSERT` on `auth.users` and check if `public.profiles` contains the correct `gdpr_consent` value.
- **Webhook**: Use a request bin (like Webhook.site) as a temporary URL to verify that the database trigger successfully sends the JSON payload.

### Manual Verification
1. Open the `/signup` page.
2. Fill in the name, email, and password.
3. Attempt to submit without checking the GDPR box (should fail/show validation).
4. Check both boxes and submit.
5. Verify in the Supabase Dashboard that the user is created and the profile has `gdpr_consent: true`.
6. Verify in n8n that the webhook was received with the correct email.
