
 - Node.js (v14.x or higher)
 - Ionic CLI ```(npm install -g @ionic/cli)```

## Installation

1. Clone the repository:

```
git clone https://github.com/prakashraj950/ionic-react-fe.git
cd ionic-react-fe
```

2. Install dependencies
```
npm install 
```

## Running the App
- Start the development server
``` 
ionic serve
```
The app will be available at http://localhost:8100.

## Project Structure

```
├── public/               # Static files
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # App pages (screens)
│   ├── redux/            # API calls, Redux store
│   ├── utils/            # utilities
|   ├── routes/           # App routes configuration
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   ├── theme/            # Styling and themes
└── package.json          # Project metadata and dependencies

```

## Environment Variables
Create a .env file in the root directory to manage environment-specific variables:

```

VITE_API_URL = http://localhost:5000/api
VITE_BASE_URL = http://localhost:5000/

```

## Build and Deployment
1. Build the project for production:
```
ionic build
```

### 1. Locate the Build Output
After running ionic build, the production-ready files are located in the ```dist``` directory of your project.

### 2. Serve the Build Locally
#### Option 1: Using a Simple HTTP Server (like http-server)
Install http-server:


```
npm install -g http-server
```
Serve the www directory:
```
http-server ./dist
```
This will serve your app on a local server, accessible at ``http://localhost:8080`` by default.

### 3. Deploy the Build
To deploy the build to a production environment, you can upload the contents of the ``dist`` directory to your preferred hosting provider.

Common Hosting Services:
- `Netlify`: Drag and drop the ``dist`` folder in the Netlify dashboard.
- `Vercel`: Link your Git repository and it will automatically build and deploy, but make sure to specify the ``dist`` directory as the output folder.
- `Firebase Hosting`: Deploy using Firebase CLI.
- `GitHub Pages`: Push the ``dist`` content to a specific branch (like gh-pages).

By following these steps, you can serve or deploy the build created using the ionic build command.