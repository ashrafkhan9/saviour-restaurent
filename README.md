# Restaurant Website

A comprehensive restaurant website built with Next.js, featuring online ordering, table reservations, and admin dashboard.

## Features

- 🍽️ **Menu Browsing**: Browse menu items with categories, filters, and search
- 🛒 **Shopping Cart**: Add items with variants and add-ons to cart
- 💳 **Checkout**: Secure checkout with Stripe payment integration
- 📅 **Reservations**: Book tables with availability checking
- 👤 **User Accounts**: Sign up, login, and manage orders/reservations
- 🎛️ **Admin Dashboard**: Manage menu, orders, reservations, and settings
- 🎨 **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- 📱 **Mobile-First**: Responsive design for all devices
- 🔍 **SEO Optimized**: Meta tags, structured data, and clean URLs

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **UI**: Tailwind CSS + shadcn/ui (Radix UI)
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe
- **Email**: Resend (optional)
- **File Storage**: Cloudinary (optional)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or managed like Supabase/Neon)
- Stripe account (for payments)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd restaurent-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/restaurant?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Optional: Email (Resend)
RESEND_API_KEY="re_..."
```

4. **Set up PostgreSQL Database** ⚠️
   
   📖 **See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed PostgreSQL setup instructions**
   
   Quick steps:
   - **Option A (Easiest)**: Use a cloud service like [Supabase](https://supabase.com) or [Neon](https://neon.tech) (both have free tiers)
   - **Option B**: Install PostgreSQL locally (see DATABASE_SETUP.md for your OS)

5. Set up the database:
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database with sample data
npm run db:seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

After running the seed script, you can use these demo accounts:

- **Admin**: `admin@demo.com` / `admin123`
- **User**: `user@demo.com` / `user123`
- **Staff**: `staff@demo.com` / `staff123`

## Project Structure

```
restaurent-web/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── menu/              # Menu page
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout flow
│   ├── reservations/      # Reservation booking
│   └── admin/             # Admin dashboard
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Header, Footer
│   └── menu/             # Menu-related components
├── lib/                  # Utility functions
│   ├── prisma.ts         # Prisma client
│   ├── auth.ts           # NextAuth configuration
│   └── stripe.ts         # Stripe client
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Prisma schema
│   └── seed.ts          # Seed script
├── hooks/                # Custom React hooks
└── types/                # TypeScript type definitions
```

## Key Features Implementation

### Menu System
- Categories with display order
- Menu items with variants (sizes, options)
- Add-on groups with required/optional selections
- Dietary tags (vegetarian, vegan, gluten-free, spicy)
- Availability management

### Shopping Cart
- Persistent cart (localStorage)
- Variants and add-ons support
- Quantity management
- Real-time total calculation

### Checkout
- Order type selection (Pickup/Delivery)
- Address collection for delivery
- Payment method selection (Card/Cash)
- Stripe payment integration
- Order confirmation

### Reservations
- Date and time slot selection
- Party size management
- Table availability checking
- Confirmation emails (optional)

### Admin Dashboard
- Menu CMS (categories, items, variants, add-ons)
- Order management
- Reservation management
- Analytics and reports

## API Routes

- `GET /api/menu` - Get menu items (with optional category and search filters)
- `GET /api/menu/categories` - Get all categories
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `POST /api/payments/intent` - Create Stripe payment intent
- `POST /api/payments/webhook` - Stripe webhook handler
- `GET /api/reservations/slots` - Get available reservation slots
- `POST /api/reservations` - Create reservation
- `GET /api/reservations/:id` - Get reservation details

## Database Schema

The application uses PostgreSQL with the following main entities:
- Users (with roles: ADMIN, USER, STAFF_KITCHEN, STAFF_FRONT_DESK)
- Categories and MenuItems
- Variants and AddOns
- Orders and OrderItems
- Payments
- Reservations and Tables
- Coupons, OpeningHours, Holidays
- Reviews

See `prisma/schema.prisma` for complete schema.

## Deployment

📖 **See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment guide**

### Quick Deploy Options

#### Vercel (Recommended - Easiest)
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Connect PostgreSQL database (Neon, Supabase, etc.)
5. Deploy!

#### Docker
```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build production image
docker build -t restaurant-app .
docker run -p 3000:3000 restaurant-app
```

#### Traditional Server
```bash
# Run deployment preparation script
npm run deploy:prepare

# Start with PM2
pm2 start npm --name "restaurant-app" -- start
```

### Environment Variables for Production

See `.env.example` for all required variables. Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `DIRECT_URL` - Direct PostgreSQL connection (for migrations)
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `STRIPE_SECRET_KEY` - Use live keys in production
- `RESEND_API_KEY` - For email notifications (optional)

### Health Checks

- Health endpoint: `/api/health`
- Status endpoint: `/api/status`

## Development

### Database Migrations

```bash
# Create a new migration
npm run db:migrate

# Apply migrations
npx prisma migrate deploy
```

### Seed Data

```bash
npm run db:seed
```

This creates:
- 3 demo users (admin, user, staff)
- 5 categories
- 10+ menu items with variants and add-ons
- 10 tables
- Opening hours
- 2 coupons

## Future Enhancements

- Kitchen Display System (KDS)
- Order status tracking with real-time updates
- Email/SMS notifications
- Loyalty program
- Multi-branch support
- Delivery partner integrations
- Gift cards
- Multi-language support
- Advanced analytics

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or contributions, please open an issue on the repository.
