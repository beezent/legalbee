# Supabase Authentication Setup

## 1. Create a Supabase Account
Go to [supabase.com](https://supabase.com) and create an account.

## 2. Create a New Project
1. Click "New Project"
2. Fill in your project details
3. Choose a database password
4. Select a region close to your users

## 3. Get Your Project Credentials
1. Go to Settings > API in your Supabase dashboard
2. Copy your project URL and anon public key

## 4. Configure Environment Variables
1. Create a `.env` file in your project root
2. Add the following variables:

```env
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Example:
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-key-here
```

## 5. Enable Email Authentication (Optional)
1. Go to Authentication > Settings in your Supabase dashboard
2. Ensure "Email" is enabled in "Auth Providers"
3. Configure email templates if desired

## Authentication Setup:
- 🔐 **Compulsory Registration**: All users must create an account before accessing any features
- 🛡️ **Protected Routes**: Chat interface and lawyer directory require authentication
- 🎯 **Welcome Landing Page**: Informative landing page guides new users to sign up

## Features Implemented:
- ✅ User Sign Up / Sign In (Required)
- ✅ Email & Password Authentication
- ✅ Session Management
- ✅ User Profile (name, email, avatar)
- ✅ Secure Logout
- ✅ Authentication Context for React
- ✅ Protected Routes (All routes require auth)
- ✅ User Dropdown Menu
- ✅ Loading States
- ✅ Mandatory Sign-up Landing Page

## Security Notes:
- Never commit your `.env` file to version control
- The anon key is safe to expose in client-side code
- Auth operations happen server-side via Supabase
- All authentication tokens are securely stored in localStorage by Supabase
- **All users must be authenticated to access the platform**

The authentication system is now ready and authentication is compulsory for all users!
