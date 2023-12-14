import express from 'express';
import * as guideController from '../controllers/guide-controller.js';
// import * as commentsController from '../controllers/comment-controller.js';

const router = express.Router();

// Define a route for the root path ('/') with a GET method
// It uses the 'find' method from the guide controller to handle GET requests at the root path
router.route('/')
    .get(guideController.find);

// Define a route for adding new guides ('/add') with a POST method
// It uses the 'post' method from the guide controller to handle POST requests for adding guides
router.route('/add')
    .post(guideController.post);
    
// Define a route for getting a specific guide ('/:id') with a GET method
// It uses the 'get' method from the guide controller to handle GET requests for a specific guide ID
router.route('/:id')
    .get(guideController.get);

// Define a route for updating a specific guide ('/update/:id') with a PUT method
// It uses the 'put' method from the guide controller to handle PUT requests for updating a guide based on ID
router.route('/:id')
    .put(guideController.put);

// Define a route for deleting a specific guide ('/delete/:id') with a DELETE method
// It uses the 'remove' method from the guide controller to handle DELETE requests for a specific guide ID
router.route('/:id')
    .delete(guideController.remove);

// Route to get guides by category
router.route('/category/:category')
    .get(guideController.findByCategory);

// router.route('/guides/comments/')
//     .post(commentsController.post)
//     .get(commentsController.get)

// router.route('/guides/comments/:id')
//     .delete(commentsController.remove);


export default router;
