# Admin Panel Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd AAYANSHAdminPanel
npm install
```

### 2. Environment Setup
Create `.env` file in root directory:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Access Admin Panel
Open browser and go to: `http://localhost:5173`

## 📝 Environment Variables

### Development (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Production (.env.production)
```
VITE_API_URL=https://your-backend-domain.com/api
```

## 🔧 Configuration

### API Base URL
The API base URL is configured in `src/apis/website.js`:

```javascript
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

This uses Vite's environment variables system (`import.meta.env`).

## 📁 Project Structure

```
AAYANSHAdminPanel/
├── src/
│   ├── apis/
│   │   └── website.js          # API endpoints
│   ├── components/
│   │   ├── DashboardLayout.jsx
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── Services.jsx        # ✅ API integrated
│   │   ├── Work.jsx            # ✅ API integrated
│   │   ├── Clients.jsx         # ✅ API integrated
│   │   ├── Career.jsx          # ✅ API integrated
│   │   ├── Contact.jsx         # ✅ API integrated
│   │   ├── Dashboard.jsx
│   │   ├── Enquiries.jsx
│   │   ├── ChangePassword.jsx
│   │   └── Login.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env                        # Environment variables
├── .env.example               # Example env file
├── .gitignore
├── package.json
└── vite.config.js
```

## 🔌 API Integration

All pages are integrated with backend APIs:

### Services Page
- Fetch services from `/api/services`
- Create, update, delete services
- Real-time UI updates

### Work Page
- Fetch projects from `/api/projects`
- Create, update, delete projects
- Category management

### Clients Page
- Fetch testimonials from `/api/testimonials`
- Create, update, delete testimonials
- Star rating system

### Career Page
- Fetch jobs from `/api/jobs`
- Create, update, delete jobs
- Job type management

### Contact Page
- Fetch contact info from `/api/contact-info`
- Update contact information
- View and delete enquiries

## 🚀 Running Both Frontend & Backend

### Terminal 1 - Backend
```bash
cd Backend
npm run dev
```

### Terminal 2 - Admin Panel
```bash
cd AAYANSHAdminPanel
npm run dev
```

## 📊 Features

✅ **Authentication** - Login system with JWT
✅ **Dashboard** - Overview of website stats
✅ **Services Management** - CRUD operations
✅ **Portfolio Management** - Project management
✅ **Testimonials** - Client testimonials
✅ **Jobs** - Career postings
✅ **Contact Info** - Website contact details
✅ **Enquiries** - Website form submissions
✅ **Responsive Design** - Mobile, tablet, desktop
✅ **Dark Mode Support** - Theme switching
✅ **Toast Notifications** - User feedback
✅ **Loading States** - Better UX

## 🧪 Testing

### Test Services Page
1. Go to "Manage Services"
2. Click "Add Service"
3. Fill form and submit
4. Service appears in list
5. Click "Edit" to modify
6. Click "Delete" to remove

### Test Other Pages
Same workflow for Work, Clients, Career, and Contact pages.

## 🔐 Security

- ✅ Environment variables for API URL
- ✅ JWT authentication
- ✅ Protected routes
- ✅ Error handling
- ✅ Input validation

## 📱 Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Icons**: React Icons
- **Notifications**: Sonner
- **Colors**: Slate, Blue, Purple, Green, Red

## 🛠️ Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

## 📖 Documentation

- Backend: `../Backend/README.md`
- Backend Setup: `../Backend/QUICK_START.md`
- Website Management: `./WEBSITE_MANAGEMENT_GUIDE.md`
- API Integration: `./API_INTEGRATION_COMPLETE.md`

## 🚨 Troubleshooting

### API Not Connecting
- Check backend is running on port 5000
- Check `.env` file has correct API URL
- Check browser console for errors

### Data Not Loading
- Verify MongoDB is connected
- Check network tab in DevTools
- Verify API endpoints are correct

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear browser cache

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API base URL | http://localhost:5000/api |

## 🔄 Development Workflow

1. Start backend server
2. Start admin panel
3. Login with credentials
4. Navigate to desired page
5. Perform CRUD operations
6. See real-time updates

## 📚 Dependencies

- react: ^19.2.0
- react-router-dom: ^7.13.1
- axios: ^1.13.6
- tailwindcss: ^4.2.1
- sonner: ^2.0.7
- react-icons: ^5.6.0

## 🎯 Next Steps

1. ✅ Admin panel setup complete
2. ⏳ Connect website to APIs
3. ⏳ Add authentication
4. ⏳ Deploy to production

---

**Status**: ✅ Admin Panel Ready!
