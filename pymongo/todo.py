from pymongo import MongoClient
import sys
from datetime import datetime as dt

client = MongoClient()
db = client['todo']
collection = db['todos']


def _task_exists(task_name: str) -> bool:
    if collection.find_one({'name': task_name}) is None:
        return False
    else:
        return True


def _add_task(task: dict):
    '''
    Takes in a task

    ---
    Arguments
     - task 

    Example:
    task = {'created':<time>,
            'name':<name of the task>,
            'status': <done/undone>,
            'completed':<time> }

    '''
    if not _task_exists(task_name=task['name']):
        collection.insert_one(task)


def _delete_all():
    '''
    Deletes all tasks in the database
    '''
    collection.delete_many({})


def _del_task(task_name: str):
    '''
    Takes in task name and deletes the task

    ---
    Args:
     - task_name
    Returns:
        None
    '''
    if _task_exists(task_name=task_name):
        collection.delete_one({'name': task_name})


def _update_task(task_name: str):
    '''
    Takes in task name and updates the task status to done

    ---
    Args:
     - task_name
    Returns:
        None
    '''
    if _task_exists(task_name=task_name):
        collection.find_one_and_update(
            {'name': task_name}, {'$set': {'status': 'done', 'completed': dt.now()}})


def _show(what: str):
    '''
    Takes in 'what' and displays list of tasks

    ---
    Args:
    - which
        - all
        - done
        - undone
    Returns:
        None 
    '''
    if what == 'all':
        for i, task in enumerate(collection.find()):
            print(f"{i+1} - {task['name']}, created at {task['created']}")
    elif(what == 'done'):
        for i, task in enumerate(collection.find({'status': 'done'})):
            print(f"{i+1} - {task['name']}, completed at {task['completed']}")
    elif(what == 'undone'):
        for i, task in enumerate(collection.find({'status': 'not done'})):
            print(f"{i+1} - {task['name']}, created at {task['created']}")


def main():
    while True:
        c = input(
            'Do what (add, delete/delete all, update, show <all/undone/done>, exit): ')
        if c == 'add':
            task = {}
            task['name'] = input('Task: ')
            task['created'] = dt.now()
            task['status'] = 'not done'
            task['completed'] = 'na'
            _add_task(task)
            print('---- All Tasks ----')
            _show(what='all')
        elif c == 'show all':
            print('---- All Tasks ----')
            _show(what='all')
        elif c == 'show undone':
            print('---- Undone Tasks ----')
            _show(what='undone')
        elif c == 'show done':
            print('---- Completed Tasks ----')
            _show(what='done')
        elif c == 'update':
            print('---- All Tasks ----')
            _show(what='all')
            which = input('Which Task: ')
            _update_task(task_name=which)
            print('---- Completed Tasks ----')
            _show(what='done')
        elif c == 'delete':
            print('---- All Tasks ----')
            _show(what='all')
            which = input('Which Task: ')
            _del_task(task_name=which)
            print('---- Completed Tasks ----')
            _show(what='all')
        elif c == 'delete all':
            _delete_all()
        elif c == 'exit':
            sys.exit("Ok Bye! :)")


if __name__ == "__main__":
    main()
