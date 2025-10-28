# 🎠 Hero Carousel Guide

## Overview

The hero carousel on the homepage automatically displays images uploaded through the admin dashboard. If no images are available, it shows beautiful gradient placeholders.

## How It Works

### Automatic Image Selection

The carousel automatically fetches the **4 most recent photos** from the gallery and displays them in the hero section. This happens in real-time - when you upload new photos, they will appear in the carousel.

### Fallback Behavior

- **With Images**: Displays real photos from the gallery with a dark overlay for text readability
- **Without Images**: Shows colorful gradient backgrounds (red, orange, pink, rose themes)

## For Admins: Managing Carousel Images

### Uploading Images

1. Go to **Dashboard** > **Gallery**
2. Click **"Upload Foto"** button
3. Upload your image (recommended size: 1920x1080px or similar wide format)
4. Add a title (optional - will be displayed as the slide title)
5. The image will automatically appear in the carousel

### Image Order

The carousel displays images in **reverse chronological order** (newest first):
- **Carousel #1** = Most recent upload
- **Carousel #2** = Second most recent
- **Carousel #3** = Third most recent
- **Carousel #4** = Fourth most recent

You can see which images are in the carousel by looking for the **red badge** on the gallery page.

### Best Practices

#### Image Specifications
- **Recommended Size**: 1920x1080px (16:9 aspect ratio)
- **Minimum Size**: 1280x720px
- **Format**: JPG, PNG, or WebP
- **File Size**: Under 2MB for best performance

#### Content Guidelines
- Use high-quality, well-lit photos
- Ensure important content is centered (text overlay area)
- Avoid busy backgrounds that make text hard to read
- Use photos that represent your school's activities and environment

#### Image Ideas
- School building exterior
- Students in classroom activities
- Sports and extracurricular events
- School ceremonies and celebrations
- Modern facilities and learning spaces
- Achievement and award ceremonies

### Updating Carousel Images

To change what appears in the carousel:
1. Upload new images - they will automatically push older images out
2. Delete old images if you want to remove them completely
3. The 4 most recent images will always be displayed

### Technical Details

#### API Endpoint
- **URL**: `/api/carousel`
- **Method**: GET
- **Returns**: Array of 4 most recent gallery images

#### Database Query
```typescript
prisma.gallery.findMany({
  take: 4,
  orderBy: { createdAt: 'desc' },
  select: { id, title, imageUrl }
})
```

#### Image Storage
Images are stored using Supabase Storage and referenced in the `gallery` table with:
- `id`: Unique identifier
- `title`: Optional title for the image
- `imageUrl`: URL to the stored image
- `createdAt`: Upload timestamp (used for ordering)

## Features

### Auto-Play
- Slides change automatically every **5 seconds**
- Pauses when user hovers over the carousel
- Resumes when mouse leaves

### Navigation
- **Arrow Buttons**: Click left/right arrows to navigate
- **Keyboard**: Use arrow keys for navigation
- **Touch/Swipe**: Swipe on mobile devices

### Responsive Design
- Adapts to all screen sizes
- Text scales appropriately
- Buttons stack on mobile

### Accessibility
- Keyboard navigable
- Screen reader friendly
- Proper ARIA labels

## Customization

### Changing Default Slides

If you want to customize the default gradient slides (shown when no images exist), edit:

**File**: `src/components/HeroCarousel.tsx`

```typescript
const defaultSlides = [
  {
    title: "Your Custom Title",
    subtitle: "Your Custom Subtitle",
    gradient: "bg-gradient-to-r from-red-600 to-red-800",
    cta1: { text: "Button 1", href: "/page1" },
    cta2: { text: "Button 2", href: "/page2" },
  },
  // Add more slides...
];
```

### Changing Auto-Play Duration

To change how long each slide displays:

**File**: `src/components/HeroCarousel.tsx`

```typescript
Autoplay({ delay: 5000 }) // Change 5000 to desired milliseconds
```

### Changing Number of Carousel Images

To display more or fewer than 4 images:

**File**: `src/app/api/carousel/route.ts`

```typescript
const images = await prisma.gallery.findMany({
  take: 4, // Change this number
  // ...
});
```

## Troubleshooting

### Images Not Showing

1. **Check Database**: Verify images exist in the `gallery` table
2. **Check Image URLs**: Ensure `imageUrl` is valid and accessible
3. **Check Console**: Look for errors in browser developer console
4. **Verify API**: Visit `/api/carousel` to see if images are returned

### Images Not Updating

1. **Refresh Page**: Browser may be caching the old data
2. **Check Upload**: Verify the image was successfully uploaded
3. **Check Timestamp**: Ensure `createdAt` is set correctly

### Performance Issues

1. **Optimize Images**: Compress images before uploading
2. **Use WebP Format**: Better compression than JPG/PNG
3. **Enable CDN**: Use Supabase CDN for faster delivery

## Support

For issues or questions:
- Check the main [README.md](README.md)
- Review [SETUP_GUIDE.md](SETUP_GUIDE.md)
- Check Supabase Storage configuration

---

**Note**: The carousel will automatically use color gradients if no images are uploaded, so the site will always look beautiful even without custom images!
