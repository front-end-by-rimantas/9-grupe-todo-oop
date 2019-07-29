"use strict";

class TodoClass {
    constructor ( target ) {
        this.target = document.querySelector(target);
        this.nextId = 1;
        this.textarea;
        this.taskListElement;
        this.tasks = [];

        this.HTML_template = `<div class="tasker">
                                <h2>Tasku sarasas</h2>
                                <form>
                                    <textarea></textarea>
                                    <div class="btn save">Save</div>
                                    <div class="btn cancel">Cancel</div>
                                </form>
                                <div class="task-list">task list...</div>
                            </div>`;
        this.HTML_empty = `<div class="empty">Sorry, no tasks</div>`;
        this.HTML_task = `<div class="task-item">
                            <header>
                                <h3>#{{id}}</h3>
                                <span class="btn edit">Edit</span>
                                <span class="btn delete">Delete</span>
                            </header>
                            <section>{{text}}</section>
                        </div>`;

        this.init();
    }

    init = () => {
        // initial html
        this.target.innerHTML = this.HTML_template;
        // selecting elements
        this.textarea = this.target.querySelector('textarea');
        this.taskListElement = this.target.querySelector('.task-list');
        // adding events
        this.target.querySelector('.save').addEventListener('click', this.addTask);
        this.target.querySelector('.cancel').addEventListener('click', this.cancelTask);
        this.renderTasks();
    }

    addTask = () => {
        const text = this.textarea.value;
        if ( text === '' ) {
            return;
        }
        this.tasks.push( {
            id: this.nextId,
            text: text
        } );
        this.nextId++;
        
        this.renderTasks();
    }

    cancelTask = () => {
        this.textarea.value = '';
    }

    renderTasks = () => {
        if ( this.tasks.length === 0 ) {
            this.taskListElement.innerHTML = this.HTML_empty;
        } else {
            let full_temp_HTML = '',
                task_temp_HTML = '';
            this.tasks.forEach( task => {
                task_temp_HTML = this.HTML_task;
                full_temp_HTML += task_temp_HTML.replace('{{id}}', task.id)
                                                .replace('{{text}}', task.text);
            });
            this.taskListElement.innerHTML = full_temp_HTML;
        }
    }


    // Todo list objektas

    // vidine atmintis
    // vidiniai metodai
        // prideti
        // redaguoti
        // istrinti
    // todo HTML generavimas
}



export default TodoClass;