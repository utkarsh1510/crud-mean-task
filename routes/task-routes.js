const users = require('../config/users-list.json');
const express = require('express')
const router = express.Router();
const Task = require('../models/tasks');
const ResponseHandler = require('../Responses/response-handles');

const Routes = {
    allTasks: '/all-tasks',
    addTask: '/add',
    updateTask: '/edit/:id',
    deleteTask:'/delete/:id',
    allUsers: '/all-users'
}

router.get(Routes.allTasks, (req, res) => {
    Task.find().then((data) => {
        ResponseHandler.send20xResponse(res ,data, '', null, 200);        
    }).catch((err) => {
        let error = {
           err
        };
        let message = 'Something went wrong while fetching results';
        ResponseHandler.send40xResponse(res, null, message, error, 403);
    });
});

router.post(Routes.addTask, checkFields ,(req, res) => {
    let details = {
        description: req.body.description,
        assigned_by: req.body.assigned_by,
        assigned_to:req.body.assigned_to
    }
    let task = new Task({...details});
    task.save().then((data) => {
        ResponseHandler.send20xResponse(res, data, 'Task Added Successfully', {}, 200)
    }).catch((err) => {
        let error = {
            err
         };
        let message = 'Something went wrong while add a task';
        ResponseHandler.send40xResponse(res, null, message, error, 403);
    })
});

router.put(Routes.updateTask, [isTaskIdExist],(req, res, next) => {
    let task = req.task;
    task.description = req.body.description ? req.body.description.trim() ? req.body.description.trim() : task.description : task.description;
    task.assigned_by = req.body.assigned_by ? req.body.assigned_by.trim() ? req.body.assigned_by.trim() : task.assigned_by : task.assigned_by;
    task.assigned_to = req.body.assigned_to ? req.body.assigned_to.trim() ? req.body.assigned_to.trim() : task.assigned_to : task.assigned_to;
    task.save().then((data) => {
        ResponseHandler.send20xResponse(res, data, 'Task Updated Successfully', {}, 200)
    }).catch((err) => {
        let error = {
            err
         };
        let message = 'Something went wrong while updating the task';
        ResponseHandler.send40xResponse(res, null, message, error, 403);
    })
});

router.delete(Routes.deleteTask, isTaskIdExist, (req, res) => {
    let handler = (err) => {
        if(err) {
            let error = {
                err
             };
            let message = 'Something went wrong while deleting the task';
            ResponseHandler.send40xResponse(res, null, message, error, 403);
        } else {
            ResponseHandler.send20xResponse(res, {}, 'Task Deleted Successfully', {}, 200)
        }
    }
    Task.deleteOne({_id: req.params.id}, handler)
});

router.get(Routes.allUsers, (req, res, next) => {
    let usersList = users;
    ResponseHandler.send20xResponse(res, usersList, '', {}, 200);
})

module.exports = router;

function checkFields(req, res, next) {
    let body = req.body || null;
    if(body && body.description.trim() && body.assigned_by.trim() && body.assigned_to.trim()){
        next();
    } else {
        if (!body || !body.description.trim()) {
            ResponseHandler.sendRequiredFieldsError(res, 'description')
        } else if (!body.assigned_by.trim()) {
            ResponseHandler.sendRequiredFieldsError(res, 'assigned_by')
        } else if (!body.assigned_to.trim()) {
            ResponseHandler.sendRequiredFieldsError(res, 'assigned_to')
        }
    }
}

async function isTaskIdExist(req, res, next)  {
        try {
            let taskDetail = await Task.findOne({_id:req.params.id});
            if(!taskDetail) {
                let message = 'No Task exists with this Id.';
                ResponseHandler.send40xResponse(res, null, message, {}, 403);
            } else {
                req.task = taskDetail;
                next();
            }
        } catch(err) {
            let message = 'No Task exists with this Id.';
            ResponseHandler.send40xResponse(res, null, message, {}, 403);
        }
}