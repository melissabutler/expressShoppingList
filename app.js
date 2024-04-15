const express = require('express')
const ExpressError = require('./expressError')
const items = require('./fakeDb')


const app = express();

app.use(express.json());

app.get('/items', (req, res, next) => {
    return res.json(items)
})

app.post('/items', (req, res, next) => {
    items.push(req.body)
    return res.send({
        added: req.body

});
});

app.get('/items/:name', (req, res, next) =>{
    return res.json(req.body)
})

app.patch('/items/:name', (req, res, next) => {
  const foundItem = items.find(item => item.name === req.params.name)
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404)
  }  
  foundItem.name = req.body.name
  return res.send({
    updated: req.body
  })
})

app.delete('/items/:name', (req, res, next) =>{
    const foundItem = items.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
        throw new ExpressError("Item not found", 404)
    }
    items.splice(foundItem, 1)
    res.json({ message: "Deleted" })
})

app.listen(3000, function() {
    console.log('App on port 3000')
})