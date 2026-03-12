# AAYANSH Admin Panel - Website Content Management

## 🎯 New Features Added

Admin panel mein website ke dynamic content management ke liye 5 naye pages add kiye gaye hain:

### 1. **Services Management** (`/services`)
- Services add, edit, delete kar sakte ho
- Har service mein:
  - Title
  - Description
  - Image URL
- Grid view mein display hota hai
- Real-time preview available

### 2. **Portfolio/Work Management** (`/work`)
- Website ke projects/portfolio manage kar sakte ho
- Har project mein:
  - Title
  - Category (Construction, Painting, Waterproofing, etc.)
  - Image URL
- Category-wise filtering possible
- Card-based layout

### 3. **Testimonials/Clients Management** (`/clients`)
- Client testimonials add, edit, delete kar sakte ho
- Har testimonial mein:
  - Client Name
  - Role/Title
  - Testimonial Text
  - Star Rating (1-5)
- Star rating visual display

### 4. **Career/Jobs Management** (`/career`)
- Job postings manage kar sakte ho
- Har job mein:
  - Job Title
  - Location
  - Job Type (Full Time, Part Time, Contract, Internship)
  - Salary Range
- List view mein display hota hai
- Easy edit/delete functionality

### 5. **Contact & Enquiries Management** (`/contact`)
- Website contact information manage kar sakte ho:
  - Phone Number
  - Email Address
  - Physical Address
- Website se aane wale enquiries view kar sakte ho
- Enquiry delete kar sakte ho
- Table format mein display

## 📁 File Structure

```
src/
├── pages/
│   ├── Services.jsx          (New)
│   ├── Work.jsx              (New)
│   ├── Clients.jsx           (Updated - now for testimonials)
│   ├── Career.jsx            (New)
│   ├── Contact.jsx           (New)
│   └── ... (existing pages)
├── apis/
│   └── website.js            (New - API endpoints)
├── components/
│   └── DashboardLayout.jsx   (Updated - new routes)
└── App.jsx                   (Updated - new routes)
```

## 🔄 Sidebar Navigation

Updated sidebar mein naye menu items:
- 📊 Dashboard
- 🔧 Manage Services
- 💼 Manage Portfolio
- 👷 Manage Careers
- 👥 Manage Testimonials
- 📞 Contact & Enquiries
- 📧 Manage Enquiry (existing)
- 🖼️ Manage Gallery (existing)
- 🔐 Change Password (existing)

## 💾 Data Management

Abhi local state mein data store ho raha hai. Production ke liye:

1. Backend API endpoints create karne hain:
   - `/api/services` - CRUD operations
   - `/api/projects` - CRUD operations
   - `/api/testimonials` - CRUD operations
   - `/api/jobs` - CRUD operations
   - `/api/contact-info` - GET/UPDATE
   - `/api/website-enquiries` - GET/DELETE

2. Database models create karne hain (MongoDB/SQL)

3. `src/apis/website.js` mein API calls already prepared hain

## 🎨 UI Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Toast notifications (success/error)
- ✅ Form validation
- ✅ Image preview
- ✅ Loading states
- ✅ Smooth animations
- ✅ Consistent styling with existing admin panel

## 🚀 How to Use

1. **Add New Item**: Click "Add [Item]" button
2. **Fill Form**: Enter required details
3. **Preview**: Image preview available for services/portfolio
4. **Save**: Click save button
5. **Edit**: Click edit button on any item
6. **Delete**: Click delete button (with confirmation via toast)

## 📝 Notes

- Abhi mock data use ho raha hai
- Backend integration ke liye `src/apis/website.js` use karna
- Har page mein toast notifications hain success/error messages ke liye
- Form validation implemented hai
- Responsive design fully implemented

## 🔗 Integration Steps

1. Backend API endpoints create karo
2. `src/apis/website.js` mein API base URL update karo
3. Har page mein API calls integrate karo (useEffect, axios)
4. Database models create karo
5. Authentication/Authorization add karo

---

**Status**: ✅ Frontend Complete | ⏳ Backend Integration Pending
