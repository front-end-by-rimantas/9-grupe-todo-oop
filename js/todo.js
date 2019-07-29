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
        this.HTML_task = `<div class="task-item" data-task-id="{{id}}">
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

    deleteTask = ( event ) => {
        const id = event.path[2].dataset.taskId;
        this.tasks = this.tasks.filter( task => task.id !== id );


        console.log( this.tasks );
        console.log( this.tasks.filter( task => task.id !== id ) );
        

        this.renderTasks();
    }

    renderTasks = () => {
        if ( this.tasks.length === 0 ) {
            this.taskListElement.innerHTML = this.HTML_empty;
        } else {
            // issivalome HTML, kai atsiranda pirmas task'as
            if ( this.tasks.length === 1 ) {
                this.taskListElement.innerHTML = '';
            }
            // naujas elementas
            let task_temp_HTML = this.HTML_task;
            task_temp_HTML = task_temp_HTML.replace('{{id}}', this.nextId - 1)
                                            .replace('{{id}}', this.nextId - 1)
                                            .replace('{{text}}', this.textarea.value);
            // esamas.push(naujas)
            this.taskListElement.insertAdjacentHTML('beforeend', task_temp_HTML);

            // naujam sukurtam task'ui uzdedame event listener'ius
            this.target.querySelector(`.task-item[data-task-id="${this.nextId - 1}"] .delete`)
                        .addEventListener('click', this.deleteTask)
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