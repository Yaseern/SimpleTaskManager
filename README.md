# Task Management Application
A simple Task Management Application that allows you to perform basic CRUD operations (Create, Read, Update, Delete) on tasks.
It is designed to be straightforward, making it easy to understand, extend, and integrate into other projects.

## Features
- Create Task — Add a new task with a title and description.
- Read Tasks — View all existing tasks.
- Update Task — Edit the title, description, or completion status of a task.
- Delete Task — Remove tasks from the list.
- Reactive State Management — Uses BehaviorSubject to keep the task list updated in real time.

## Tech Stack
- Frontend: Angular 20
- Backend: .NET Core 9
- Database: MSSQL

## Getting Started
 - Prerequisites <br>
Make sure you have:
   - Node.js (v18+ recommended)
   - Angular CLI (latest)
   - .NET Core SDK (9+)
   - VS Code/ VS  Studio 2022
  
## Installation and Running
Clone the repository and install dependencies:

```bash
  git clone https://github.com/Yaseern/SimpleTaskManager.git
```

Angular
```bash  
  cd SimpleTaskManager/taskmanager-ui
  npm install

  # Run the application
  npm start #port:4200
```

API <br>
**Option A — Using EF Core Migrations (Code-First)** 

```bash
  cd SimpleTaskManager/api
  
  # Apply migrations
  dotnet ef database update --project "TaskManagerAPI.Minimal/TaskManagerAPI.Minimal.csproj"
```

**Option B — Using the Provided Database Copy** <br>
  - In the `/database` folder, you'll find a .bak (SQL Server backup) file.
  - Restore it in SQL Server Management Studio (SSMS) or Azure Data Studio.
  - Update the connection string in appsettings.json:
    
```json
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=YOUR_DB;User Id=YOUR_USER;Password=YOUR_PASSWORD;TrustServerCertificate=True;"
  }
```

