# Dashboard Access Information

## 🎨 Color Scheme
Both admin and instructor dashboards now use the homepage color scheme:
- **Primary Beige**: `#eadcc8` (backgrounds, borders)
- **Olive Green**: `#858e47` (primary actions, stats icons, hover states)
- **Orange Accent**: `#df8739` (buttons, highlights, secondary actions)

## 🔐 Access Control
Access to dashboards is role-based and secured:
- **Admin Dashboard**: Only accessible to users with `admin` role
- **Instructor Dashboard**: Only accessible to users with `instructor` role
- **Student Dashboard**: Only accessible to users with `student` role

If a user tries to access a dashboard they don't have permission for, they will be automatically redirected to their appropriate dashboard based on their role.

## 🌐 Access Links

### Admin Dashboard
**URL**: `http://localhost:5174/admin/dashboard`
**Required Role**: `admin`

**Features**:
- Welcome banner with gradient olive green background
- 4 stat cards (Total Users, Total Courses, Instructors, Total Revenue)
- Top performing courses grid
- Platform overview and recent activity
- Recent users table with management actions
- All buttons use orange (#df8739) color scheme
- Fully responsive (320px - 4K)

### Instructor Dashboard
**URL**: `http://localhost:5174/instructor/dashboard`
**Required Role**: `instructor`

**Features**:
- Welcome banner with gradient olive green background
- 4 stat cards (Total Courses, Total Students, Total Earnings, Avg Rating)
- My courses section with course grid
- Quizzes management section
- Live classes schedule
- Create course button in orange (#df8739)
- Fully responsive (320px - 4K)

## ✨ Design Features

### Both Dashboards Include:
1. **3D Hover Effects**: Cards lift and rotate slightly on hover
2. **Homepage Color Matching**: All colors match the homepage (#eadcc8, #858e47, #df8739)
3. **Responsive Design**: Works perfectly on all devices
   - Desktop: 1920px and above
   - Laptop: 1024px - 1920px
   - Tablet: 768px - 1024px
   - Mobile: 320px - 768px
4. **Modern Gradients**: Welcome banners use olive green gradient
5. **Smooth Transitions**: All hover effects and state changes are animated
6. **Consistent Borders**: All cards use beige (#eadcc8) borders
7. **Orange Action Buttons**: All primary action buttons use orange (#df8739)

## 🔒 Security Features

### ProtectedRoutes Component
Both dashboards are wrapped in the `ProtectedRoutes` component that:
1. Checks if user is logged in
2. Verifies user role matches required role
3. Redirects unauthorized users to their appropriate dashboard
4. Redirects non-logged-in users to login page

### Role Verification Flow:
```
User tries to access dashboard
    ↓
Is user logged in? → NO → Redirect to /login
    ↓ YES
Does user role match required role? → NO → Redirect to user's dashboard
    ↓ YES
Grant access to dashboard
```

## 📱 Responsive Breakpoints

### Large Desktop (1920px+)
- Full 4-column stat grid
- 3-column course grid
- Full-width tables
- Spacious padding

### Desktop (1100px - 1920px)
- 2-column stat grid
- 2-column course grid
- Optimized spacing

### Tablet (700px - 1100px)
- 2-column stat grid
- 2-column course/quiz grid
- Stacked welcome banner
- Responsive buttons

### Mobile (320px - 700px)
- Single-column stat grid
- Single-column course grid
- Stacked elements
- Full-width buttons
- Compact padding
- Smaller stat icons (42px)

## 🎯 Access Instructions

### For Testing:

1. **To access Admin Dashboard**:
   - Login with admin credentials
   - Navigate to: `http://localhost:5174/admin/dashboard`

2. **To access Instructor Dashboard**:
   - Login with instructor credentials or create instructor account at `/signup/instructor`
   - Navigate to: `http://localhost:5174/instructor/dashboard`

3. **If you don't have access**:
   - You'll be automatically redirected to your role's dashboard
   - Non-logged-in users will be redirected to `/login`

## 🚀 Deployment Notes

When deploying to production:
1. Update the base URL in environment variables
2. Access links will be:
   - Admin: `https://yourdomain.com/admin/dashboard`
   - Instructor: `https://yourdomain.com/instructor/dashboard`
3. All styling and access control will work the same

## ✅ Testing Checklist

- [x] Homepage colors applied (#eadcc8, #858e47, #df8739)
- [x] Access control implemented (ProtectedRoutes)
- [x] Admin dashboard fully responsive
- [x] Instructor dashboard fully responsive
- [x] 3D hover effects on cards
- [x] Orange buttons throughout
- [x] Olive green welcome banners
- [x] Role-based redirects working
- [x] Build successful with no errors
- [x] All responsive breakpoints tested (320px - 4K)

---

**Last Updated**: January 2025
**Build Status**: ✅ Successful
**Responsive**: ✅ 320px - 4K
**Access Control**: ✅ Role-based
**Color Scheme**: ✅ Homepage colors applied
