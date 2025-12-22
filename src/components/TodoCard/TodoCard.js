import React from 'react';
import './TodoCard.css';
import { Tag, Clock, CircleCheck, Circle, Trash2 } from 'lucide-react';

const TodoCard = ({ task, onComplete, onDelete }) => {
    // 截止日期格式化
    const formattedDueDate = task.dueDate 
        ? new Date(task.dueDate).toLocaleDateString('zh-TW') 
        : '無截止日';

    // 治本修正：防止 priority 為 undefined 導致崩潰
    const priorityClass = (task.priority || 'medium').toLowerCase();

    return (
        <div className={`todo-card ${task.isCompleted ? 'completed' : ''} priority-${priorityClass}`} style={{ position: 'relative' }}>
            
            {/* 刪除按鈕：點擊後會先彈出確認視窗 */}
            <button 
                className="delete-task-btn"
                onClick={() => {
                    if (window.confirm('確定要刪除這項任務嗎？')) {
                        onDelete(task.id);
                    }
                }}
                title="刪除任務"
            >
                <Trash2 size={16} />
            </button>

            <div className="card-header">
                <h4 className="card-title">{task.title}</h4>
                {/* 顯示標籤名，若無則顯示 task.tag */}
                <span className="list-tag"><Tag size={14}/>{task.listName || task.tag || "一般"}</span>
            </div>

            <div className="card-meta">
                <Clock size={14} className="icon-clock" />
                <span className="due-date">{formattedDueDate}</span>
                <span className="xp-value"> +{task.xpValue}XP</span>
            </div>

            <div className="card-actions">
                {!task.isCompleted && (
                    <button className="complete-btn" onClick={() => onComplete(task.id)}>
                        <Circle size={16} /> 未完成
                    </button>
                )}

                {task.isCompleted && (
                    <button className="completed-btn">
                        <CircleCheck size={16} /> 已完成
                    </button>
                )}
            </div>
        </div>
    );
};

export default TodoCard;