// TodoCard.js
import React from 'react';
import './TodoCard.css';
import { Tag, Clock, CircleCheck, Circle } from 'lucide-react'; 
// 假設您會創建一個 TodoCard.css 來進行樣式隔離

const TodoCard = ({ task, onComplete }) => {
  // 截止日期格式化 (簡單處理)
  const formattedDueDate = task.dueDate 
    ? new Date(task.dueDate).toLocaleDateString('zh-TW') 
    : '無截止日';

  // 根據 priority 決定顯示的 CSS 類名
  const priorityClass = task.priority.toLowerCase();

  return (
    // 卡片主體：根據是否完成，套用不同的樣式
    <div className={`todo-card ${task.isCompleted ? 'completed' : ''} priority-${priorityClass}`}>
      
      {/* 1. 任務標題與清單名稱 */}
      <div className="card-header">
        <h4 className="card-title">{task.title}</h4>
        <span className="list-tag"><Tag size={14}/>{task.listName}</span>
      </div>

      {/* 2. 截止日期 */}
      <div className="card-meta">
        <Clock size={14} className="icon-clock" />
        <span className="due-date">{formattedDueDate}</span>
        
        {/* 3. 遊戲化元素：經驗值顯示 */}
        <span className="xp-value"> +{task.xpValue}XP</span>
      </div>

      {/* 4. 互動/完成按鈕 */}
      {!task.isCompleted && (
        <button 
          className="complete-btn" 
          // 點擊後執行父組件傳入的完成函式，並傳入任務ID
          onClick={() => onComplete(task.id)}
        >
          <Circle size={16} />
          未完成
        </button>
      )}

      {task.isCompleted && (
        
        <button 
          className="completed-btn" 
        >
          <CircleCheck size={16} />
          已完成
        </button>

        //<div className="completed-badge">已完成</div>
      )}

    </div>
  );
};

export default TodoCard;