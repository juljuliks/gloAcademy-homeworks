'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    };

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]))
    };

    render() {
        this.todoCompleted.textContent = '';
        this.todoList.textContent = '';
        this.todoData.forEach(this.createItem);
        this.addToStorage();
    };

    createItem = (todo) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
            <button class="todo-edit"></button>
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    };

    addTodo(event) {
        event.preventDefault();
        if (this.input.value.trim() === '' || this.input.value === '') {
            alert('Введите текст')
        }
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo)
            this.input.value = '';
        }
        this.render();
    };

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    handler(event) {
        if (event.target.matches('.todo-complete')) {
            if (event.target.closest('.todo-item')) {
                this.itemAnimate(event.target.closest('.todo-item'));
                setTimeout(() => {
                    this.completedItem(event.target.closest('.todo-item'));
                }, 300)

            }
        } else if (event.target.matches('.todo-remove')) {
            if (event.target.closest('.todo-item')) {
                this.itemAnimate(event.target.closest('.todo-item'));
                setTimeout(() => {
                    this.deleteItem(event.target.closest('.todo-item'));
                }, 300);

            }
        } else if (event.target.matches('.todo-edit')) {
            if (event.target.closest('.todo-item')) {
                this.editItem(event.target.closest('.todo-item'));
            }
        }
    };

    deleteItem(item) {
        this.todoData.forEach((el, i) => {
            if (el.key === item.key) {
                this.todoData.delete(i);
            }
        })
        this.render();
    };

    completedItem(item) {
        this.todoData.forEach(el => {
            if (item.key === el.key) {
                el.completed = !el.completed;
            }
            this.render();
        })
    };

    itemAnimate(item) {
        let count = 0,
            animate;

        const animation = () => {
            animate = requestAnimationFrame(animation)
            count += 10;
            if (count <= 110) {
                item.style.left = count + '%';
                return;
            } else {
                cancelAnimationFrame(animate);
            }
        }
        animation()
    };

    editItem(item) {
        if (item.contentEditable != 'true') {
            item.contentEditable = "true";
            item.classList.toggle('todo-editing');
            return;
        } else {
            this.todoData.set(item.key, {
                value: item.textContent.trim(),
                completed: this.todoData.get(item.key).completed,
                key: item.key
            });
            item.classList.toggle('todo-editing');
            item.contentEditable = "false";
            this.addToStorage();
        }
    };

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        window.addEventListener('click', this.handler.bind(this));

        this.render();
    };
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();