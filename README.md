
# Task Manager


Task Management System with  JWT-based authentication,
Registration and login functionality,
Password encryption using bcrypt,
CRUD operations for tasks ,
Task priority levels (High, Medium, Low),
Due date assignment and validation ,
Task status tracking (Pending, In Progress, Completed),
tasks are grouped by status ,
Task  can filtering by priority , and due date



#### Get all tasks

```http
  GET /api/task
```

#### create task

```http
  Post /api/task
```

#### update task

```http
  Put /api/task/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of task to update |


#### update task


```http
  Delete /api/task/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of task to delete |



## Documentation

Github - https://github.com/Vaishak234/Task-manager-test


## Installation

Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system
```
    
Backend Setup

```bash
cd backend
npm install
```
Start the Backend Server
```bash
npm run dev
```
    
Environment Variables

```bash
MONGO_URL=mongodb://localhost:27017/task_manager  # MongoDB URI
ACCESS_TOKEN_KEY=your_jwt_secret_key  # Secret for JWT
REFRESH_TOKEN_KEY=your_jwt_secret_key  # Secret for JWT
PORT=4000  # Backend port
```
    
Frontend Setup

```bash
cd frontend
npm install
```

Start the front end Server

```bash
npm run dev
```
