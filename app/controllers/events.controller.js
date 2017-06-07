const Event = require('../models/events');


module.exports = {

showEvents: showEvents,
showEvent: showEvent,
seedEvents: seedEvents,
showCreate: showCreate,
processCreate: processCreate

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
             res.render('pages/event', { event: event });
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

    function showCreate (req, res){
        // res.send('this is a test');
       res.render('pages/create.ejs');
    }


    // process create form 
    function showCreate(req, res) {
         console.log('this process create was called ');
        res.render('pages/create');
    }

    /**
     * Process the creation form
     */
    function processCreate(req, res) {
        console.log('this process create was called ');
        // create a new event
        const event = new Event({
            name: req.body.name,
            description: req.body.description
        });

        // save event
        event.save((err) => {
            if (err)
                throw err;

            // redirect to the newly created event
            res.redirect(`/events/${event.slug}`);
        });
    }

   