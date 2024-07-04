# Linktr.ee Clone
## Overview
This project is a clone of the popular Linktr.ee platform, built with Next.js, NextAuth, TailwindCSS, and Mongoose. It allows users to create a personalized page for sharing multiple links in a single profile. The application offers a variety of features for managing links and customizing the appearance of the user's page.

## Features
**Authentication**
- **Create Account**: Users can create a new account.
- **Login**: Users can log into their account using secure authentication.

**Link Management**
- **Add Links**: Users can add new links to their profile.
- **Archive Links**: Users can archive links that they no longer want to display.
- **Restore Archived Links**: Users can restore previously archived links.
- **Delete Links**: Users can permanently delete links from their profile.
- **Change Link Order**: Users can reorder their links for a customized display.

**Appearance Customization**
- **Page Themes**: Users can choose from predefined page themes or create a custom theme.
- **Custom Theme Options**:
    - Background Types:
    - Flat Color
    - Gradient
    - Image/GIF
    - Stripes
- **Color Customization**: Users can change colors for Flat Color, Gradient, and Stripes backgrounds.
- **Image Customization**: Users can upload and change the background image/GIF.
- **Avatar and Display Name**: Users can change their avatar and display name to personalize their page.

## Pages

- **Index Page** - The landing page of the application.

- **Login and Register Pages** - Dedicated pages for user authentication - login and register.

- **User Page** - Public-facing user page where all the added links are displayed.

- **Admin Page** - Admin interface where users can manage their links, including adding, archiving, restoring, deleting, and reordering them.

- **Archived Links Page** - Page where users can view and manage their archived links.

- **Appearance Page** - Customization interface where users can change the theme, background, avatar, and display name.

## Technologies Used
- **Next.js**: React framework for building server-side rendering and static web applications.
- **NextAuth**: Authentication for Next.js applications.
- **TailwindCSS**: Utility-first CSS framework for styling the application.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.

## Getting Started
**To get started with the project, follow these steps:**

**1.Clone the repository:**
```bash
git clone https://github.com/Fabulosu/linktr.ee-clone.git
cd linktree-clone
```

**2.Install dependencies:**
```bash
npm install
```

**3.Set up environment variables:**

Create a .env file in the root of the project and add the necessary environment variables.

**4.Run the development server:**

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## License

This project is licensed under the MIT License.
