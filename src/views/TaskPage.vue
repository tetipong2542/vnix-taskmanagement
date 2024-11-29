<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Assignment Management</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 1200px;
      margin: 20px auto;
      padding: 20px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .task-category {
      margin-bottom: 20px;
    }
    .task-category h2 {
      font-size: 20px;
      color: #007bff;
      margin-bottom: 10px;
    }
    .task-list {
      list-style: none;
      padding: 0;
    }
    .task-item {
      background: #f9f9f9;
      margin-bottom: 10px;
      padding: 15px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ddd;
    }
    .task-item.completed {
      background: #d4edda;
      border-color: #c3e6cb;
    }
    .task-item.overdue {
      background: #f8d7da;
      border-color: #f5c6cb;
    }
    .task-item .actions {
      display: flex;
      gap: 10px;
    }
    .btn {
      padding: 5px 10px;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .btn.complete {
      background: #28a745;
      color: #fff;
    }
    .btn.delete {
      background: #dc3545;
      color: #fff;
    }
    .add-task {
      margin-top: 20px;
    }
    .add-task input[type="text"], .add-task input[type="file"] {
      width: calc(100% - 20px);
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .add-task button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    .add-task button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>การจัดการงานที่มอบหมาย</h1>

    <!-- หมวดหมู่งาน -->
    <div class="task-category" id="upcoming">
      <h2>งานที่กำลังจะถึง</h2>
      <ul class="task-list"></ul>
    </div>
    <div class="task-category" id="overdue">
      <h2>เลยกำหนดเวลา</h2>
      <ul class="task-list"></ul>
    </div>
    <div class="task-category" id="completed">
      <h2>เสร็จสมบูรณ์แล้ว</h2>
      <ul class="task-list"></ul>
    </div>

    <!-- เพิ่มงาน -->
    <div class="add-task">
      <input type="text" id="taskInput" placeholder="เพิ่มชื่องาน">
      <input type="file" id="fileInput">
      <button id="addTaskBtn">เพิ่มงาน</button>
    </div>
  </div>

  <script>
    // Task Categories
    const upcomingTasks = document.querySelector("#upcoming .task-list");
    const overdueTasks = document.querySelector("#overdue .task-list");
    const completedTasks = document.querySelector("#completed .task-list");

    // Add Task Button
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskInput = document.getElementById("taskInput");
    const fileInput = document.getElementById("fileInput");

    // Add Task Function
    addTaskBtn.addEventListener("click", () => {
      const taskName = taskInput.value.trim();
      if (!taskName) {
        alert("กรุณากรอกชื่องาน");
        return;
      }

      const fileName = fileInput.files[0]?.name || "ไม่มีไฟล์แนบ";

      const taskItem = document.createElement("li");
      taskItem.className = "task-item";
      taskItem.innerHTML = `
        <span>${taskName} (${fileName})</span>
        <div class="actions">
          <button class="btn complete">เสร็จสมบูรณ์</button>
          <button class="btn delete">ลบ</button>
        </div>
      `;

      // Add Actions
      const completeBtn = taskItem.querySelector(".complete");
      const deleteBtn = taskItem.querySelector(".delete");

      completeBtn.addEventListener("click", () => {
        taskItem.classList.remove("overdue");
        taskItem.classList.add("completed");
        completedTasks.appendChild(taskItem);
      });

      deleteBtn.addEventListener("click", () => {
        taskItem.remove();
      });

      // Add to Upcoming Tasks
      upcomingTasks.appendChild(taskItem);

      // Clear Input
      taskInput.value = "";
      fileInput.value = "";
    });
  </script>
</body>
</html>
