# Real-Time Multiple User Text Editor

This is a real-time multiple user text editor application developed using React, Node.js, Socket.io, React Toast, CodeMirror, and Bootstrap.

## Features

- Real-time collaboration: Multiple users can edit the same document simultaneously.
- Live updates: Changes made by one user are immediately visible to all other users.
- User presence indication: See who else is currently editing the document.
- Syntax highlighting: Powered by CodeMirror for a better editing experience.
- Toast notifications: Informative messages using React Toast for various events.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime environment for server-side development.
- **Socket.io**: Library for real-time bidirectional communication between web clients and servers.
- **React Toast**: React component for toast notifications.
- **CodeMirror**: In-browser code editor component.
- **Bootstrap**: Frontend framework for developing responsive and mobile-first websites.
- **Vite**: Frontend build tool that provides a fast development server and optimized production build.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/real-time-text-editor.git
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd real-time-text-editor
   npm install
   cd client
   npm install
   ```

3. Start the Vite server:

   ```bash
   cd ..
   npm run dev
   ```

4. Visit `http://localhost:3000` in your browser to use the application.

## Usage

1. Once the application is running, users can navigate to the provided URL.
2. Users can start editing the document immediately.
3. Changes made by any user will be instantly reflected to all other users.
4. Toast notifications will inform users about various events such as user joining or leaving the session.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your proposed changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the creators of React, Node.js, Socket.io, React Toast, CodeMirror, Bootstrap, and Vite for providing the tools and libraries necessary to build this application.
  
Feel free to customize this README further according to your project's specific details and requirements.
