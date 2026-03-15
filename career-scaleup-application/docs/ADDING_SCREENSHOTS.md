# How to Add Screenshots to Landing Page

## Step 1: Prepare Your Screenshots

1. Take screenshots of your platform:
   - Dashboard Overview
   - Resume Builder Interface
   - AI Interview Coach
   - Job Matching Results
   - Messaging Interface
   - Analytics Dashboard

2. Recommended image specifications:
   - Format: PNG or JPG
   - Resolution: 1600x900px or higher (16:9 aspect ratio)
   - File size: Optimize to under 500KB per image
   - Quality: High quality, clear and readable

## Step 2: Add Images to Project

1. Create a `screenshots` folder in the `public` directory:
   ```
   public/
     screenshots/
       dashboard.png
       resume-builder.png
       interview-coach.png
       job-matching.png
       messaging.png
       analytics.png
   ```

2. Name your files descriptively (e.g., `dashboard-overview.png`)

## Step 3: Update the Component

Open `components/landing/platform-screenshots.tsx` and update the screenshots array:

```typescript
const screenshots: Screenshot[] = [
  {
    title: "Dashboard Overview",
    description: "Comprehensive dashboard showing job matches, application status, and career insights",
    placeholder: "/screenshots/dashboard-overview.png", // Update this path
    alt: "Career ScaleUp Dashboard",
  },
  // ... update other screenshots
];
```

## Step 4: Enable Images

In the same file, find the placeholder div and replace it with the Image component:

**Before (placeholder):**
```tsx
<div className="absolute inset-0 flex items-center justify-center">
  <div className="text-center space-y-3 p-8">
    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
    <p className="text-sm text-muted-foreground">Screenshot Placeholder</p>
  </div>
</div>
```

**After (actual image):**
```tsx
<Image
  src={screenshot.placeholder}
  alt={screenshot.alt}
  fill
  className="object-cover group-hover:scale-105 transition-transform duration-300"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

And comment out or remove the placeholder div.

## Step 5: Optimize Images (Optional but Recommended)

Use tools like:
- **TinyPNG** (https://tinypng.com/) - Compress PNG/JPG
- **Squoosh** (https://squoosh.app/) - Advanced image optimization
- **ImageOptim** - For Mac users

## Quick Reference

**File Location:** `components/landing/platform-screenshots.tsx`

**Screenshot Array:** Lines 15-50 (approximately)

**Image Path Format:** `/screenshots/your-image-name.png`

**Component Location in Page:** Between "Enhanced Features" and "How It Works" sections

## Example Screenshot Names

- `dashboard-overview.png`
- `resume-builder.png`
- `interview-coach.png`
- `job-matching.png`
- `messaging-interface.png`
- `analytics-dashboard.png`

## Tips

1. **Consistency:** Use similar styling/theme across all screenshots
2. **Remove sensitive data:** Blur or remove any personal information
3. **Highlight features:** Use annotations or callouts to highlight key features
4. **Mobile screenshots:** Consider adding mobile views if applicable
5. **File naming:** Use kebab-case (lowercase with hyphens) for file names

