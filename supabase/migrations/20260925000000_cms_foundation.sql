-- Lovely Homestay CMS foundation. Apply with `supabase db push`.
create extension if not exists pgcrypto;

create or replace function public.set_updated_at() returns trigger
language plpgsql security invoker set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create table public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role = 'admin'),
  is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.site_settings (
  id uuid primary key default gen_random_uuid(), property_name text not null, tagline text, description text, phone text, email text, whatsapp text, address text, google_maps_url text, check_in text, check_out text, facebook_url text, instagram_url text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create unique index site_settings_singleton_idx on public.site_settings ((true));
create table public.pages (
  id uuid primary key default gen_random_uuid(), title text not null, slug text not null unique, status text not null default 'published' check (status in ('draft','published')), meta_title text, meta_description text, canonical_url text, og_image text, no_index boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.page_sections (
  id uuid primary key default gen_random_uuid(), page_id uuid not null references public.pages(id) on delete cascade, section_type text not null check (section_type in ('hero','about','highlights','amenities','rooms','gallery','faq','cta','contact')), content jsonb not null default '{}'::jsonb, sort_order integer not null default 0, is_visible boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index page_sections_page_id_sort_order_idx on public.page_sections(page_id, sort_order);
create table public.rooms (
  id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique, description text, price text, featured_image text, is_visible boolean not null default true, sort_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.amenities (
  id uuid primary key default gen_random_uuid(), name text not null, description text, icon text, sort_order integer not null default 0, is_visible boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.gallery_images (
  id uuid primary key default gen_random_uuid(), storage_path text not null, public_url text, alt_text text, caption text, sort_order integer not null default 0, is_visible boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.faqs (
  id uuid primary key default gen_random_uuid(), question text not null, answer text not null, sort_order integer not null default 0, is_visible boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null, phone text, message text not null, status text not null default 'new' check (status in ('new','read','archived')), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index contact_submissions_status_created_at_idx on public.contact_submissions(status, created_at desc);

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where id = auth.uid() and role = 'admin' and is_active = true);
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

do $$ declare t text; begin
  foreach t in array array['admin_users','site_settings','pages','page_sections','rooms','amenities','gallery_images','faqs','contact_submissions'] loop
    execute format('create trigger %I before update on public.%I for each row execute function public.set_updated_at()', t || '_set_updated_at', t);
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;

create policy "public reads site settings" on public.site_settings for select using (true);
create policy "public reads published pages" on public.pages for select using (status = 'published');
create policy "public reads visible published sections" on public.page_sections for select using (is_visible and exists (select 1 from public.pages p where p.id = page_id and p.status = 'published'));
create policy "public reads visible rooms" on public.rooms for select using (is_visible);
create policy "public reads visible amenities" on public.amenities for select using (is_visible);
create policy "public reads visible gallery" on public.gallery_images for select using (is_visible);
create policy "public reads visible faqs" on public.faqs for select using (is_visible);

do $$ declare t text; begin
  foreach t in array array['admin_users','site_settings','pages','page_sections','rooms','amenities','gallery_images','faqs','contact_submissions'] loop
    execute format('create policy %I on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', 'admins manage ' || t, t);
  end loop;
end $$;

insert into storage.buckets (id, name, public) values ('site-media', 'site-media', true) on conflict (id) do update set public = excluded.public;
create policy "public reads site media" on storage.objects for select using (bucket_id = 'site-media');
create policy "admins upload site media" on storage.objects for insert to authenticated with check (bucket_id = 'site-media' and public.is_admin());
create policy "admins update site media" on storage.objects for update to authenticated using (bucket_id = 'site-media' and public.is_admin()) with check (bucket_id = 'site-media' and public.is_admin());
create policy "admins delete site media" on storage.objects for delete to authenticated using (bucket_id = 'site-media' and public.is_admin());

-- Seed only verified content from the current public source; safe to re-run.
insert into public.site_settings (property_name, description, email, address, google_maps_url)
select 'Lovely Homestay', 'Stay at Lovely Homestay near Six Mile and VIP Road/Panjabari Road in Guwahati, Assam. Enjoy comfortable accommodation with Wi-Fi, parking, kitchen facilities and everyday essentials.', 'nazuneog@gmail.com', 'House No. 3, Jana Path, Bye Lane 17, F.A. Ahmed Nagar, Panjabari Road, Six Mile, Guwahati, Assam 781022', 'https://maps.app.goo.gl/sPNUnzCjtkEtrJ7x6'
where not exists (select 1 from public.site_settings);
insert into public.pages (title, slug, meta_title, meta_description, canonical_url, og_image) values
('Lovely Homestay', '/', 'Lovely Homestay | Comfortable Stay in Guwahati, Assam', 'Stay at Lovely Homestay near Six Mile and VIP Road/Panjabari Road in Guwahati, Assam. Enjoy comfortable accommodation with Wi-Fi, parking, kitchen facilities and everyday essentials.', '/', '/images/lovely-homestay/bedroom-main.webp'),
('About Lovely Homestay', '/about', 'About Lovely Homestay | Guwahati, Assam', 'Learn about Lovely Homestay near Six Mile and Panjabari Road, a comfortable local stay with practical amenities in Guwahati, Assam.', '/about', '/images/lovely-homestay/bedroom-main.webp'),
('Contact Lovely Homestay', '/contact', 'Contact Lovely Homestay | Guwahati, Assam', 'Contact Lovely Homestay in Guwahati to ask about accommodation availability near Six Mile and VIP Road/Panjabari Road.', '/contact', '/images/lovely-homestay/bedroom-main.webp'),
('Privacy Policy', '/privacy-policy', 'Privacy Policy | Lovely Homestay', 'Learn how Lovely Homestay handles information shared through this website and direct accommodation enquiries.', '/privacy-policy', '/images/lovely-homestay/bedroom-main.webp'),
('Terms & Conditions', '/terms-and-conditions', 'Terms & Conditions | Lovely Homestay', 'Read the website terms for Lovely Homestay accommodation information and enquiries in Guwahati, Assam.', '/terms-and-conditions', '/images/lovely-homestay/bedroom-main.webp')
on conflict (slug) do update set title = excluded.title, meta_title = excluded.meta_title, meta_description = excluded.meta_description, canonical_url = excluded.canonical_url, og_image = excluded.og_image;

insert into public.amenities (name, description, sort_order)
select v.name, v.description, v.sort_order from (values
  ('Free Wi-Fi', 'Useful everyday connectivity for an easy stay.', 1),
  ('Hot water', 'Hot water is available for guests.', 2),
  ('Kitchen facilities', 'Useful kitchen and kitchenette facilities.', 3),
  ('Free parking', 'Free parking is available at the property.', 4)
) as v(name, description, sort_order)
where not exists (select 1 from public.amenities a where a.name = v.name);

insert into public.gallery_images (storage_path, public_url, alt_text, sort_order)
select v.storage_path, v.public_url, v.alt_text, v.sort_order from (values
  ('public/images/lovely-homestay/bedroom-main.webp', '/images/lovely-homestay/bedroom-main.webp', 'Lovely Homestay main bedroom', 1),
  ('public/images/lovely-homestay/sofa-bed.webp', '/images/lovely-homestay/sofa-bed.webp', 'Blue sofa bed at Lovely Homestay', 2),
  ('public/images/lovely-homestay/kitchen.webp', '/images/lovely-homestay/kitchen.webp', 'Lovely Homestay kitchen', 3),
  ('public/images/lovely-homestay/living-dining.webp', '/images/lovely-homestay/living-dining.webp', 'Lovely Homestay living and dining area', 4),
  ('public/images/lovely-homestay/bedroom-wide.webp', '/images/lovely-homestay/bedroom-wide.webp', 'Spacious bedroom at Lovely Homestay', 5),
  ('public/images/lovely-homestay/tv-area.webp', '/images/lovely-homestay/tv-area.webp', 'TV area at Lovely Homestay', 6),
  ('public/images/lovely-homestay/bedroom-second.webp', '/images/lovely-homestay/bedroom-second.webp', 'Second bedroom at Lovely Homestay', 7)
) as v(storage_path, public_url, alt_text, sort_order)
where not exists (select 1 from public.gallery_images g where g.storage_path = v.storage_path);

insert into public.page_sections (page_id, section_type, content, sort_order)
select p.id, v.section_type, v.content::jsonb, v.sort_order from public.pages p
join (values
  ('/', 'hero', '{"title":"Lovely Homestay","subtitle":"Comfortable Stay in Guwahati, Assam"}', 1),
  ('/', 'amenities', '{"heading":"Everyday essentials"}', 2),
  ('/', 'gallery', '{"heading":"Warm local hospitality in Guwahati"}', 3),
  ('/about', 'about', '{"heading":"A comfortable place that feels like home"}', 1),
  ('/contact', 'contact', '{"heading":"Contact Us"}', 1)
) as v(slug, section_type, content, sort_order) on p.slug = v.slug
where not exists (select 1 from public.page_sections s where s.page_id = p.id and s.section_type = v.section_type and s.sort_order = v.sort_order);
