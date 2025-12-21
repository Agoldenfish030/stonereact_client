// MockData.js (用於 TodoCard 測試)

const mockTrelloTasks = [
  {
    id: "t1",
    title: "設計主頁面佈局與樣式",
    description: "將 HTML/CSS 轉換為 React 組件",
    dueDate: "2025-12-25T10:00:00Z", // 截止日期 (ISO 格式)
    listName: "前端進行中", // 來自 Trello 的清單名稱
    isCompleted: false, // 任務狀態 (Trello 上可能表示為移動到 'Done' 清單)
    priority: "High", // 優先級 (例如 Trello 標籤)
    xpValue: 50, // 遊戲化元素：完成這個任務可獲得的經驗值
  },
  {
    id: "t2",
    title: "遊戲化核心邏輯設計",
    description: "定義經驗值計算公式、角色升級條件",
    dueDate: "2025-12-30T10:00:00Z",
    listName: "後端待辦",
    isCompleted: false,
    priority: "Medium",
    xpValue: 80,
  },
  {
    id: "t3",
    title: "串接 Trello API 授權",
    description: "OAuth 流程實作，獲取 Token",
    dueDate: null, // 無截止日期
    listName: "後端進行中",
    isCompleted: false,
    priority: "High",
    xpValue: 100,
  },
  {
    id: "t4",
    title: "串接 Trello API 授權",
    description: "OAuth 流程實作，獲取 Token",
    dueDate: null, // 無截止日期
    listName: "後端進行中",
    isCompleted: false,
    priority: "High",
    xpValue: 80,
  },
  {
    id: "t5",
    title: "串接 Trello API 授權",
    description: "OAuth 流程實作，獲取 Token",
    dueDate: null, // 無截止日期
    listName: "後端進行中",
    isCompleted: false,
    priority: "High",
    xpValue: 10,
  },
  {
    id: "t6",
    title: "串接 Trello API 授權",
    description: "OAuth 流程實作，獲取 Token",
    dueDate: null, // 無截止日期
    listName: "後端進行中",
    isCompleted: false,
    priority: "High",
    xpValue: 20,
  },
  {
    id: "t7",
    title: "串接 Trello API 授權",
    description: "OAuth 流程實作，獲取 Token",
    dueDate: null, // 無截止日期
    listName: "後端進行中",
    isCompleted: false,
    priority: "High",
    xpValue: 88,
  },
  {
    id: "t8",
    title: "串接 Trello API 授權",
    description: "OAuth 流程實作，獲取 Token",
    dueDate: null, // 無截止日期
    listName: "後端進行中",
    isCompleted: false,
    priority: "High",
    xpValue: 130,
  },
  {
    id: "t9",
    title: "串接 Trello API 授權",
    description: "OAuth 流程實作，獲取 Token",
    dueDate: null, // 無截止日期
    listName: "後端進行中",
    isCompleted: false,
    priority: "High",
    xpValue: 15,
  },
];

export default mockTrelloTasks;