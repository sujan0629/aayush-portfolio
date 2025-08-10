# Aayush Bhatta - Professional Portfolio

This is the source code for the personal portfolio website of Aayush Bhatta, a passionate and dedicated Civil Engineer. The website showcases his skills, projects, publications, and professional journey. It features a comprehensive admin panel for easy content management and is built with a modern, robust tech stack.

## Core Features

-   **Dynamic Content Management**: A full-featured admin dashboard allows for easy creation, editing, and deletion of all site content without touching the code.
-   **Profile Display**: Professionally displays Aayush's biography, education, technical skills, and work experience.
-   **Project Portfolio**: Showcases academic and professional projects with detailed descriptions, tags, images, and links to GitHub or full reports.
-   **AI-Powered Q&A**: An interactive section where visitors can ask questions about Aayush’s background and receive instant, AI-generated answers.
-   **Resume Management**: A dedicated system to upload, manage, and publish a downloadable PDF resume.
-   **Publications Showcase**: Sections for various types of publications, including:
    -   **Journal Articles**: Published academic work with summaries and links.
    -   **Columns & Articles**: Published columns in various outlets.
    -   **Other Publications**: Conference papers, posters, and other scholarly work.
-   **Blog Platform**: A complete blog with posts that include images, tags, and rich text content.
-   **Timeline ("At a Glance")**: A chronological display of key milestones in education and career.
-   **Certifications & Licensure**: Highlights professional certifications, workshops, and official licenses like the NEC Civil ‘A’ Category license.
-   **Gallery ("Camera Roll")**: A visual gallery for project photos, certificates, or other relevant images.
-   **Honors & Awards**: A dedicated section to display academic and professional recognitions.
-   **Literature Corner**: A personal space to share and recommend influential books or articles.
-   **Media Coverage**: A section to track and display mentions in the media.
-   **Contact Form**: A fully functional contact form that sends inquiries directly via email using Resend.
-   **Dark/Light Mode**: A theme toggle for a comfortable viewing experience in any lighting condition.

## Tech Stack

This project is built with a modern, scalable, and maintainable technology stack:

-   **Framework**: [Next.js](https://nextjs.org/) (using the App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Database**: [MongoDB](https://www.mongodb.com/) (with [Mongoose](https://mongoosejs.com/) for object data modeling)
-   **AI & Generative Features**: [Genkit](https://firebase.google.com/docs/genkit) (powered by Google's Gemini models)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **File Storage**: [Cloudinary](https://cloudinary.com/) (for PDF resume hosting)
-   **Email Service**: [Resend](https://resend.com/) (for contact form submissions)
-   **Forms**: [React Hook Form](https://react-hook-form.com/)
-   **Schema Validation**: [Zod](https://zod.dev/)

## Environment Variables

To run this project locally, you need to create a `.env` file in the root directory and add the necessary environment variables for the services listed above (e.g., MongoDB, Cloudinary, Resend, Google AI). You will also need to set credentials for the admin dashboard.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a `.env` file in the root of the project.
    -   Add the required credentials for the tech stack services.

4.  **Run the development server:**
    The application requires two separate processes to run concurrently: the Next.js frontend and the Genkit development server for AI features.

    -   **Start the Next.js app:**
        ```bash
        npm run dev
        ```
        This will start the main application, typically on `http://localhost:9002`.

    -   **Start the Genkit server:**
        In a separate terminal, run:
        ```bash
        npm run genkit:watch
        ```
        This starts the Genkit server, which the Next.js app will communicate with for AI-powered features.

5.  **Access the application:**
    -   Open your browser to `http://localhost:9002` to view the website.
    -   Navigate to `http://localhost:9002/login` to access the admin panel with the credentials you set in your `.env` file.
