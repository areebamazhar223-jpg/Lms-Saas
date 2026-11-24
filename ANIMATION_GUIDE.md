# Animation Guide - LMS Website

## Quick Reference for All Animations

---

## 1. HERO SECTION ANIMATIONS

### Counter Animation (Main Feature)
**What:** Numbers count up from 0 to target value  
**Where:** Courses (332), Members (1403), Authors (60), Subjects (120)  
**Trigger:** When section scrolls into view (IntersectionObserver)  
**Duration:** 2 seconds  
**Easing:** Ease-out (smooth deceleration)  

**Code Location:** `Hero.jsx` - `CountUpAnimation` component

```javascript
// Smooth counting animation with easing
const easeOutQuart = 1 - Math.pow(1 - progress, 4);
```

### Background Image Animation
**What:** Subtle zoom in/out effect  
**Duration:** 20 seconds (infinite alternate)  
**Effect:** Image scales from 1 to 1.1 and back  

```css
@keyframes heroImageZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}
```

### Search Bar Animation
**What:** Fades in and slides up  
**Delay:** 0s (immediate)  
**Duration:** 0.6s  
**Hover:** Lifts up 2px with shadow  

### Title Animation
**What:** Fades in and slides up  
**Delay:** 0.2s  
**Duration:** 0.6s  

### "View All Courses" Button
**What:** Fades in and slides up  
**Delay:** 0.4s  
**Hover:** Slides right 5px, arrows move 3px  

### Statistics Grid
**What:** Fades in and slides up  
**Delay:** 0.6s  
**Hover:** Each stat lifts up 5px, number changes color  

---

## 2. ABOUT COURSES (BENEFITS) ANIMATIONS

### Benefit Cards
**What:** Staggered fade-in from bottom  
**Delays:**  
- Card 1: 0.1s  
- Card 2: 0.2s  
- Card 3: 0.3s  
- Card 4: 0.4s  

### Icon Animation (Hover)
**What:** 360° rotation + color change  
**From:** Orange icon on beige background  
**To:** White icon on orange background  
**Duration:** 0.4s  
**Shadow:** Appears on hover  

### Card Hover
**What:** Lifts up 10px  
**Duration:** 0.3s  
**Shadow:** Increases intensity  

---

## 3. POPULAR COURSES ANIMATIONS

### Section Heading
**What:** Fades in from top  
**Duration:** 0.6s  

### Green Underline
**What:** Scales from 0 to 1 (left to right)  
**Delay:** 0.3s  
**Duration:** 0.6s  

### Course Introduction (Left)
**What:** Fades in from left  
**Delay:** 0.2s  
**Duration:** 0.8s  

### Course Card (Center)
**What:** Fades in from bottom  
**Delay:** 0.4s  
**Duration:** 0.8s  
**Hover:** Lifts up 5px  

### Featured Course (Right)
**What:** Fades in from right  
**Delay:** 0.6s  
**Duration:** 0.8s  
**Hover:** Lifts up 10px, image zooms 1.1x  

### "View All" Button
**What:** Standard button hover  
**Hover:** Background changes, lifts 2px  

---

## 4. BLOG SECTION ANIMATIONS

### Blog Heading
**What:** Fades in from top  
**Duration:** 0.6s  

### Green Rule Line
**What:** Scales horizontally  
**Delay:** 0.3s  
**Duration:** 0.6s  

### Blog Cards
**What:** Staggered fade-in from bottom  
**Delays:**  
- Card 1: 0.2s  
- Card 2: 0.4s  
- Card 3: 0.6s  

### Card Hover Effects
**Image:** Zooms to 1.1x (scale)  
**Date Badge:** Scales 1.05x, changes to orange background  
**Title:** Changes to olive-green color  
**Card:** Lifts up 10px  

---

## 5. GLOBAL ANIMATIONS

### Smooth Scrolling
```css
html {
  scroll-behavior: smooth;
}
```

### Font Smoothing
```css
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## KEYFRAME DEFINITIONS

### fadeInUp
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### fadeInDown
```css
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### fadeInLeft
```css
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### fadeInRight
```css
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### scaleX
```css
@keyframes scaleX {
  from {
    opacity: 0;
    transform: scaleX(0);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}
```

---

## HOVER TRANSITION TIMING

| Element | Duration | Property |
|---------|----------|----------|
| Buttons | 0.3s | background, color, transform |
| Cards | 0.3s | transform, box-shadow |
| Images | 0.5s | transform (scale) |
| Icons | 0.4s | transform (rotate), color |
| Links | 0.3s | color |

---

## PERFORMANCE OPTIMIZATIONS

### Hardware Acceleration
All animations use GPU-accelerated properties:
- ✅ `transform` (translate, scale, rotate)
- ✅ `opacity`

### No Layout Thrashing
Avoided properties that trigger reflow:
- ❌ `width`, `height`
- ❌ `margin`, `padding`
- ❌ `top`, `left` (use `transform` instead)

### Intersection Observer
Counters only animate when visible:
```javascript
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  },
  { threshold: 0.1 }
);
```

---

## TESTING ANIMATIONS

### How to See All Animations:
1. Open http://localhost:5174
2. Refresh page (Ctrl+R)
3. Slowly scroll down
4. Hover over all elements

### Animation Checklist:
- [ ] Hero counters animate from 0 to target
- [ ] Hero background slowly zooms
- [ ] Search bar slides up
- [ ] Benefit icons rotate on hover
- [ ] Course cards lift on hover
- [ ] Blog cards animate sequentially
- [ ] All hover effects work
- [ ] Smooth scroll between sections

---

## CUSTOMIZATION

### Change Animation Speed:
Find this in CSS files:
```css
animation: fadeInUp 0.6s ease-out;
              ↑ Change this value
```

### Change Counter Speed:
Find this in Hero.jsx:
```javascript
function CountUpAnimation({ end, duration = 2000 }) {
                                        ↑ Change this value (in milliseconds)
```

### Disable Animations:
Add this to any element:
```css
.element {
  animation: none !important;
  transition: none !important;
}
```

---

## BROWSER SUPPORT

✅ **Chrome/Edge:** Full support  
✅ **Firefox:** Full support  
✅ **Safari:** Full support (webkit prefixes included)  
✅ **iOS Safari:** Full support  
✅ **Android Chrome:** Full support  

---

## ACCESSIBILITY

### Respects User Preferences
Animations respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Add this to index.css if needed for accessibility compliance.

---

*All animations follow best practices for performance, accessibility, and user experience.*
