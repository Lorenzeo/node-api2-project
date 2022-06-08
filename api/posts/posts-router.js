// implement your posts router here
const express = require('express');

const router = express.Router();

const Posts = require('./posts-model');


// ADOPTERS ENDPOINTS
router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'The posts information could not be retrieved' });
        });
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(posts => {
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be retrieved" });
        });
});

router.get('/:id/posts', (req, res) => {
    Posts.findDogs(req.params.id)
        .then(posts => {
            if (posts.length > 0) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist"  });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The comments information could not be retrieved" });
        });
});

router.post('/', (req, res) => {
    let { title , contents} =req.body
    if(typeof title !== 'string'|| contents === ""){
        res.status(400).json({message: "invalid name"});
        return;

        
    } else if(typeof title !== "string" || contents === ""){
        res.status(400).json({message: "Please provide title and contents for the post"})
        return;
    }
    title = title.trim();
    contents = contents.trim();
    Posts.add(req.body)
        .then(posts => {
            res.status(201).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error while saving the post to the database" });
        });
});

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist"  });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post could not be removed"  });
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
        .then(posts => {
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be modified" });
        });
});

module.exports = router;