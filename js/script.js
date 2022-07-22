// ● 待办事项列表
// 数组存储待办事项，const todos = [{text: 'aa', done: true}]
const todos = [
    { text: '写代码', done: false },
    { text: '看书', done: false },
    { text: '玩游戏', done: true },
    { text: '看电视', done: false },
    { text: '休息一会儿吧', done: false },
    { text: '继续学习', done: false }
  ];
  
  // 全局变量，存储当前要编辑的todo
  let editingTodo = null;
  // 全局变量，记录当前要编辑项的文本内容
  let editingTodoText = '';
  
  // 实际开发函数的时候，函数应该避免依赖于全局的内容
  function loadTodos(todos) {
    const todolistUL = document.querySelector('.todo-list');
  
    const arr = [];
    // 遍历数组，拼接li，存储到arr数组
    todos.forEach(function (todo, index) {
      arr.push(
        '<li class="' + (todo.done ? 'completed' : '') + (todo === editingTodo ? ' editing' : '') + '">' +
        '  <div class="view">' +'  <label class="listitem">'+
        '    <input data-index="'+ index +'" class="toggle" type="checkbox" '+ (todo.done ? 'checked' : '') +'>' +'<i>'+'</i>'+
        '    <span data-index="'+ index +'">'+ todo.text +'</span>' +
        '    <button data-index="'+ index +'" class="destroy"></button>' +
        '  </div>' +'</label>'+
        '  <input class="edit" value="'+ todo.text +'">' +
        '</li>'
      );
    });
    todolistUL.innerHTML = arr.join('');
  
    // 统计未完成项的个数
    setUncompletedCount();
  }
  loadTodos(todos);
  
  
  // ● 录入待办事项
  const txtNewTodo = document.querySelector('.new-todo');
  txtNewTodo.onkeyup = function (e) {
    // console.log(e.key);
    if (e.key !== 'Enter') return;
    if(txtNewTodo.value === ''){
      alert('请输入待办事项名称！')

  } else {
    // 把新录入的待办事件添加到 待办事项数组中 todos
    todos.unshift({
      text: this.value,
      done: false
    });
  
    // 重新加载列表
    loadTodos(todos);
    // 清空文本框
    this.value = '';
  };
  }

  // ● 搜索待办事项
  const txtSearchTodo = document.querySelector('.search-todo');
  txtSearchTodo.onkeyup = function (y) {
    if (y.key !== 'Enter') return;
    // let newFind=listname.filter(function(r){retrun r.indexOf(txtSearchTodo.value)!= -1})
    let newFind=todos.filter(r=>         
        r.text.indexOf(txtSearchTodo.value)!= -1
      )
    console.log(newFind);
    loadTodos(newFind);
}
  
  // ● 删除选中的条目
  const todolistUL = document.querySelector('.todo-list');
  // 把删除按钮的点击事件通过事件委托，注册给父元素
  todolistUL.onclick = function (e) {
    // 判断当前点击的是否是 destroy
    if (e.target.matches('.destroy')) {
      // 从按钮上获取自定义属性data-index，索引
      const index = e.target.dataset.index;
      // 要从数组中把对应的待办事项删除
      todos.splice(index, 1);   // 从原数组中删除对应的项
      // 然后再重新加载列表
      loadTodos(todos);
    }
  
    // 2. 点击子的checkbox，如果有子的checkbox有一项没有选中，父checkbox不选中，否则父checkbox选中
    
    // 判断当前点击的是否是子的checkbox
    if (e.target.matches('.toggle')) {
      // 获取点击的子的checkbox，对应在数组中的索引
      const index = e.target.dataset.index;
      // 根据索引获取数组中对应的待办事项
      const todo = todos[index];
      // 更改待办事项的完成状态，和checkbox的选中状态一致
      todo.done = e.target.checked;
  
      // 重新加载列表
      loadTodos(todos);
  
      // 判断子的checkbox是否全部选中，如果全部选中，让全选按钮选中
  
      // 获取所有子的checkbox的个数
      const chkCount = document.querySelectorAll('.todo-list li .toggle').length;
      // 获取所有子的选中的checkbox的个数
      const chkCheckedCount = document.querySelectorAll('.todo-list li .toggle:checked').length;
      // 根据子的checkbox，设置全选checkbox的状态
      chkToggleAll.checked = chkCount === chkCheckedCount;
    }
  };
    
  // ● 显示未完成的条目
  function setUncompletedCount() {
    // 获取未完成项的个数
    const count = todos.filter(function (todo) {
      return !todo.done;
    }).length;
  
    document.querySelector('.todo-count strong').textContent = count;
  }
  
  
  // ● 实现编辑功能
  
  // 1. 给label注册双击事件，可以通过事件委托，委托给父元素 ul
  todolistUL.ondblclick = function (e) {
    // 判断当前点击的是label
    if (e.target.matches('.todo-list li label')) {
      // 获取当前label对应的索引
      const index = e.target.dataset.index;
      // 记录我们当前要编辑的待办事项
      editingTodo = todos[index];
      editingTodoText = editingTodo.text;
  
      loadTodos(todos);
    }
  };
