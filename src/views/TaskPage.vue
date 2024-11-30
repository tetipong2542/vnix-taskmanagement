<template>
  <div class="container">
    <h1>การจัดการงานที่มอบหมาย</h1>

    <!-- หมวดหมู่งาน -->
    <div class="task-category" id="upcoming">
      <h2>งานที่กำลังจะถึง</h2>
      <ul class="task-list">
        <li v-for="task in upcomingTasks" :key="task.id" class="task-item" :class="{ 'completed': task.completed }">
          <span>{{ task.name }} ({{ task.fileName }})</span>
          <div class="actions">
            <button class="btn complete" @click="completeTask(task)">เสร็จสมบูรณ์</button>
            <button class="btn delete" @click="deleteTask(task)">ลบ</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="task-category" id="overdue">
      <h2>เลยกำหนดเวลา</h2>
      <ul class="task-list">
        <li v-for="task in overdueTasks" :key="task.id" class="task-item overdue">
          <span>{{ task.name }} ({{ task.fileName }})</span>
          <div class="actions">
            <button class="btn complete" @click="completeTask(task)">เสร็จสมบูรณ์</button>
            <button class="btn delete" @click="deleteTask(task)">ลบ</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="task-category" id="completed">
      <h2>เสร็จสมบูรณ์แล้ว</h2>
      <ul class="task-list">
        <li v-for="task in completedTasks" :key="task.id" class="task-item completed">
          <span>{{ task.name }} ({{ task.fileName }})</span>
          <div class="actions">
            <button class="btn delete" @click="deleteTask(task)">ลบ</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- เพิ่มงาน -->
    <div class="add-task">
      <input type="text" v-model="newTaskName" placeholder="เพิ่มชื่องาน">
      <input type="file" ref="fileInput" @change="handleFileChange">
      <button @click="addTask">เพิ่มงาน</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const newTaskName = ref('')
const fileInput = ref(null)
const selectedFile = ref(null)

const upcomingTasks = ref([])
const overdueTasks = ref([])
const completedTasks = ref([])

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0]
}

const addTask = () => {
  if (!newTaskName.value.trim()) {
    alert('กรุณากรอกชื่องาน')
    return
  }

  const newTask = {
    id: Date.now(),
    name: newTaskName.value,
    fileName: selectedFile.value?.name || 'ไม่มีไฟล์แนบ',
    completed: false
  }

  upcomingTasks.value.push(newTask)
  
  // Clear inputs
  newTaskName.value = ''
  fileInput.value.value = ''
  selectedFile.value = null
}

const completeTask = (task) => {
  // Remove from other lists
  upcomingTasks.value = upcomingTasks.value.filter(t => t.id !== task.id)
  overdueTasks.value = overdueTasks.value.filter(t => t.id !== task.id)
  
  // Add to completed
  task.completed = true
  completedTasks.value.push(task)
}

const deleteTask = (task) => {
  upcomingTasks.value = upcomingTasks.value.filter(t => t.id !== task.id)
  overdueTasks.value = overdueTasks.value.filter(t => t.id !== task.id)
  completedTasks.value = completedTasks.value.filter(t => t.id !== task.id)
}
</script>

<style scoped>
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

.add-task input[type="text"],
.add-task input[type="file"] {
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