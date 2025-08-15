# Full Stack Project @ Software Engineer Program Mentorship @ Arol.Dev
Frontend: React, FlowbiteUI, ContextAPI
Backend: Node, Express, Prisma, Postgrsql

## Full Stack CoffeeCareerAccelerator with React, Tailwind, Prisma, Postgrsql

A user-friendly platform that connects job seekers with various employment opportunities. It simplifies the job search process, allowing users to create an account, explore job categories, search for jobs by city, and browse through listings. Each job listing provides detailed information about the employer, enabling users to make informed decisions. The website aims to streamline the job search experience for a seamless and efficient process.

## Prerequisites
Node version 14.x

## Cloning the repository
```git clone https://github.com/hrvojevincek/CofeeCareerAccelerator.git```

## Install packages
```yarn```

## Setup .env file

```DATABASE_URL=```

## Start application
```yarn run dev```

## 🚀 MCP (Model Context Protocol) Setup

This project supports AI-powered database management through Neon's MCP Server, allowing you to interact with your PostgreSQL database using natural language commands.

### Prerequisites
- Neon PostgreSQL database account
- Neon API key
- Cursor IDE (or other MCP-compatible client)

### Setup Steps

1. **Install MCP Server Package**
   ```bash
   cd apps/server
   npm install --save-dev @neondatabase/mcp-server-neon
   ```

2. **Get Your Neon API Key**
   - Go to [Neon Console](https://console.neon.tech)
   - Navigate to API Keys in your account settings
   - Create or copy your API key

3. **Configure MCP in Cursor**
   - Copy `mcp-config.example.json` to `mcp-config.json`
   - Replace `<YOUR_NEON_API_KEY>` with your actual API key
   - Open Cursor Settings (Cmd/Ctrl + ,)
   - Search for "MCP" and add the configuration

4. **Test MCP Connection**
   ```bash
   export NEON_API_KEY="your_api_key_here"
   npx @neondatabase/mcp-server-neon start $NEON_API_KEY
   ```

### Available MCP Commands
Once configured, you can use natural language commands like:
- "List my Neon projects"
- "Show tables in my database"
- "Run a query to see all users"
- "Create a new table for job applications"

### Security Note
- **Never commit** `mcp-config.json` to version control
- Only use MCP for development, never in production
- Keep your API key secure and private

### Example Configuration
```json
{
  "mcpServers": {
    "neon": {
      "command": "npx",
      "args": [
        "@neondatabase/mcp-server-neon",
        "start",
        "<YOUR_NEON_API_KEY>"
      ]
    }
  }
}
```
