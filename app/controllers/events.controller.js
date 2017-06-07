const Event = require('../models/events');


module.exports = {
    showEvents: (req, res) => {
        // show all events 


        // create dummy data 

        //   const events = [
        //   { name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.' },
        //   { name: 'Swimming', slug: 'swimming', description: 'Michael Phelps is the fast fish.' },
        //   { name: 'Weightlifting', slug: 'weightlifting', description: 'Lifting heavy things up' }
        // ];
        // return view with data

        res.render('pages/events', { events: events });
    },

    showEvent: (req, res) => {
        const event = { name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.' };
        res.render('pages/event.ejs', { event: event });
    },

    // seed our database 

    seedEvents: (req, res) => {
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
};