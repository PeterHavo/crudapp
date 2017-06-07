const Event = require('../models/events');


module.exports = {

showEvents: showEvents,
showEvent: showEvent,
seedEvents: seedEvents,
showCreate: showCreate,
processCreate: processCreate,
showEdit: showEdit,
processEdit: processEdit

}




     function showEvents (req, res)  {
        // show all events 


        // create dummy data 

        //   const events = [
        //   { name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.' },
        //   { name: 'Swimming', slug: 'swimming', description: 'Michael Phelps is the fast fish.' },
        //   { name: 'Weightlifting', slug: 'weightlifting', description: 'Lifting heavy things up' }
        // ];
        // return view with data

        //use mongoose model for all events NOT dummy data ===========================================

        Event.find({},(error, events)=>{
            if(error){
                res.status('404');
                res.send('Events not found');
            }
            res.render('pages/events', { events: events });

        });

        
    }

     function showEvent (req, res)  {
        
        //  hardcoded dummy data
        // const event = { name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.' };
        Event.find({slug: req.params.slug},(error, event)=>{
              if(error){
                res.status('404');
                res.send('Event not found');
            }
            //   res.send(event);
             res.render('pages/event', { 
                 event: event,
                 success: req.flash('success')
                
            });
        });

       
    }

    // seed our database 

     function seedEvents (req, res)  {
        // create some events
        const events = [
            { name: 'Basketball', description: 'Throwing into a basket.' },
            { name: 'Swimming', description: 'Michael Phelps is the fast fish.' },
            { name: 'Weightlifting', description: 'Lifting heavy things up' },
            { name: 'running', description: 'running is the best' },
            { name: 'pingpong', description: 'pingpong game is super fast' }
        ];

        // use the Event model to insert/save
        Event.remove({}, () => {

            for (event of events) {
                var newEvent = new Event(event);
                newEvent.save();
            };
        })


        // seeded!!!I

        res.send('database seeded!!!');
    }

   

    // process create form 
    function showCreate(req, res) {
        
        res.render('pages/create', {
            errors: req.flash('errors')
        });
    }

    /**
     * Process the creation form
     */
    function processCreate(req, res) {
        //validate information
        req.checkBody('name','Name is required!').notEmpty();
        req.checkBody('description','description is reuired!').notEmpty();

        // if there are errors, redirect and save errors to flash data 
        const err = req.validationErrors();
        if (err){
            req.flash('errors',err.map(err=>err.msg));
            return res.redirect('/event/create');
        }
        // create a new event
        const event = new Event({
            name: req.body.name,
            description: req.body.description
        });

        // save event
        event.save((err) => {
            if (err)
                throw err;
            //set a sucessful flash message
            req.flash('success','Successfuly created event !');
            // redirect to the newly created event
            res.redirect(`/events/${event.slug}`);
        });
    }

    function showEdit(req, res) {
        console.log(req.params.slug);
        Event.findOne({slug: req.params.slug}, (err, event)=>{
            
            // res.send(JSON.stringify(event));
            res.render('pages/edit',{
                event:event,
                errors: req.flash('errors')
            });
        })
        
    }

    /**
     * Process the edit form 
     */
    function processEdit(req, res) {
           //validate information
        req.checkBody('name','Name is required!').notEmpty();
        req.checkBody('description','description is reuired!').notEmpty();

        // if there are errors, redirect and save errors to flash data 
        const err = req.validationErrors();
        if (err){
            req.flash('errors',err.map(err=>err.msg));
            return res.redirect(`/event/${req.params.slug}/edit`);
        }
       //finding currect event
       Event.findOne({ slug: req.params.slug }, (err, event)=>
       {
        //updating that event 
         event.name = req.body.name;
         event.description = req.body.description;
         event.save(err=>{
             if (err)
                throw err;
              //    success flush message
             req.flash('success', 'successfully updated event')  
             res.redirect('/events');
            
         });
         
         //    redirect back to the events
       })
         
      
    }