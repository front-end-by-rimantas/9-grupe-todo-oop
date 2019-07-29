"use strict";

class TodoClass {
    constructor ( target ) {
        this.target = document.querySelector(target);
        this.textarea;
        this.taskListElement;
        this.tasks = [];

        this.HTML_template = `<div>
                                <h2>Tasku sarasas</h2>
                                <form>
                                    <textarea></textarea>
                                    <div class="save">Save</div>
                                    <div class="cancel">Cancel</div>
                                </form>
                                <div class="task-list">task list...</div>
                            </div>`;
        this.HTML_empty = `<div class="empty">Sorry, no tasks</div>`;
        this.HTML_task = `<div class="task-item">
                            <header>
                                <h3>Task #</h3>
                                <span class="edit">Edit</span>
                                <span class="delete">Delete</span>
                            </header>
                            <section>
                                Task text
                            </section>
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
        this.tasks.push( text );
        this.renderTasks();
    }

    cancelTask = () => {
        console.log('canceling new task...');
    }

    renderTasks = () => {
        if ( this.tasks.length === 0 ) {
            this.taskListElement.innerHTML = this.HTML_empty;
        } else {
            let temp_HTML = '';
            this.tasks.forEach( task => {
                temp_HTML += this.HTML_task;
            });
            this.taskListElement.innerHTML = temp_HTML;
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