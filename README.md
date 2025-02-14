# Langserve and Vercel AI SDK Demo App

This repository contains a demo application that showcases how to quickly build a Generative AI (GenAI) application using Langserve and Vercel AI SDK. The application is divided into two main parts:

- **Frontend (Next.js)**: Located in the `app/` directory, this part of the application is responsible for the user interface and interaction with the AI model.
- **Backend (Python with Langserve)**: Located in the `backend/` directory, this part of the application handles the AI logic using LangChain and serves it as a REST API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js v22
- Python 3.10
- LaTeX 最新バージョン

### Dockerコンテナの起動

dockercontainerは、VSCodeによるGUIで簡単に操作可能です。

1. Docker Desktopをインストールします。
2. VSCodeをインストールします。
3. VSCodeにdevcontainer拡張機能をインストールします。
4. VSCodeでこのリポジトリを開きます。
5. VSCodeの左下の「><」をクリックして、コンテナを起動します。
6. コンテナで再度開くをクリックします。
7. コンテナが起動し、仮想環境の中に入ることが出来ます。


### Frontend (Next.js)

1. Navigate to the `app/` directory:

   ```bash
   cd app/
   ```

2. Install the required Node.js packages:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the `app/` directory and add your environment variables:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the Next.js development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

### Backend (Langserve)

1. Navigate to the `backend/` directory:

   ```bash
   cd backend/
   ```

2. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env.local` file in the `backend/` directory and add your environment variables:

   ```bash
   OPENAI_API_KEY=your_openai_api_key
   ```

5. Start the Langserve API server:

   ```bash
   python app.py
   ```

   The API server will be available at `http://localhost:8000`.

## Usage

Once both the frontend and backend servers are running, you can interact with the application by navigating to `http://localhost:3000` in your web browser.

### Example Interaction

1. Enter a mathematical expression (e.g., `2*10`) in the input field.
2. Click the "Run" button.
3. The result will be displayed on the page, showing the interaction between the frontend and the backend.

## Project Structure

```plaintext
.
├── app/                    # Next.js frontend code
│   ├── actions.tsx         # Server-side actions for interacting with the backend API
│   ├── page.tsx            # Main page component
│   └── ...                 # Other Next.js files and components
├── backend/                # Python backend code (Langserve)
│   ├── agent.py            # LangChain agent definition
│   ├── app.py              # FastAPI server setup with Langserve
│   └── ...                 # Other Python files and configurations
├── .gitignore              # Git ignore file
├── README.md               # This README file
└── ...                     # Other project files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue if you have any suggestions or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

This repository demonstrates how to quickly build a powerful GenAI demo application using Langserve and Vercel AI SDK. This approach is particularly useful for creating prototypes or client demos in a short amount of time. Feel free to explore and modify the code to suit your needs!