var express = require('express');
const member = require('../models/member');
var router = express.Router();

/* List all members */
router.get('/', async (req, res) => {
  let data = await member.find({});
  console.info(`records retrieved from mongoose:`, data?.length)
  console.log('data returned=',data)
  res.send(data);
});

/* List one member by ID. */
router.get('/:id', async function(req, res) {
  
  try {
    const data = await member.findOne({_id: req.params.id});
    console.info(`Found member:`, data)
    res.send(data);
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
});

/* Create a member */
router.post('/', async (req, res) => {

  console.log("*** INSIDE router.post");

  let memberCreate = req.body

  try {
    let newMember = new member(memberCreate)
    await newMember.save()
    console.log("Created member", newMember)
    res.send(newMember)  
  }
  catch (error) {
    console.log(error)
    if (error.code === 11000) {
      res.status(409).send('member ' + memberCreate.name + ' already exists');      
    }
    else {
      res.sendStatus(500)
    }
  }
})

/* Update a member by ID. */
//router.put('/:name', async function(req, res) {
  router.put('/:id', async function(req, res) {  
  let memberToUpdate = req.body
  try {

    console.log("memberToUpdate = ", memberToUpdate);

//    let data = await member.findByIdAndUpdate(req.params.name, memberToUpdate);
    let data = await member.findByIdAndUpdate(req.params.id, memberToUpdate);
    console.log("Updated member", data)
    res.send(data);
  }
  catch(error) {
    console.log(error)
    res.sendStatus(500)
  }
})

/* Delete a member by ID. */
router.delete("/:id", async (req, res) => {
  try {
    const data = await member.findByIdAndDelete(req.params.id);

    if (!data) {
      res.sendStatus(404);
    } else {
      console.log("Deleted Member", data);
      res.send(data);
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)  }
});

module.exports = router;
