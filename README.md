# Chat-Bot Frontend

The frontend for the Web Chat-Bot application provides a user interface for real-time messaging with the chatbot powered by the backend.

## Features

- Responsive chat interface.
- WebSocket connection for real-time message exchange.
- Dynamic username support.
- Welcome message fetched from the backend.
- Loading spinner to indicate message processing.

---

## Project Structure

- **`app.js`**: JavaScript file that handles WebSocket connection and user interaction.
- **`index.html`**: HTML file for the chat interface.
- **`styles.css`**: CSS file for styling the chat interface.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chat-bot-frontend.git
cd chat-bot-frontend
```

### 2. Modify Backend URL

In `app.js`, update the `BACKEND_URL` variable to point to your backend server:

```javascript
const BACKEND_URL = "https://your-backend-url.com";
```

### 3. Open in Browser

Simply open `index.html` in your preferred web browser to start the chat interface.

---

## Dependencies

- **Bootstrap**: For responsive design and UI components.
  - Included via CDN:
    - [Bootstrap CSS](https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css)
    - [Bootstrap JS](https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js)

---

## Functionality

- **Chat Window**: Displays messages from users and the bot.
- **Username Input**: Allows users to set their display name.
- **Message Input**: Users can type and send messages to the bot.
- **Loading Indicator**: Displays a spinner while the bot processes a message.

---

## Notes

- Ensure that the backend server is running and accessible before using the frontend.
- For local development, uncomment the `http://localhost:8080` URL in `app.js` and ensure the backend runs locally.

---

## License

This project is licensed under the MIT License.
