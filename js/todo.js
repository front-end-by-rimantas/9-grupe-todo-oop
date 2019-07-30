"use strict";

class TodoClass {
    constructor ( target ) {
        this.target = document.querySelector(target);
        this.filtersHTML;
        this.nextId = 1;
        this.textarea;
        this.taskListElement;
        this.tasks = [];
        this.filter = 'in-progress';       // all, done, in-progress

        this.HTML_template = `<div class="tasker">
                                <h2>Tasku sarasas</h2>
                                <form>
                                    <textarea></textarea>
                                    <div class="btn save">Save</div>
                                    <div class="btn cancel">Cancel</div>
                                </form>
                                <div class="filter">
                                    <div class="option" data-filter="all">All</div>
                                    <div class="option" data-filter="done">Done</div>
                                    <div class="option active" data-filter="in-progress">In progress</div>
                                </div>
                                <div class="task-list">task list...</div>
                            </div>`;
        this.HTML_empty = `<div class="empty">Sorry, no tasks</div>`;
        this.HTML_task = `<div class="task-item" data-task-id="{{id}}">
                            <header>
                                <h3>#{{id}}</h3>
                                <span class="btn done">Archive</span>
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
        this.filtersHTML = this.target.querySelectorAll('.option');
        // adding events
        this.target.querySelector('.save').addEventListener('click', this.addTask);
        this.target.querySelector('.cancel').addEventListener('click', this.cancelTask);
        this.filtersHTML.forEach( option => {
            option.addEventListener('click', this.updateFilter)
        });
        
        if ( localStorage.getItem('nextId') ) {
            this.nextId = JSON.parse( localStorage.getItem('nextId') );
        }
        if ( localStorage.getItem('tasks') ) {
            this.tasks = JSON.parse( localStorage.getItem('tasks') );
        }

        this.renderTasks();
    }

    saveToLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify( this.tasks ));
        localStorage.setItem('nextId', JSON.stringify( this.nextId ));
    }

    updateFilter = ( event ) => {
        this.filter = event.target.dataset.filter;
        this.filtersHTML.forEach( option => {
            if ( option.dataset.filter === this.filter ) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });

        this.renderTasks();
    }

    addTask = () => {
        const text = this.textarea.value;
        if ( text === '' ) {
            return;
        }
        this.tasks.push( {
            id: this.nextId,
            text: text,
            done: false
        } );
        this.nextId++;

        this.saveToLocalStorage();
        this.renderTasks();
    }

    cancelTask = () => {
        this.textarea.value = '';
    }

    deleteTask = ( event ) => {
        const id = parseInt(event.path[2].dataset.taskId);
        this.tasks = this.tasks.filter( task => task.id !== id );

        this.saveToLocalStorage();
        this.renderTasks();
    }

    archiveTask = ( event ) => {
        const id = parseInt(event.path[2].dataset.taskId);
        
        this.tasks = this.tasks.map( task => {
            // if ( task.id === id ) {
            //     task.done = true;
            // }
            // return task;
            return task.id === id ? {...task, done: true} : task;
        });
        
        this.saveToLocalStorage();
        this.renderTasks();
    }

    renderTasks = () => {
        if ( this.tasks.length === 0 ) {
            this.taskListElement.innerHTML = this.HTML_empty;
        } else {
            // issivalome HTML, kai atsiranda pirmas task'as
            let full_HTML = '',
                task_HTML = '',
                tasksToRender = this.tasks;
            
            switch ( this.filter ) {
                case 'done':
                    tasksToRender = tasksToRender.filter( task => task.done === true );
                    break;

                case 'in-progress':
                    tasksToRender = tasksToRender.filter( task => task.done === false );
                    break;

                case 'all':
                    // nieko nekeiciam, gerai kaip yra
                    break;
            }

            tasksToRender.forEach( task => {
                            task_HTML = this.HTML_task;
                            task_HTML = task_HTML.replace('{{id}}', task.id)
                                                .replace('{{id}}', task.id)
                                                .replace('{{text}}', task.text);
                            full_HTML += task_HTML;
                        });

            // update task list html
            this.taskListElement.innerHTML = full_HTML;

            // select all tasks and add event listeners
            this.target.querySelectorAll('.task-list .task-item').forEach( task => {
                const taskID = parseInt(task.dataset.taskId);
                const taskStatus = this.tasks.filter( t => t.id === taskID )[0].done;
                
                if ( taskStatus ) {
                    // speliam mygtukus: archive, delete, edit
                    task.classList.add('archived');
                } else {
                    task.querySelector('.delete').addEventListener('click', this.deleteTask);
                    task.querySelector('.done').addEventListener('click', this.archiveTask);
                }
            });
        }
    }
}

export default TodoClass;